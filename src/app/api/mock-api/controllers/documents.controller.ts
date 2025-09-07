import {
  badRequest,
  created,
  CrudController,
  getIdFromMatch,
  MockHandler,
  notFound,
  ok,
} from 'ngx-toolkit/http-mock';
import { DocumentModel } from '../../../models/document.model';
import { DocumentsRepo } from '../repos/documents.repo';

export class DocumentsController extends CrudController<DocumentModel> {
  constructor(repo: DocumentsRepo) {
    super(repo, {
      basePath: 'documents',
      allowedFilters: ['documentType', 'packageType'],
      locationBase: '/api/documents',
      validateCreate: (b) => {
        if (!b?.name?.trim()) throw new Error('name is required');
      },
      validateUpdate: (p) => {
        if (p?.title !== undefined && !String(p.title).trim())
          throw new Error('title cannot be empty');
      },
    });
  }

  override getOne: MockHandler = ({ match }) => {
    const id = getIdFromMatch(match);
    const row = this.repo.findById(id);

    if (row.id === '75211f0e-2f6c-4ef5-b6bf-c19fba976313')
      return notFound('File not found!');
    return ok(
      new File(['Testowy plik'], 'document.pdf', { type: 'application/pdf' }),
    );
  };

  override create: MockHandler = ({ body }) => {
    const newDocument = body.data;
    const isExists = (this.repo as DocumentsRepo).findByName(newDocument.name);
    if (isExists) {
      return badRequest('Document already exists!');
    }
    this.repo.create(newDocument);
    return created(null);
  };
}
