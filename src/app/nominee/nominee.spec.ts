import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nominee } from './nominee';

describe('Nominee', () => {
  let component: Nominee;
  let fixture: ComponentFixture<Nominee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nominee],
    }).compileComponents();

    fixture = TestBed.createComponent(Nominee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
