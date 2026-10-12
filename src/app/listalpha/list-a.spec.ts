import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListA } from './list-a';

describe('ListA', () => {
  let component: ListA;
  let fixture: ComponentFixture<ListA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListA],
    }).compileComponents();

    fixture = TestBed.createComponent(ListA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
