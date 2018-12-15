import { TestBed } from '@angular/core/testing';

import { PvDeviceServiceService } from './pv-device-service.service';

describe('PvDeviceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PvDeviceServiceService = TestBed.get(PvDeviceServiceService);
    expect(service).toBeTruthy();
  });
});
