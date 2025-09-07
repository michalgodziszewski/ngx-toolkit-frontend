import { TestBed } from '@angular/core/testing';

import { DocumentsHttpService } from './documents-http.service';

describe('DocumentsHttpServiceService', () => {
  let service: DocumentsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
