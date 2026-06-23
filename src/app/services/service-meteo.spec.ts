import { TestBed } from '@angular/core/testing';

import { ServiceMeteo } from './service-meteo';

describe('ServiceMeteo', () => {
  let service: ServiceMeteo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMeteo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
