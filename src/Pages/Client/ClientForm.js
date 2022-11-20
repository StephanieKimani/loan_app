import * as React from 'react';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import useFormClient from './useFormClient';
import validate from './validateInfoClient';
import { Box } from '@mui/material';

import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import FileUpload from "react-material-file-upload";
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  width:600,
  pt: 2,
  px: 4,
  pb: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};


const ClientForm = ({ submitForm }) =>{
  
  //Form validation
  const {setValues,handleChange, handleSubmit, values, errors,
  files,handleFiles,setFiles,changeFiles,status,fetchStatus } = useFormClient(
    submitForm,
    validate
  );
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const [dialogopen, setDialogopen] = React.useState(false);

  const handledialogopen= () => {
    setDialogopen(true);
    fetchStatus()
  };

  const handledialogClose = () => {
    setDialogopen(false);
  };


  const buttons = [
    <Button key="one" onClick={handleOpen}>APPLICATION FORM</Button>,
    <Button key="two" onClick={handledialogopen}>LOAN STATUS</Button>,
  ];

  return (
    <div>
       {/* added this button group*/}
       <ButtonGroup color="secondary" variant="contained" size="large" aria-label="medium secondary button group">
          {buttons}
        </ButtonGroup>

        <Dialog
        open={dialogopen}
        onClose={handledialogClose}
        //TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        
        >
              <DialogTitle>Loan status</DialogTitle>
              <DialogContent>
                  Your loan application is {status}
              </DialogContent>

        </Dialog>

   

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            APPLICATION FORM
          </Typography>
        <form component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <TextField
                required
                label="Amount required"
                name='amount'
                type='text'
                value={values.amount}
                fullWidth
                autoComplete="amount"
                onChange={handleChange}
                />
                {errors.amount && <p>{errors.amount}</p>}
            </Grid>

            <Grid item xs={12} >
              <TextField
                required
                label="Monthly Payment"
                name='monthlyPayment'
                type='text'
                fullWidth
                autoComplete="monthlyPayment"
                value={values.monthlyPayment}
                onChange={handleChange}

                />
              {errors.monthlyPayment && <p>{errors.monthlyPayment}</p>}
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                label="Loan Duration"
                name='loanDuration'
                type='text'
                fullWidth
                autoComplete="loanDuration"
                helperText="Enter duration in months"
                value={values.loanDuration}
                onChange={handleChange}

              />
              {errors.loanDuration && <p>{errors.loanDuration}</p>}
            </Grid>
            <Grid item xs={12} >
            <InputLabel id="demo-simple-select-standard-label">Purpose of the loan</InputLabel>
              <Select
                  labelId="demo-simple-select-standard-label"
                  variant="standard"
                  name='loanPurpose'
                  value={values.loanPurpose}
                  label="Purpose"
                  onChange={handleChange}
              >
                  <MenuItem value="Emergency">Emergency</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
              </Select>
            </Grid>
            
             <Grid item xs={12}>
              <input
            type='file'
            multiple="multiple"
            onChange={handleFiles} />
            </Grid>
        
          </Grid>
          <Button  variant="contained" type='submit'>Submit</Button>
        </form>         
        </Box>

      </Modal>

    </div>
  );
}
export default ClientForm;