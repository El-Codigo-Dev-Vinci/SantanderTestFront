import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { es } from 'date-fns/locale';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { ERRORS } from '../../text/Text';

export default function CreateNewMeetUp() {
  const classes = useStyles();
  const [meetUpDate, setMeetUpDate] = useState(new Date());
  const [meetData, setMeetData] = useState();

  const handleDateChange = (e) => {
    setMeetUpDate(e);
  };

  const handleData = (e) => {
    setMeetData({ ...meetData, [e.target.name]: e.target.value });
  };

  const createNewMeet = () => {
    console.log('Saved');
  };

  return (
    <ValidatorForm onSubmit={createNewMeet} instantValidate={false}>
      {console.log(meetData)}
      <Grid container spacing={4} align="center" className={classes.root}>
        <Grid item xs={12}>
          <Grid item xs={11} align="left">
            <Typography variant="h4">Add new meetup</Typography>
          </Grid>
          <Grid item xs={11} align="left" style={{ backgroundColor: 'white' }}>
            <Grid item xs={6} align="center">
              <DateRangeIcon />
              <Typography>Set new date for the meeting</Typography>
              <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar
                  variant="static"
                  value={meetUpDate}
                  onChange={handleDateChange}
                  autoOk={true}
                  disablePast={true}
                  emptyLabel=""
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={5} align="center">
              <TextValidator
                label="Name of meeting"
                name="name"
                value={meetData?.name}
                onChange={handleData}
                validators={['required']}
                errorMessages={[ERRORS.required]}
              />
              <TextValidator
                label="Description of meeting"
                name="description"
                value={meetData?.description}
                onChange={handleData}
                validators={['required']}
                errorMessages={[ERRORS.required]}
              />
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
}));
