import { TestBed } from '@angular/core/testing';
import { DatosCelular } from './datos-celular';

describe('DatosCelular', () => {
  let service: DatosCelular;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCelular);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
