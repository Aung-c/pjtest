import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginA } from './login-a';

describe('LoginA', () => {
  let component: LoginA;
  let fixture: ComponentFixture<LoginA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
