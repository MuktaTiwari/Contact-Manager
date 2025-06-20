import { CssBaseline, ThemeProvider } from '@mui/material';

import {theme} from './utils/theme'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Contact Manager</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;