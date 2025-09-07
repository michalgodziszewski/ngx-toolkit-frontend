import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { DocumentsHttpService } from '../../../../api/services/documents-http.service';
import { DocumentListRequest } from '../../../../models/document-list.request';
import { DocumentModel } from '../../../../models/document.model';
import { DocumentsListComponent } from '../../components/documents-list/documents-list.component';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { uuidv4 } from '../../../../api/mock-api/utils/mock-utils';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-documents',
  imports: [MaterialModule, DocumentsListComponent, FormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  private readonly documentsHttpService = inject(DocumentsHttpService);
  private readonly snackbarService = inject(SnackbarService);

  documents = signal<DocumentModel[]>([]);
  rowCount = signal(0);
  pageNumber = signal(1);
  pageSize = signal(25);
  documentType = signal('');
  packageType = signal('');

  ngOnInit() {
    this.getDocumentList();
  }

  changeFilters() {
    this.pageNumber.set(1);
    this.getDocumentList();
  }

  changePage(event: PageEvent) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);

    this.getDocumentList();
  }

  getDocumentList(): void {
    const params = this.getDocumentListRequest();
    this.documentsHttpService.getDocumentList$(params).subscribe({
      next: ({ items, rowCount }) => {
        this.documents.set(items);
        this.rowCount.set(rowCount);
      },
      error: (_) => {},
    });
  }

  getDocumentListRequest(): DocumentListRequest {
    return {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      ...(this.documentType() && { documentType: this.documentType() }),
      ...(this.packageType() && {
        packageType: encodeURIComponent(this.packageType()),
      }),
    };
  }

  addNewDocument() {
    const newDocument: DocumentModel = {
      id: uuidv4(),
      name: 'New Owu Dokument',
      documentType: 'GCI',
      packageType: null,
    };

    this.documentsHttpService.addNewDocument$(newDocument).subscribe({
      next: () => {
        this.getDocumentList();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.error(error.error.message);
      },
    });
  }

  removeDocument(id: string): void {
    this.documentsHttpService.removeDocument$(id).subscribe({
      next: () => {
        this.getDocumentList();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.error(error.error.message);
      },
    });
  }
}
