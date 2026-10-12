import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Agentlist } from './agentlist';

describe('Agentlist', () => {
  let component: Agentlist;
  let fixture: ComponentFixture<Agentlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Agentlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Agentlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
