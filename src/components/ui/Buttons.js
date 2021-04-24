import { Button, withStyles } from '@material-ui/core';

export const CancelButton = withStyles(({ palette }) => ({
  root: {
    color: palette.error.main,
    '&:hover': {
      color: palette.error.dark,
    },
  },
}))(Button);

export const DangerButton = withStyles(({ palette }) => ({
  root: {
    color: palette.error.contrastText,
    backgroundColor: palette.error.main,
    '&:hover': {
      backgroundColor: palette.error.dark,
    },
  },
}))(Button);

export const SuccessButton = withStyles(({ palette }) => ({
  root: {
    color: palette.success.contrastText,
    backgroundColor: palette.success.main,
    '&:hover': {
      backgroundColor: palette.success.dark,
    },
  },
}))(Button);
