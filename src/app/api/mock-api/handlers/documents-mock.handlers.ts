import { MockHandler } from '../mock-types';
import { filterMockData, paginateMockData } from '../utils/mock-utils';
import { documentsMock } from '../data/documents.mock';
import {
  badRequest,
  created,
  noContent,
  notFound,
  ok,
} from '../utils/http-response.utils';

export class DocumentsMockHandlers {
  getDocumentList$: MockHandler = ({ params }) => {
    const { pageNumber, pageSize, ...restParas } = params;

    const filterData = filterMockData({ items: documentsMock }, restParas);
    const paginateData = paginateMockData(
      { items: filterData['items'] },
      +pageNumber,
      +pageSize,
    );

    return ok(paginateData);
  };

  downloadDocument$: MockHandler = ({ match }) => {
    const documentId = match[1];

    if (documentId === '75211f0e-2f6c-4ef5-b6bf-c19fba976313')
      return notFound('File not found!');
    return ok(
      new File(['Testowy plik'], 'document.pdf', { type: 'application/pdf' }),
    );
  };

  addNewDocument$: MockHandler = ({ body }) => {
    const newDocument = body.data;

    const isExists = documentsMock.find((el) => el.name === newDocument.name);
    if (isExists) {
      return badRequest('Document already exists!');
    }
    documentsMock.unshift(newDocument);
    return created(null);
  };

  removeDocument$: MockHandler = ({ match }) => {
    const documentId = match[1];

    const index = documentsMock.findIndex((el) => el.id === documentId);
    if (index === -1 || documentId === '75211f0e-2f6c-4ef5-b6bf-c19fba976313') {
      return notFound('Document not found!');
    }

    documentsMock.splice(index, 1);
    return noContent();
  };

  update: MockHandler = ({ match, body }) => {
    const id = String(match![1]);
    // try {
    //   const updated = this.repo.update(id, body ?? {});
    //   return { status: 200, body: { data: { todo: updated } } };
    // } catch (e: any) {
    //   return e?.message === 'not_found'
    //     ? { status: 404, body: { message: 'Todo not found' } }
    //     : { status: 500, body: { message: 'Internal error' } };
    // }
  };

  patch: MockHandler = ({ match, body }) => this.update({ match, body } as any);

  remove: MockHandler = ({ match }) => {
    const id = String(match![1]);
    // const ok = this.repo.remove(id);
    // return ok
    //   ? { status: 204, body: null }
    //   : { status: 404, body: { message: 'Todo not found' } };
  };
}
