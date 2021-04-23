import { AppBar, Box, makeStyles, Toolbar } from '@material-ui/core';
import Beer from '../../assets/beer.png';
import LogOutButton from '../ui/LogOutButton';

export default function NavBar() {
  const classes = useStyles();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar id="back-to-top-anchor">
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="center"
          >
            <img src={Beer} alt="Beer" className={classes.imgStyle} />
          </Box>
          <LogOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  imgStyle: {
    width: '80px',
    height: '55px',
  },
}));
