import { DocumentModel } from '../../../models/document.model';

export const documentsMock: DocumentModel[] = [
  {
    id: '75211f0e-2f6c-4ef5-b6bf-c19fba976313',
    name: 'Contract Document',
    documentType: 'Contract',
    packageType: null,
  },
  {
    id: '2e753bfd-7da3-458e-9d13-4217937c0fa7',
    name: 'Manual Document',
    documentType: 'Manual',
    packageType: null,
  },
  {
    id: '8808f117-7a9e-45ed-9157-ae5f37dab48e',
    name: 'FAQ document',
    documentType: 'Faq',
    packageType: null,
  },
  {
    id: 'a5395492-146e-4f66-81c8-bf3c3ab62aac',
    name: 'OWU JDG',
    documentType: 'GCI',
    packageType: 'Rent+',
  },
  {
    id: '0bdeae1c-2b5f-4b56-ac50-b5d4c539ba1b',
    name: 'OWU KRS',
    documentType: 'GCI',
    packageType: 'ForFriends',
  },
];
