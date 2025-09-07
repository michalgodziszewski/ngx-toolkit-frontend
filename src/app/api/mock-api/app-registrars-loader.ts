import { MockRegistry, InMemoryDB } from 'ngx-toolkit/http-mock';
import { documentsMock } from './data/documents.mock';
import { DocumentModel } from '../../models/document.model';
import { DocumentsRepo } from './documents.repo';
import { DocumentsController } from './documents.controller';

export type Tables = { documents: DocumentModel[] };

export async function appRegistrarsLoader(registry: MockRegistry) {
  const db = InMemoryDB.from<Tables>({
    documents: documentsMock,
  });

  const documentsRepo = new DocumentsRepo(db.table('documents'));
  const documentsController = new DocumentsController(documentsRepo);

  registry.registerRoutes(documentsController.routes());
}
