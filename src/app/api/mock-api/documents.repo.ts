import { BaseRepo, uuidv4 } from 'ngx-toolkit/http-mock';
import { DocumentModel } from '../../models/document.model';

export class DocumentsRepo extends BaseRepo<DocumentModel> {
  constructor(table: DocumentModel[]) {
    super(table, { idKey: 'id', genId: uuidv4 });
  }

  findByName(name: string) {
    return this.all().find((item) => item.name === name);
  }
}
