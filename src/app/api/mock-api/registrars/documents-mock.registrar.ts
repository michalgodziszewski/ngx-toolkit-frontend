import { MockRegistry } from '../mock-registry.service';
import { MockRoute } from '../mock-types';
import { DocumentsMockHandlers } from '../handlers/documents-mock.handlers';

export function registerDocumentsMocks(registry: MockRegistry): void {
  const documentsHandlers = new DocumentsMockHandlers();
  const routes: MockRoute[] = [
    {
      method: 'GET',
      pattern: /^documents$/,
      handler: documentsHandlers.getDocumentList$,
    },
    {
      method: 'GET',
      pattern: /^documents\/([^/]+)$/,
      handler: documentsHandlers.downloadDocument$,
    },
    {
      method: 'POST',
      pattern: /^documents/,
      handler: documentsHandlers.addNewDocument$,
    },
    {
      method: 'PUT',
      pattern: /^documents\/(.+)$/,
      handler: documentsHandlers.update,
    },
    {
      method: 'PATCH',
      pattern: /^documents\/(.+)$/,
      handler: documentsHandlers.patch,
    },
    {
      method: 'DELETE',
      pattern: /^documents\/(.+)$/,
      handler: documentsHandlers.removeDocument$,
    },
  ];
  registry.registerRoutes(routes);
}
