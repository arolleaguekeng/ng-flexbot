import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessageComponent } from './chat-message.component';
import { ChatModel, MessageType } from '../../models/chat.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MarkdownService } from 'ngx-markdown';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatMessageComponent], // Import the standalone component
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements for simplicity
      providers: [
        { provide: MarkdownService, useValue: {} }, // Mock the 'markdown' component
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
  });

  it('should display bot message correctly', () => {
    component.message = {
      message: 'Hello from bot!',
      messageType: MessageType.BOT_MESSAGE,
    } as ChatModel;

    fixture.detectChanges();

    const chatResponse = fixture.debugElement.query(By.css('.chat.response'));
    expect(chatResponse).toBeTruthy();
    expect(chatResponse.nativeElement.textContent).toContain('Hello from bot!');
  });

  it('should display user message correctly', () => {
    component.message = {
      message: 'Hello from user!',
      messageType: MessageType.USER_MESSAGE,
    } as ChatModel;

    fixture.detectChanges();

    const chatMessage = fixture.debugElement.query(By.css('.user-bulbe .chat.message'));
    expect(chatMessage).toBeTruthy();
    expect(chatMessage.nativeElement.textContent).toContain('Hello from user!');
  });

  it('should display error message correctly', () => {
    component.message = {
      message: 'An error occurred!',
      messageType: MessageType.ERROR_MESSAGE,
    } as ChatModel;

    fixture.detectChanges();

    const chatError = fixture.debugElement.query(By.css('.chat.error'));
    expect(chatError).toBeTruthy();
    expect(chatError.nativeElement.textContent).toContain('An error occurred!');
  });

  it('should display loading message correctly', () => {
    component.message = {
      message: '',
      messageType: MessageType.LOADING_MESSAGE,
    } as ChatModel;

    fixture.detectChanges();

    const chatLoading = fixture.debugElement.query(By.css('.chat.loading'));
    expect(chatLoading).toBeTruthy();
    expect(chatLoading.nativeElement.querySelector('.loader')).toBeTruthy();
  });

  it('should display user image message correctly', () => {
    const imageUrl = 'http://example.com/image.jpg';
    component.message = {
      message: 'Here is an image!',
      picture: imageUrl,
      messageType: MessageType.USER_IMAGE_MESSAGE,
    } as ChatModel;

    fixture.detectChanges();

    const userImageMessage = fixture.debugElement.query(By.css('.user-bulbe .chat.message'));
    expect(userImageMessage).toBeTruthy();
    expect(userImageMessage.nativeElement.querySelector('img').src).toContain(imageUrl);
    expect(userImageMessage.nativeElement.textContent).toContain('Here is an image!');
  });
});