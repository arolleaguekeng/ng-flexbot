import { Component, input } from '@angular/core';
import { ChatModel, MessageType } from '../../models/chat.model';
import { MarkdownComponent } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  selector: 'lib-app-chat-message',
  standalone: true,
  imports: [MarkdownComponent, HighlightAuto], // Add 'markdown' component to the imports
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  message = input.required<ChatModel>();
  messageType = MessageType;
}
