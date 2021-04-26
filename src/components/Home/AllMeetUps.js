import {
  Box,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { allMeetUps } from '../../state/meetups';
import CardMeetUp from '../ui/CardMeetUp';

export default function AllMeetUps() {
  const classes = useStyles();
  const meetUpsRecoil = useRecoilValue(allMeetUps);
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Grid container spacing={4} align="center" className={classes.root}>
      <Grid item xs={12}>
        <Grid item xs={11} align="center" className={classes.title}>
          <Typography variant="h4" color="primary">
            All meetups
          </Typography>
        </Grid>

        <Grid container spacing={2} align="left">
          {meetUpsRecoil.map((meet, i) => {
            return matches ? (
              <Grid item xs={11} sm={6} md={4} key={i}>
                <CardMeetUp meet={meet} />
              </Grid>
            ) : (
              <Grid
                container
                component={Box}
                display="flex"
                justifyContent="center"
                margin={1}
                key={i}
              >
                <Grid item xs={11}>
                  <CardMeetUp meet={meet} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: 'white',
  },
  title: {
    margin: '25px',
  },
  spaceBetweenTextField: {
    marginBottom: '15px',
  },
}));
