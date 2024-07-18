import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgFlexbotComponent } from './ng-flexbot.component';

describe('NgFlexbotComponent', () => {
  let component: NgFlexbotComponent;
  let fixture: ComponentFixture<NgFlexbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgFlexbotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgFlexbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
