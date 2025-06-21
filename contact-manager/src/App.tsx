import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppLayout from './components/AppLayout';
import ContactList from './components/ContactList';
import { theme } from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <ContactList />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;