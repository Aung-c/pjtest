import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentCreate } from './agent-create';

describe('AgentCreate', () => {
  let component: AgentCreate;
  let fixture: ComponentFixture<AgentCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
