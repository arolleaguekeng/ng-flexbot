import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgFlexbotComponent } from '@aguekeng/ng-flexbot';
import { environment } from '../../environments/environment';
import { FlexbotCurrentImageModel, FlexbotCurrentTextModel } from 'libs/ng-flexbot/src/lib/ng-flexbot/models/flexbot-current-llm.enum';


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NgFlexbotComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flexbot-demo';
  googleApikey = environment.apikey;
  openaiApikey = environment.openaiApikey;
  promptContext = ""
  textModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
  imageModel = FlexbotCurrentImageModel.OPEN_AI_GPT_4o_MINI;
  welcomeMessage = "Welcome to Flexbot!";
}
