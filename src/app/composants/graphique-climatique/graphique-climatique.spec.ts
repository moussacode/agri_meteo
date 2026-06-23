import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueClimatique } from './graphique-climatique';

describe('GraphiqueClimatique', () => {
  let component: GraphiqueClimatique;
  let fixture: ComponentFixture<GraphiqueClimatique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueClimatique],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphiqueClimatique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
