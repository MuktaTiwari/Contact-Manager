import { useForm } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Stack, 
  Checkbox, 
  FormControlLabel,
  DialogContent,
  InputAdornment,
  Alert,
  Box,
  IconButton
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  LocationOn,
  Favorite,
  Close
} from '@mui/icons-material';
import type { ContactFormValues } from '../types/contact';
import { useCreateContact, useUpdateContact } from '../api/contacts';
import styles from '../components/style/ContactForm.module.css';

interface ContactFormProps {
  defaultValues?: ContactFormValues;
  onSuccess: () => void;
  onClose: () => void;
  mode?: 'create' | 'edit';
}

const ContactForm = ({ 
  defaultValues, 
  onSuccess,
  onClose,
  mode = 'create'
}: ContactFormProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ContactFormValues>({
    defaultValues: defaultValues || {
      name: '',
      email: '',
      phone: '',
      address: '',
      favourite: false,
    },
  });

  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();

  const onSubmit = (data: ContactFormValues) => {
    if (mode === 'create') {
      createMutation.mutate(data, { onSuccess });
    } else {
      if (defaultValues?.id) {
        updateMutation.mutate({ ...data, id: defaultValues.id }, { onSuccess });
      }
    }
  };

  return (
    <DialogContent className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} className={styles.formStack}>
          {(createMutation.isError || updateMutation.isError) && (
            <Alert severity="error" className={styles.errorAlert}>
              {createMutation.error?.message || updateMutation.error?.message}
            </Alert>
          )}

          <Box className={styles.formField}>
            <TextField
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              className={styles.textField}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={styles.inputAdornment}>
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className={styles.formField}>
            <TextField
              label="Email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              className={styles.textField}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={styles.inputAdornment}>
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className={styles.formField}>
            <TextField
              label="Phone"
              {...register('phone', { 
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number (10 digits required)',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              className={styles.textField}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={styles.inputAdornment}>
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className={styles.formField}>
            <TextField
              label="Address"
              {...register('address')}
              className={`${styles.textField} ${styles.addressField}`}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={styles.inputAdornment}>
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className={styles.formField}>
            <FormControlLabel
              control={
                <Checkbox 
                  {...register('favourite')} 
                  color="primary"
                  className={styles.favoriteCheckbox}
                  icon={<Favorite />}
                  checkedIcon={<Favorite color="error" />}
                />
              }
              label={<span className={styles.favoriteLabel}>Add to favorites</span>}
            />
          </Box>

          <Box className={styles.formField}>
            <Button 
              type="submit" 
              variant="contained" 
              className={styles.submitButton}
              disabled={createMutation.isPending || updateMutation.isPending}
              fullWidth
            >
              {mode === 'create' ? 'Add Contact' : 'Update Contact'}
              {(createMutation.isPending || updateMutation.isPending) && '...'}
            </Button>
          </Box>
        </Stack>
      </form>
    </DialogContent>
  );
};

export default ContactForm;