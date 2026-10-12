import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailA } from './detail-a';

describe('DetailA', () => {
  let component: DetailA;
  let fixture: ComponentFixture<DetailA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
