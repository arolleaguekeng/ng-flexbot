import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@env/environment';
import { NgFlexbotComponent } from 'ng-flexbot';
import { FlexbotCurrentImageModel, FlexbotCurrentTextModel } from 'ng-flexbot/lib/ng-flexbot/models/flexbot-current-llm.enum';

describe('AppComponent', () => {
  let component: AppComponent; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule], 
      providers: [
        { provide: environment, useValue: environment },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'flexbot-demo'`, () => {
    expect(component.title).toEqual('flexbot-demo');
  });

  it('should have googleApikey from environment', () => {
    expect(component.googleApikey).toEqual(environment.apikey);
  });

  it('should have openaiApikey from environment', () => {
    expect(component.openaiApikey).toEqual(environment.openaiApikey);
  });

  it('should have a default promptContext', () => {
    expect(component.promptContext).toEqual('');
  });

  it('should have the correct default text model', () => {
    expect(component.textModel).toEqual(FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO);
  });

  it('should have the correct default image model', () => {
    expect(component.imageModel).toEqual(FlexbotCurrentImageModel.GOOGLE_GEMINI_1_5_FLASH);
  });
});