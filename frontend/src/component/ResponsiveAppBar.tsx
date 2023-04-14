import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleHomeSubmit = () => {
        navigate('/home');

    };
    const handleUserDataSubmit = () => {
        navigate('/profile');

    };
    const handleLoginSubmit = () => {

        navigate('/login');
    };
    const handleSignupSubmit = () => {

        navigate('/sign-up');
    };
    const handleLogoutSubmit = () => {

        navigate('/logout');
    };
    const handleActivitySubmit = () => {

        navigate('/activity');
    };
    const handleNutritionSubmit = () => {

        navigate('/nutrition');
    };
    const handleSleeptimesSubmit = () => {

        navigate('/sleep-times');
    };
    const handleLesenSubmit = () => {

        navigate('/lessen');
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <AppBar position="static" sx={{backgroundColor: 'black'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Tagesplaner
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={handleActivitySubmit}>
                                <Typography textAlign="center">Aktivitäten</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleNutritionSubmit}>
                                <Typography textAlign="center">Ernährung</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleSleeptimesSubmit}>
                                <Typography textAlign="center">Schlafzeiten</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLesenSubmit}>
                                <Typography textAlign="center">Lesen</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleHomeSubmit}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Tagesplaner
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                        <Button

                            onClick={handleActivitySubmit}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Aktivitäten
                        </Button>
                        <Button

                            onClick={handleNutritionSubmit}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Ernährung
                        </Button>
                        <Button

                            onClick={handleSleeptimesSubmit}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Schlafzeiten
                        </Button>
                        <Button

                            onClick={handleLesenSubmit}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Lesen
                        </Button>
                        <Button

                            onClick={handleHomeSubmit}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Home
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar src="/broken-image.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleUserDataSubmit}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLoginSubmit}>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogoutSubmit}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleSignupSubmit}>
                                <Typography textAlign="center">sign-up</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

        </AppBar>
    );
}

export default ResponsiveAppBar;