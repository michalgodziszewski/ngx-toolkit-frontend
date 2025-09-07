import { MockRegistry } from '../mock-registry.service';
import { registerDocumentsMocks } from './documents-mock.registrar';

export function bootstrapMocks(registry: MockRegistry): void {
  registerDocumentsMocks(registry);
}
