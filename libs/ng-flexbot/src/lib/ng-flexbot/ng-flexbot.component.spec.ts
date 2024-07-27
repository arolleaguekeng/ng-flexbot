import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgFlexbotComponent } from './ng-flexbot.component';
import { FlexbotService } from './services/flexbot.service';
import { FbSharedServiceService } from './services/fb-shared-service.service';
import { ChatModel, MessageType } from './models/chat.model';
import { FormsModule } from '@angular/forms';

describe('NgFlexbotComponent', () => {
  let component: NgFlexbotComponent;
  let fixture: ComponentFixture<NgFlexbotComponent>;
  let flexbotService: jest.Mocked<FlexbotService>;
  let fbSharedService: jest.Mocked<FbSharedServiceService>;

  beforeEach(async () => {
    flexbotService = {
      generateText: jest.fn(),
      generateTextByImage: jest.fn(),
      generateTextStream: jest.fn(),
    } as any;

    fbSharedService = {
      isStreaming: false,
      chatHistory: [],
      googleApikey: '',
      openaiApikey: '',
      flexbotCurrentTextModel: '',
      flexbotCurrentImageModel: '',
      promptContext: '',
    } as any;

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgFlexbotComponent], // Import the standalone component
      providers: [
        { provide: FlexbotService, useValue: flexbotService },
        { provide: FbSharedServiceService, useValue: fbSharedService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgFlexbotComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize input properties', () => {
    component.googleApikey = 'test-google-api-key';
    component.openaiApikey = 'test-openai-api-key';
    component.ngOnInit();
    expect(fbSharedService.googleApikey).toBe(component.googleApikey);
    expect(fbSharedService.openaiApikey).toBe(component.openaiApikey);
  });

  it('should add a chat message', () => {
    const message = new ChatModel('Hello', new Date(), '', MessageType.USER_MESSAGE);
    component.addChatMessage(message);
    expect(component.chatMessages.length).toBe(1);
    expect(component.chatMessages[0]).toBe(message);
  });

  it('should handle sending a message without an image', async () => {
    component.currentChatItem.message = 'Hello';
    flexbotService.generateText.mockResolvedValue({ choices: [{ message: { content: 'Hi' } }] });
    await component.onSend();
    expect(component.chatMessages.length).toBe(2); // Including loading message
    expect(component.chatMessages[1].message).toBe('Hi');
  });

  it('should handle image selection', () => {
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const event = { target: { files: [file] } };
    component.onImageSelected(event);
    expect(component.selectedImage).toBe(file);
    expect(component.imageUrl).toContain('blob:');
  });

  it('should clear selected image', () => {
    component.selectedImage = new File(['dummy content'], 'example.png');
    component.removeImage();
    expect(component.selectedImage).toBeNull();
    expect(component.imageUrl).toBeNull();
  });
});