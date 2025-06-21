import {
  TextField,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search as SearchIcon, Clear } from '@mui/icons-material';
import { useContactStore } from '../stores/contactStore';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from '../components/style/SearchBar.module.css';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContactStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [debouncedSearch] = useDebounce(localSearch, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  return (
    <Box className={styles.searchBar}>
      <TextField
        placeholder="Search contacts"
        variant="outlined"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        size="small"
        className={styles.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: localSearch && (
            <IconButton
              onClick={() => {
                setLocalSearch('');
                setSearchQuery('');
              }}
              size="small"
            >
              <Clear fontSize="small" />
            </IconButton>
          )
        }}
      />
    </Box>
  );
};

export default SearchBar;