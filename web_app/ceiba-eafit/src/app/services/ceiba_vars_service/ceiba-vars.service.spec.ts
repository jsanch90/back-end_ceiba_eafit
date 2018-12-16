import { TestBed } from '@angular/core/testing';

import { CeibaVarsService } from './ceiba-vars.service';

describe('CeibaVarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CeibaVarsService = TestBed.get(CeibaVarsService);
    expect(service).toBeTruthy();
  });
});
