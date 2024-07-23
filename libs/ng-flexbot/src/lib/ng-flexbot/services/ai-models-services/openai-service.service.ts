import { inject, Injectable } from '@angular/core';
import { FbSharedServiceService } from '../fb-shared-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, max, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenaiServiceService {
  fbSharedService = inject(FbSharedServiceService);
  constructor(private http: HttpClient) {}
  /**
   * Generates text based on the provided prompt using the OpenAI chat model.
   * @param prompt - The prompt for generating the text.
   * @returns A Promise that resolves to the generated text.
   */
  async generateText(prompt: string): Promise<any> {

    this.fbSharedService.chatHistory.push({
      role: 'user',
      content: prompt,
    });

    const body = {
      model: this.fbSharedService.flexbotCurrentTextModel.split('/')[1],
      messages: this.fbSharedService.chatHistory,
      max_tokens: 59,
      temperature: 0.5,

    };

    console.log('body', body);
    console.log('apikey', this.fbSharedService.openaiApikey);
    return this.http
      .post('https://api.openai.com/v1/chat/completions', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.fbSharedService.openaiApikey}`,
        },
      }).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      ).toPromise()
        ;
  }

  async generateTextByImage(file: File, promptText: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Step 1: Upload the image
    const uploadResponse = this.http
      .post('https://api.openai.com/v1/files', formData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer YOUR_OPENAI_API_KEY',
        }),
      });

    // Assuming uploadResponse contains the URL to the uploaded image
    const imageUrl = (uploadResponse as any)['url'];

    // Step 2: Use the image URL in your chat completion request
    this.fbSharedService.chatHistory.push({
      role: 'user',
      content: promptText,
      image_url: imageUrl, // Assuming the API supports sending an image URL
    });

    return this.http
      .post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: this.fbSharedService.chatHistory,
          model: this.fbSharedService.flexbotCurrentImageModel,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_OPENAI_API_KEY',
          }),
        }
      );
  }

  async generateTextStream(prompt: string): Promise<any> {
    this.fbSharedService.chatHistory.push({
      role: 'user',
      content: prompt,
    });

    return this.http
      .post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: this.fbSharedService.chatHistory,
          model: this.fbSharedService.flexbotCurrentTextModel,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_OPENAI_API_KEY',
          }),
        }
      );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error("Api error", error);
    return of(errorValue);
  }
}