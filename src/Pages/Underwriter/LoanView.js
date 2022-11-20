import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Predictions from './Predictions';
import Document from './Document';
import PendingLoans from './PendingLoans';
import Tabs from 'react-bootstrap/Tabs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const drawerWidth = 240;

export default function LoanView() {
 
let token = localStorage.getItem('token')
if (!token){
window.location.href="http://localhost:3000" 
}

function tokenDestroy(){
  localStorage.removeItem('token')
    }
  
const [status, setStatus] = React.useState('');
  
const handleChange = (e) => {
    setStatus(e.target.value);
   
  };

  console.log(status)
  fetch(`http://127.0.0.1:8000/loan/apiupdatestatus/${localStorage.getItem("loanId")}/${status}`)
  
  
  const handleSubmit =()=>{
    fetch(`http://127.0.0.1:8000/loan/apiupdaterepayed/${localStorage.getItem("loanId")}`)
  window.location.href="http://localhost:3000/successful-underwriterlogin"
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <span>{localStorage.getItem("username")}</span>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </AppBar>

        <Drawer
              sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: 'rgba(33,37,41,255)',
              },
            }}
            variant="permanent"
            anchor="left"
          >
         <Toolbar />
            <List 
                sx={{
                  color: 'white',
                 
                }}
            >
              <ListItem disablePadding sx={{ ":hover":{
                    backgroundColor: '#fff',
                    color:'black'
                  }}}>
                <ListItemButton href='/successful-underwriterlogin'>
                  <ListItemIcon>
                  <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding  sx={{ ":hover":{
                    backgroundColor: '#fff',
                    color:'black'
                  }}}>
                <ListItemButton href='/' onClick={()=>tokenDestroy()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
  
        </Drawer>
        {/* Main content*/}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <div>
                <Toolbar/>
                <h6 align='right'>Loan Number: {localStorage.getItem("loanId")}</h6>
          </div>
          <Toolbar/>
            <Tabs
                  defaultActiveKey="Prediction"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                  onLoad={()=>{window.location.reload()}}
                >
              <Tab eventKey="Prediction" title="Default Prediction">
                <Predictions />
              </Tab>
              <Tab eventKey="Document" title="Documents">
                <Document />
              </Tab>
              <Tab eventKey="PendingLoan" title="Pending Loans">
                <PendingLoans />
              </Tab>
            </Tabs>
            <FormControl sx={{ m: 1, minWidth: 200 ,left:'700px', top:'180px',}} >
                <InputLabel id="demo-simple-select-autowidth-label" sx={{color:'black'}}>Approval status</InputLabel>
                 <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={status}
                    label="Approval Status"
                    onChange={handleChange}
                    
                    name = 'status'
                  >
      
                    <MenuItem value="accepted"   onClick={handleSubmit}
                    >Accept</MenuItem>
                    <MenuItem value="declined"  onClick={handleSubmit}
                    >Decline</MenuItem>
                  </Select>
            </FormControl>
        </Box>


    </Box>
  );
}


