import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cashdetail } from './cashdetail';

describe('Cashdetail', () => {
  let component: Cashdetail;
  let fixture: ComponentFixture<Cashdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cashdetail],
    }).compileComponents();

    fixture = TestBed.createComponent(Cashdetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
