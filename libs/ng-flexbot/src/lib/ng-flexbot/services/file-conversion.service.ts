import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
/**
 * Service for converting files to Base64 format.
 */
@Injectable({
  providedIn: 'root',
})
export class FileConversionService {
  constructor(private http: HttpClient) {}

  /**
   * Converts a file to Base64 format.
   * @param filePath - The path of the file to convert.
   * @returns A Promise that resolves with the Base64 representation of the file.
   */
  async convertToBase64(
    filePath: string
  ): Promise<string | ArrayBuffer | null> {
    const blob = await firstValueFrom(
      this.http.get(filePath, { responseType: 'blob' })
    );
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data.substring(base64data.indexOf(',') + 1)); // Extract only the Base64 data
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }
}
