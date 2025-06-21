import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  CardActions,
  Avatar,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  styled,
  keyframes
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  Edit, 
  Delete,
  Phone,
  LocationOn,
  Email
} from '@mui/icons-material';
import { useContactStore } from '../stores/contactStore';
import type { Contact } from '../types/contact';
import { useToggleFavorite, useDeleteContact } from '../api/contacts';
import ContactModal from './ContactModal';
import { useState } from 'react';
import styles from '../components/style/ContactCard.module.css';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const AnimatedCard = styled(Card)({
  '&:hover': {
    animation: `${pulseAnimation} 0.5s ease`,
  },
});

const ContactCard = ({ contact }: { contact: Contact }) => {
  const { setSelectedContactId } = useContactStore();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const toggleFavorite = useToggleFavorite();
  const deleteContact = useDeleteContact();

  const handleDelete = () => {
    deleteContact.mutate(contact.id, {
      onSuccess: () => {
        setIsDeleteConfirmOpen(false);
      }
    });
  };

  return (
    <>
      <AnimatedCard className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Box className={styles.contactHeader}>
            <Avatar 
              className={styles.avatar}
              sx={{ 
                bgcolor: contact.favourite ? 'secondary.main' : 'primary.main',
                width: 60,
                height: 60,
                fontSize: '1.5rem',
              }}
            >
              {contact.name.charAt(0)}
            </Avatar>
            <Box className={styles.contactDetails}>
              <Typography variant="h6" component="div" fontWeight="600">
                {contact.name}
                {contact.favourite && (
                  <Chip 
                    label="Favorite" 
                    size="small" 
                    color="secondary" 
                    sx={{ 
                      ml: 1,
                      color: 'white',
                      fontWeight: 500,
                    }} 
                  />
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contact.email}
              </Typography>
            </Box>
          </Box>
          
          <Box className={styles.detailRow}>
            <Email fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {contact.email}
            </Typography>
          </Box>
          
          <Box className={styles.detailRow}>
            <Phone fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2">{contact.phone}</Typography>
          </Box>
          
          <Box className={styles.detailRow}>
            <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {contact.address || 'No address provided'}
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={styles.actions}>
          <Box className={styles.actionGroup}>
            <IconButton 
              onClick={() => setEditModalOpen(true)}
              aria-label="edit"
              color="primary"
              sx={{ 
                backgroundColor: 'rgba(74, 107, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(74, 107, 255, 0.2)',
                }
              }}
            >
              <Edit />
            </IconButton>
            <IconButton 
              onClick={() => setIsDeleteConfirmOpen(true)}
              aria-label="delete"
              color="error"
              sx={{ 
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 107, 0.2)',
                }
              }}
            >
              <Delete />
            </IconButton>
          </Box>
          <IconButton 
            onClick={() => toggleFavorite.mutate(contact)}
            aria-label={contact.favourite ? "remove favorite" : "add favorite"}
            className={styles.favoriteButton}
            sx={{ 
              backgroundColor: contact.favourite ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0,0,0,0.05)',
              '&:hover': {
                backgroundColor: contact.favourite ? 'rgba(255, 107, 107, 0.2)' : 'rgba(0,0,0,0.1)',
              }
            }}
          >
            {contact.favourite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </CardActions>
      </AnimatedCard>
      
      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete Contact</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {contact.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDeleteConfirmOpen(false)}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteContact.isPending}
            sx={{ borderRadius: 2 }}
          >
            {deleteContact.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <ContactModal 
        open={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        contact={contact}
        mode="edit"
      />
    </>
  );
};

export default ContactCard;