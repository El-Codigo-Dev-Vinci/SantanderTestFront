import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { es } from 'date-fns/locale';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EditIcon from '@material-ui/icons/Edit';
import { ERRORS } from '../../text/Text';
import { LoadingButton } from '../ui/LoadingButton';
import { axiosPost } from '../../utils/fetchApi';
import { useNotifyUpdate } from '../../state/stateUpdate';

export default function CreateNewMeetUp() {
  const classes = useStyles();
  const [meetData, setMeetData] = useState({ date: new Date() });
  const [loading, setLoading] = useState(false);
  const notifyUpdate = useNotifyUpdate('meetup');

  const handleDateChange = (e) => {
    setMeetData({ ...meetData, date: new Date(e).toISOString() });
  };

  const handleData = (e) => {
    setMeetData({ ...meetData, [e.target.name]: e.target.value });
  };

  const createNewMeet = async () => {
    setLoading(true);
    try {
      await axiosPost('meetup', meetData);
      notifyUpdate();
    } catch (error) {
      console.log('Error trying to post Meet: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ValidatorForm onSubmit={createNewMeet} instantValidate={false}>
      <Grid container spacing={4} align="center" className={classes.root}>
        <Grid item xs={12}>
          <Grid item xs={11} align="left">
            <Typography variant="h4">Add new meetup</Typography>
          </Grid>
          <Grid container xs={12} align="left" className={classes.body}>
            <Grid item xs={12} sm={6} align="center">
              <Grid
                item
                xs={12}
                component={Box}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                className={classes.title}
              >
                <DateRangeIcon />
                <Typography>Set new date for the meeting</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                component={Box}
                display="flex"
                justifyContent="center"
              >
                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                  <DatePicker
                    disableToolbar
                    variant="static"
                    value={meetData.date}
                    onChange={handleDateChange}
                    autoOk={true}
                    disablePast={true}
                    emptyLabel=""
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} align="center">
              <Grid
                item
                xs={12}
                component={Box}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                className={classes.title}
              >
                <EditIcon />
                <Typography>Add title and description</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextValidator
                  fullWidth
                  label="Name of meeting"
                  name="name"
                  className={classes.spaceBetweenTextField}
                  value={meetData?.name}
                  onChange={handleData}
                  validators={['required']}
                  errorMessages={[ERRORS.required]}
                />
              </Grid>
              <Grid item xs={8}>
                <TextValidator
                  fullWidth
                  label="Description of meeting"
                  name="description"
                  className={classes.spaceBetweenTextField}
                  value={meetData?.description}
                  onChange={handleData}
                  validators={['required']}
                  errorMessages={[ERRORS.required]}
                />
              </Grid>
              <Grid item xs={12} className={classes.spaceBetweenTextField}>
                <LoadingButton loading={loading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#e0e0e0',
    marginTop: '20px',
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
