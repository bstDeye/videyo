import {Collapse, List, ListItemButton, ListItemText, ListSubheader} from '@mui/material';
import React from 'react';
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExpandLess, ExpandMore, Send, StarBorder} from '@mui/icons-material';
import {DrawerAction} from "./drawer.constantes";

interface DrawerItemsProps {
    title: string,
    category: string,
    action: DrawerAction
}

export function DrawerItems({title, category, action}: DrawerItemsProps) {
    const [open, setOpen] = React.useState("");

    const handleClick = () => {
       open === category ? setOpen(""): setOpen(category);
    };

    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {""}
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {action.icon}
                </ListItemIcon>
                <ListItemText primary={action.label}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open === category} timeout="auto">
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}

