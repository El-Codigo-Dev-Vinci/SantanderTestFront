import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { dateFormatter } from '../../utils/dateFormat';
import DeleteModal from './DeleteModal';

export default function CardMeetUp(props) {
  const { meet } = props;
  const [openModal, setOpenModal] = useState(false);

  const deleteMeet = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography>{meet.name}</Typography>

          <Typography>{meet.description}</Typography>
          <Typography>{dateFormatter(meet.date)}</Typography>
        </CardContent>
        <CardActions>
          <CancelButton size="small" onClick={deleteMeet}>
            Delete Meeting
          </CancelButton>
        </CardActions>
      </Card>
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        route={'meetup'}
        meetToDelete={meet}
      />
    </>
  );
}

CardMeetUp.propTypes = {
  meet: PropTypes.obj,
};

const CancelButton = withStyles(({ palette }) => ({
  root: {
    color: palette.error.main,
    '&:hover': {
      color: palette.error.dark,
    },
  },
}))(Button);
