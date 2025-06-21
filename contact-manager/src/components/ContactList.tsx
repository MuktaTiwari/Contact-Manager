import { useQuery } from '@tanstack/react-query';
import { 
  CircularProgress, 
  Pagination, 
  Typography,
  Box,
  Fab,
  Skeleton
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { fetchContacts } from '../api/contacts';
import { useContactStore } from '../stores/contactStore';
import ContactCard from './ContactCard';
import { useState } from 'react';
import ContactModal from './ContactModal';
import type { Contact } from '../types/contact';
import styles from '../components/style/ContactList.module.css';

const ContactList = () => {
  const { searchQuery, showFavoritesOnly } = useContactStore();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['contacts', { searchQuery, showFavoritesOnly, page }],
    queryFn: () => fetchContacts(searchQuery, showFavoritesOnly, page, 10),
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const contacts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  if (error) return (
    <Typography className={styles.errorText}>
      Error loading contacts: {error.message}
    </Typography>
  );

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden', // Disable scrolling
      minHeight: 'calc(100vh - 64px)', // Subtract header height
      paddingBottom: '80px' // Make space for fixed pagination
    }}>
      {isLoading ? (
        <Box className={styles.gridContainer}>
          {[...Array(8)].map((_, index) => (
            <Skeleton 
              key={index} 
              variant="rounded" 
              width="100%" 
              height={280} 
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Box>
      ) : contacts.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: 'calc(100vh - 144px)', // Adjusted for header and pagination
          textAlign: 'center',
          p: 3
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No contacts found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchQuery ? 'Try a different search term' : 'Create your first contact'}
          </Typography>
        </Box>
      ) : (
        <Box className={styles.gridContainer}>
          {contacts.map((contact: Contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </Box>
      )}

      {/* Fixed Pagination */}
      {totalPages > 1 && (
        <Box className={styles.fixedPagination}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            disabled={isFetching}
          />
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setAddModalOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 80, // Adjusted to appear above pagination
          right: 32,
          width: 56,
          height: 56,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease',
          zIndex: 1001 // Above pagination
        }}
      >
        <Add />
      </Fab>

      <ContactModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        mode="create"
      />
    </Box>
  );
};

export default ContactList;