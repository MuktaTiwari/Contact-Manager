import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Contact, ContactFormValues } from '../types/contact';
import { useContactStore } from '../stores/contactStore';

const API_BASE_URL = 'http://localhost:3001/api';

export interface ContactsResponse {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchContacts = async (
  search?: string,
  favourite?: boolean,
  page: number = 1,
  limit: number = 10
): Promise<ContactsResponse> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (favourite) params.append('favourite', 'true');
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await fetch(`${API_BASE_URL}/contacts?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const fetchContactById = async (id: number): Promise<Contact> => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contact: ContactFormValues) =>
      fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] as const });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contact: Contact) =>
      fetch(`${API_BASE_URL}/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] as const });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  const { setSelectedContactId } = useContactStore();

  return useMutation({
    mutationFn: (id: number) => 
      fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      }).then(res => {
        if (!res.ok) throw new Error('Failed to delete contact');
        return id;
      }),
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] as const });
      setSelectedContactId(null);
    },
    onError: (error) => {
      console.error('Error deleting contact:', error);
    }
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contact: Contact) =>
      fetch(`${API_BASE_URL}/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, favourite: !contact.favourite }),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] as const });
    },
  });
};