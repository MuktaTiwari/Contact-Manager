import { useState, useEffect } from 'react';
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
  keyframes,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Contacts as ContactsIcon,
  Favorite as FavoriteIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import SearchBar from './SearchBar';
import styles from '../components/style/AppLayout.module.css';
import { useContactStore } from '../stores/contactStore';


const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const AnimatedListItem = styled(ListItem)({
  animation: `${fadeIn} 0.3s ease forwards`,
});

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('contacts');
  const [isScrolled, setIsScrolled] = useState(false);
  const { showFavoritesOnly, toggleShowFavoritesOnly } = useContactStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'contacts', text: 'All Contacts', icon: <ContactsIcon /> },
    { id: 'favorites', text: 'Favorites', icon: <FavoriteIcon /> },
    // { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Typography variant="subtitle1" className={styles.sidebarTitle}>
          Contact Manager
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />
      <List>
        {navItems.map((item, index) => (
          <AnimatedListItem 
            key={item.id} 
            disablePadding
            sx={{ animationDelay: `${index * 0.1}s` }}
          >
            <ListItemButton
              selected={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
              sx={{
                px: 2,
                py: 1,
                m: 0.5,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(74, 107, 255, 0.1)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.875rem' }}
              />
            </ListItemButton>
          </AnimatedListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box className={styles.layoutContainer}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={styles.appBar}
        sx={{
          background: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Contact Manager
          </Typography>
          
          <Box className={styles.headerControls}>
            <Box className={styles.searchContainer}>
              <SearchBar />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={showFavoritesOnly}
                  onChange={toggleShowFavoritesOnly}
                  color="primary"
                  size="small"
                />
              }
              label="Favorites"
              labelPlacement="start"
              sx={{ 
                marginRight: 1,
                '& .MuiTypography-root': {
                  fontSize: '0.875rem',
                  color: 'text.secondary'
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        className={styles.navContainer}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          classes={{
            paper: styles.drawerPaper,
          }}
          className={styles.temporaryDrawer}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          classes={{
            paper: styles.drawerPaper,
          }}
          className={styles.permanentDrawer}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        className={styles.mainContent}
      >
        <Toolbar className={styles.toolbarSpacer} />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;