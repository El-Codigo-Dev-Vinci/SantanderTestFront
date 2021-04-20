import { Grid, makeStyles, Typography } from '@material-ui/core';
import Beer from '../../assets/beer.png';

export default function NavBar() {
  const classes = useStyles();

  return (
    <Grid container align="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <img src={Beer} alt="Beer" className={classes.imgStyle} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  imgStyle: {
    width: '80px',
    height: '55px',
  },
}));
