import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { useContactStore } from '../stores/contactStore';
import { useQuery } from '@tanstack/react-query';
import { fetchContactById } from '../api/contacts';
import ContactForm from './ContactForm';
import { useDeleteContact } from '../api/contacts';
import type { Contact } from '../types/contact';
import styles from '../components/style/ContactModal.module.css';
import { Close } from '@mui/icons-material';

const ContactModal = ({
  open,
  onClose,
  contact,
  mode = 'view'
}: {
  open: boolean;
  onClose: () => void;
  contact?: Contact;
  mode?: 'view' | 'edit' | 'create';
}) => {
  const { selectedContactId, setSelectedContactId } = useContactStore();
  const deleteMutation = useDeleteContact();

  const { data: contactData } = useQuery({
    queryKey: ['contact', selectedContactId],
    queryFn: () => fetchContactById(selectedContactId!),
    enabled: !!selectedContactId && mode === 'view',
  });

  const handleDelete = () => {
    if (selectedContactId) {
      deleteMutation.mutate(selectedContactId, {
        onSuccess: () => {
          setSelectedContactId(null);
          onClose();
        }
      });
    }
  };

  if (mode === 'view') {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Details</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Box className={styles.contactDetailContainer}>
            <Typography variant="h6" className={styles.contactName}>
              {contactData?.name}
            </Typography>

            <Box className={styles.detailRow}>
              <Typography component="span" className={styles.detailLabel}>Email:</Typography>
              <Typography className={styles.detailValue}>{contactData?.email}</Typography>
            </Box>

            <Box className={styles.detailRow}>
              <Typography component="span" className={styles.detailLabel}>Phone:</Typography>
              <Typography className={styles.detailValue}>{contactData?.phone}</Typography>
            </Box>

            <Box className={styles.detailRow}>
              <Typography component="span" className={styles.detailLabel}>Address:</Typography>
              <Typography className={styles.detailValue}>{contactData?.address}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button
            variant="contained"
            color="error"
            className={styles.deleteButton}
            onClick={() => {
              if (confirm('Are you sure you want to delete this contact?')) {
                handleDelete();
              }
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            variant="outlined"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

return (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <div className={styles.dialogHeader}>
      <DialogTitle className={styles.dialogTitle}>
        {mode === 'create' ? 'Add New Contact' : 'Edit Contact'}
      </DialogTitle>
      <IconButton 
        aria-label="close" 
        onClick={onClose}
        className={styles.closeButton}
      >
        <Close />
      </IconButton>
    </div>
    
    <DialogContent className={styles.dialogContent}>
      <ContactForm
        defaultValues={contact}
        onSuccess={onClose}
        mode={mode}
        onClose={onClose}
      />
    </DialogContent>
  </Dialog>
);
};

export default ContactModal;