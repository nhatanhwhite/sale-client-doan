import { TestBed } from '@angular/core/testing';

import { ThoroughbredService } from './thoroughbred.service';

describe('ThoroughbredService', () => {
  let service: ThoroughbredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoroughbredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
