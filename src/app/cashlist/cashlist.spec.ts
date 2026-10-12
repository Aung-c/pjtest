import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cashlist } from './cashlist';

describe('Cashlist', () => {
  let component: Cashlist;
  let fixture: ComponentFixture<Cashlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cashlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Cashlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
