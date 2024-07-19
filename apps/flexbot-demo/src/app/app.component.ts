import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgFlexbotComponent } from '@aguekeng/ng-flexbot';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NgFlexbotComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flexbot-demo';
}
