import { TestBed } from '@angular/core/testing';

import { TuristasService } from './turistas.service';

describe('TuristasService', () => {
  let service: TuristasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuristasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
