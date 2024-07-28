import { Component, Input } from '@angular/core';
import { ChatModel, MessageType } from '../../models/chat.model';
import { MarkdownComponent } from 'ngx-markdown';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  selector: 'lib-app-chat-message',
  standalone: true,
  imports: [MarkdownComponent, HighlightAuto], // Add 'markdown' component to the imports
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {
  @Input() message!: ChatModel;
  messageType = MessageType;
}
