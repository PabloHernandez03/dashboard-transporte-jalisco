import { TestBed } from '@angular/core/testing';
import { Etup } from './etup';

describe('Etup', () => {
  let service: Etup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Etup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
