import { Component } from '@angular/core';
import { NgFlexbotComponent } from '@aguekeng/ng-flexbot';
import { FlexbotCurrentImageModel, FlexbotCurrentTextModel } from '@ng-flexbot/ng-flexbot/models/flexbot-current-llm.enum';
import { environment } from '../environments/environment';
@Component({
  standalone: true,
  imports: [NgFlexbotComponent], 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  styles: [ 
    `
      .container {
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  title = 'flexbot-demo';
  googleApikey = environment.apikey;
  openaiApikey = environment.openaiApikey;
  promptContext = '';
  textModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
  imageModel = FlexbotCurrentImageModel.GOOGLE_GEMINI_1_5_FLASH;
  welcomeMessage = 'Welcome to Flexbot!';
}
