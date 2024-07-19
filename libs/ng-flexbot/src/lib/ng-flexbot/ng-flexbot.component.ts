import { Component, ElementRef, input, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModel, MessageType } from './models/chat.model';
import { FlexbotService } from './services/flexbot.service';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { FbSharedServiceService } from './services/fb-shared-service.service';
import {
  FlexbotCurrentImageModel,
  FlexbotCurrentTextModel,
} from './models/flexbot-current-llm.enum';
@Component({
  selector: 'lib-ng-flexbot',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent, FormsModule],
  templateUrl: './ng-flexbot.component.html',
  styleUrl: './ng-flexbot.component.css',
})
export class NgFlexbotComponent {
  apiKey = input<string>();
  textModel =  FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO
  imageModel = FlexbotCurrentImageModel.GOOGLE_GEMINI_PRO_VISION;
  promptContext = input<string>();

  constructor(
    private flexbotService: FlexbotService,
    private renderer: Renderer2,
    private el: ElementRef,
    private fbSharedService: FbSharedServiceService
  ) {
    this.fbSharedService.apikey = this.apiKey.toString();
    this.fbSharedService.flexbotCurrentTextModel = this.textModel;
    this.fbSharedService.flexbotCurrentImageModel = this.imageModel;
    this.fbSharedService.promptContext = this.promptContext.toString();
  }
  isLoading = false;
  chatMessages: ChatModel[] = [];
  currentChatItem: ChatModel = new ChatModel(
    '',
    new Date(),
    '',
    MessageType.BOT_MESSAGE
  );
  loadingChatItem: ChatModel = new ChatModel(
    '',
    new Date(),
    '',
    MessageType.LOADING_MESSAGE
  );
  userId: number | null = null;

  addChatMessage(message: ChatModel) {
    this.chatMessages.push(message);
    window.scrollTo(0, 0);
  }

  onSend() {
    this.currentChatItem.time = new Date();
    const newCurrentChat = new ChatModel(
      this.currentChatItem.message,
      new Date(),
      this.selectedImage != null ? this.imageUrl! : '',
      this.selectedImage != null
        ? MessageType.USER_IMAGE_MESSAGE
        : MessageType.USER_MESSAGE
    );

    const imageCopy = this.selectedImage;
    this.removeImage();
    this.addChatMessage(newCurrentChat);

    if (imageCopy) {
      this.addChatMessage(this.loadingChatItem);
      this.flexbotService
        .generateTextByImage(imageCopy, newCurrentChat.message)
        .then((data) => {
          try {
            this.addBotBull(data);
          } catch (e) {
            this.chatMessages.pop();
            this.currentChatItem.messageType = MessageType.ERROR_MESSAGE;
            this.currentChatItem.message = 'An error occured try again';
            this.addChatMessage(this.currentChatItem);
            console.error(e);
          }
        })
        .catch((e) => {
          console.error('Promise rejected with error: ' + e);
        });
    } else if (this.fbSharedService.isStreaming == true) {
      this.addChatMessage(this.loadingChatItem);
      this.flexbotService.generateTextStream(newCurrentChat.message).then((data) => {
        this.addBotBull(this.fbSharedService.stramingResponse);
      });
    } else {
      this.addChatMessage(this.loadingChatItem);
      this.flexbotService
        .generateText(newCurrentChat.message)
        .then((data) => {
          const filterData = data.response.text();
          this.addBotBull(filterData);
        })
        .catch((error) => {
          console.error('Promise rejected with error: ' + error);
        });
    }

    this.currentChatItem.message = '';
  }

  selectedImage: File | null = null;
  imageUrl: string | null = null;
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];

    if (this.selectedImage) {
      const objectURL = URL.createObjectURL(this.selectedImage);
      this.imageUrl = objectURL;
    }
  }

  // remove image

  removeImage() {
    this.selectedImage = null;
    this.imageUrl = null;
  }

  addBotBull(data: any) {
    this.currentChatItem.message = data;
    const currentBotChat = new ChatModel(
      this.currentChatItem.message,
      new Date(),
      'pict',
      MessageType.BOT_MESSAGE
    );
    this.chatMessages.pop();
    this.addChatMessage(currentBotChat);
    this.fbSharedService.chatHistory.push({
      role: 'model',
      parts: [{ text: this.currentChatItem.message }],
    });
    this.removeImage();
    this.currentChatItem.message = '';
    window.scrollTo(0, 0);
  }
}
