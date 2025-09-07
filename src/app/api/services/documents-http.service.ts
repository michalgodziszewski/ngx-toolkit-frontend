import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ListResponseModel } from '../../models/list-response.model';
import { DocumentModel } from '../../models/document.model';
import { environment } from '../../../environments/environment';
import { DocumentListRequest } from '../../models/document-list.request';

@Injectable({
  providedIn: 'root',
})
export class DocumentsHttpService {
  private readonly httpClient = inject(HttpClient);

  getDocumentList$(
    params: DocumentListRequest,
  ): Observable<ListResponseModel<DocumentModel>> {
    return this.httpClient.get<ListResponseModel<DocumentModel>>(
      `${environment.apiUrl}/api/documents`,
      { params: { ...params } },
    );
  }

  downloadDocument$(documentId: string): Observable<Blob> {
    return this.httpClient.get(
      `${environment.apiUrl}/api/documents/${documentId}`,
      { responseType: 'blob' },
    );
  }

  addNewDocument$(data: DocumentModel): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/api/documents`, {
      data,
    });
  }

  removeDocument$(documentId: string): Observable<any> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/api/documents/${documentId}`,
    );
  }
}
