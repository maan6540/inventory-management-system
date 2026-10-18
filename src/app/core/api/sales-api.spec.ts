import { TestBed } from '@angular/core/testing';
import { SalesApi } from './sales-api';

describe('SalesApi', () => {
  let service: SalesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
