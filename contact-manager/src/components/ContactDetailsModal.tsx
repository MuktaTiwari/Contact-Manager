import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  FavoriteBorder,
  Close
} from '@mui/icons-material';
import { useContactStore } from '../stores/contactStore';
import { useToggleFavorite } from '../api/contacts';
import type { Contact } from '../types/contact';
import styles from '../components/style/ContactDetailsModal.module.css';

interface ContactDetailsModalProps {
  contact: Contact | null;
}

const ContactDetailsModal = ({ contact }: ContactDetailsModalProps) => {
  const { selectedContactId, setSelectedContactId } = useContactStore();
  const toggleFavorite = useToggleFavorite();

  const handleClose = () => {
    setSelectedContactId(null);
  };

  if (!contact) return null;

  return (
    <Dialog
      open={!!selectedContactId}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className={styles.modal}
    >
      <DialogTitle className={styles.header}>
        <Box className={styles.titleContainer}>
          <Avatar 
            className={styles.avatar}
            sx={{ 
              bgcolor: contact.favourite ? 'secondary.main' : 'primary.main',
            }}
          >
            {contact.name.charAt(0)}
          </Avatar>
          <Box className={styles.titleText}>
            <Typography variant="h5" fontWeight="600">
              {contact.name}
              {contact.favourite && (
                <Chip 
                  label="Favorite" 
                  size="small" 
                  color="secondary"
                  className={styles.favoriteChip}
                />
              )}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {contact.email}
            </Typography>
          </Box>
          <IconButton 
            onClick={handleClose}
            className={styles.closeButton}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent className={styles.content}>
        <Box className={styles.detailItem}>
          <Email className={styles.icon} />
          <Box className={styles.detailText}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{contact.email}</Typography>
          </Box>
        </Box>
        
        <Divider className={styles.divider} />
        
        <Box className={styles.detailItem}>
          <Phone className={styles.icon} />
          <Box className={styles.detailText}>
            <Typography variant="caption" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1">{contact.phone}</Typography>
          </Box>
        </Box>
        
        <Divider className={styles.divider} />
        
        <Box className={styles.detailItem}>
          <LocationOn className={styles.icon} />
          <Box className={styles.detailText}>
            <Typography variant="caption" color="text.secondary">
              Address
            </Typography>
            <Typography variant="body1">
              {contact.address || 'No address provided'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions className={styles.actions}>
        <Button 
          startIcon={<FavoriteBorder />}
          onClick={() => toggleFavorite.mutate(contact)}
          variant={contact.favourite ? "contained" : "outlined"}
          color="secondary"
          className={styles.favoriteButton}
        >
          {contact.favourite ? 'Favorited' : 'Add to Favorites'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactDetailsModal;