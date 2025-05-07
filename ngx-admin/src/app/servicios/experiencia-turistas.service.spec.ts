import { TestBed } from '@angular/core/testing';

import { ExperienciaTuristasService } from './experiencia-turistas.service';

describe('ExperienciaTuristasService', () => {
  let service: ExperienciaTuristasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienciaTuristasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
