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
  Visibility,
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

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedContactId(contact.id);
  };

  return (
    <>
      <AnimatedCard className={styles.card}>
        {contact.favourite && (
          <Chip
            label="Favorite"
            size="small"
            color="secondary"
            className={styles.favoriteChip}
            sx={{ color: 'white' }}
          />
        )}

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
              <Typography className={styles.contactName}>
                {contact.name}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions className={styles.actions}>
          <Box className={styles.actionGroup}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setEditModalOpen(true);
              }}
              aria-label="edit"
              color="primary"
              className={styles.actionButton}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteConfirmOpen(true);
              }}
              aria-label="delete"
              color="error"
              className={styles.actionButton}
            >
              <Delete />
            </IconButton>
          </Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite.mutate(contact);
            }}
            aria-label={contact.favourite ? "remove favorite" : "add favorite"}
            className={`${styles.favoriteButton} ${styles.actionButton}`}
          >
            {contact.favourite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>

          <IconButton
            onClick={handleViewDetails}
            aria-label="view details"
            className={styles.viewButton}
          >
            <Visibility />
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