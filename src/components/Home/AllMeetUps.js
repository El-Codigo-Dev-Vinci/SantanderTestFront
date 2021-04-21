import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { allMeetUps } from '../../state/meetups';
import { dateFormatter } from '../../utils/dateFormat';

export default function AllMeetUps() {
  const classes = useStyles();
  const meetUpsRecoil = useRecoilValue(allMeetUps);

  return (
    <Grid container spacing={4} align="center" className={classes.root}>
      <Grid item xs={12}>
        <Grid item xs={11} align="left">
          <Typography variant="h4">All meetups</Typography>
        </Grid>
        <Grid container className={classes.body}>
          {meetUpsRecoil.map((meet, i) => {
            return (
              <Grid
                container
                key={i}
                component={Box}
                display="flex"
                justifyContent="center"
              >
                <Grid
                  item
                  xs={11}
                  component={Box}
                  display="flex"
                  flexDirection="row"
                >
                  <Grid item xs={4}>
                    <Typography variant="h6">{meet.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">{meet.description}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">
                      {dateFormatter(meet.date)}
                    </Typography>
                  </Grid>
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
  root: {
    backgroundColor: '#e0e0e0',
    marginTop: '50px',
  },
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
