import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgFlexbotComponent } from '@aguekeng/ng-flexbot';
import { environment } from '../../environments/environment';
import {
  FlexbotCurrentImageModel,
  FlexbotCurrentTextModel,
} from 'libs/ng-flexbot/src/lib/ng-flexbot/models/flexbot-current-llm.enum';

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
