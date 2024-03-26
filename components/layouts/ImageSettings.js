import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ImageIcon from '@mui/icons-material/Image';


const ImageSettings = () =>{
    return (
        <Paper sx={{ width: 250, maxWidth: '100%' }} >
          <MenuList open={false}>
            <MenuItem>
              <ImageIcon className='me-2' /> 
              <ListItemText>Changekkkkkkkk</ListItemText>
            </MenuItem>
            <MenuItem>
            <DeleteRoundedIcon className='me-2' />
              <ListItemText>Removekkkkk</ListItemText>
            </MenuItem>
           
          </MenuList>
        </Paper>
      );
}

export default ImageSettings;