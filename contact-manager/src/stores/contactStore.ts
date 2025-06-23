import { create } from 'zustand';

interface ContactStoreState {
  searchQuery: string;
  showFavoritesOnly: boolean;
  selectedContactId: number | null;
  setSearchQuery: (query: string) => void;
  toggleShowFavoritesOnly: () => void;
  setSelectedContactId: (id: number | null) => void;
}

export const useContactStore = create<ContactStoreState>((set) => ({
  searchQuery: '',
  showFavoritesOnly: false,
  selectedContactId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleShowFavoritesOnly: () => 
    set((state) => ({ showFavoritesOnly: !state.showFavoritesOnly })),
  setSelectedContactId: (id) => set({ selectedContactId: id }),
}));