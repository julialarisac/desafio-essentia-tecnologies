import { TestBed } from '@angular/core/testing';

import { listaTarefa } from './listaTarefa';

describe('Lista', () => {
  let service: listaTarefa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(listaTarefa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
