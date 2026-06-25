import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneauMeteo } from './panneau-meteo';

describe('PanneauMeteo', () => {
  let component: PanneauMeteo;
  let fixture: ComponentFixture<PanneauMeteo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanneauMeteo],
    }).compileComponents();

    fixture = TestBed.createComponent(PanneauMeteo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
