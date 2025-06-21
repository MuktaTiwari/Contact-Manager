export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  favourite: boolean;
}

export interface ContactListResponse {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContactFormValues {
id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  favourite: boolean;
}