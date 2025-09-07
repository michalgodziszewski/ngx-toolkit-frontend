import { Component, inject, input, output } from '@angular/core';
import { DocumentModel } from '../../../../models/document.model';
import { MaterialModule } from '../../../../material/material.module';
import { DocumentsHttpService } from '../../../../api/services/documents-http.service';
// @ts-ignore
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { downloadFile } from '../../../../utils/downloand-file.utils';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-documents-list',
  imports: [MaterialModule],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent {
  private readonly documentsHttpService = inject(DocumentsHttpService);
  private readonly snackbarService = inject(SnackbarService);

  documentRemoved = output<string>();
  documents = input<DocumentModel[]>([]);

  readonly displayedColumns = ['name', 'documentType', 'packageType', 'id'];

  downloadDocument(id: string, name: string) {
    this.documentsHttpService.downloadDocument$(id).subscribe({
      next: (blob) => {
        downloadFile(blob, name);
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.error('File not found!');
      },
    });
  }

  removeDocument(id: string) {
    this.documentRemoved.emit(id);
  }
}
