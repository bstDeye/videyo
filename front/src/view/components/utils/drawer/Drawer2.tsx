import * as React from 'react';
import {ReactNode} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {DrawerAppBar} from "./DrawerAppBar";
import {DrawerAction} from "./drawer.constantes";
import {DrawerItems} from "./DrawerItems";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

type DrawerProps = {
    children: ReactNode,
    actions: DrawerAction[],
    title: string
};

export function PersistentDrawerLeft({children, title, actions}: DrawerProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };


    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <DrawerAppBar handleDrawer={handleDrawer} title={title} open={open}/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {actions.map((action, index) => (
                        // <ListItem key={index} disablePadding>
                        //     <ListItemButton>
                        //         <ListItemIcon>
                        //             {action.icon}
                        //         </ListItemIcon>
                        //         <ListItemText primary={action.label}/>
                        //     </ListItemButton>
                        // </ListItem>
                        <DrawerItems key={index} title={""} category={"Head"} action={action}/>

                    ))}
                </List>
                <Divider/>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
    );
}


