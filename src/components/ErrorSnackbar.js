import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from '../store/actions/orders';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';


const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
}
const useStyles1 = makeStyles(theme => ({
  success: { backgroundColor: green[600] },
  error: { backgroundColor: theme.palette.error.dark },
  icon: { fontSize: 20 },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MySnackbarContentWrapper = ({ className, message, onClose, variant, ...other }) => {
  const classes = useStyles1();
  const Icon = variantIcon[variant];
  
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
  
MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'success']).isRequired,
};
const useStyles2 = makeStyles(theme => ({
  button: {
    textAlign: 'right',
    marginTop: '41px',
    marginLeft: '69%',
    fontSize: '19px',
    padding: '20px 40px'
  },
}))

const ErrorSnackbar = ({ history }) => {
  const classes = useStyles2();
  const auth = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClick = e => {
    e.preventDefault();
    setOpen(true);
    return dispatch(updateOrder(auth, history)).catch(() => setError('Payment error!'));
  }
  const handleClose = (event, reason) => {
    if(reason === 'clickaway') return;
    setOpen(false);
  }

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
          Pay
      </Button>
      <Snackbar
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
      >
          <MySnackbarContentWrapper
              onClose={handleClose}
              variant={error ? "error" : "success"}
              message={error ? error : "Success payment!"}
          />
      </Snackbar>
    </Fragment>
  )
}


export default ErrorSnackbar;