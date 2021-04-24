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
import { useRecoilValue } from 'recoil';
import { userIsAdmin } from '../../state/user';
import { dateFormatter } from '../../utils/dateFormat';
import DeleteModal from './DeleteModal';
import AssistanceModal from './AssistanceModal';
import { CancelButton, SuccessButton } from './Buttons';

export default function CardMeetUp(props) {
  const { meet } = props;
  const isAdmin = useRecoilValue(userIsAdmin);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAssistanceModal, setOpenAssistanceModal] = useState(false);

  const deleteMeet = () => {
    setOpenDeleteModal(true);
  };

  const assistanceMeet = () => {
    setOpenAssistanceModal(true);
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
          {isAdmin ? (
            <CancelButton size="small" onClick={deleteMeet}>
              Delete Meeting
            </CancelButton>
          ) : (
            <SuccessButton size="small" onClick={assistanceMeet}>
              Go
            </SuccessButton>
          )}
        </CardActions>
      </Card>
      <AssistanceModal
        openModal={openAssistanceModal}
        setOpenModal={setOpenAssistanceModal}
        route={'assistance'}
        meetToDelete={meet}
      />

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        route={'meetup'}
        meetToDelete={meet}
      />
    </>
  );
}

CardMeetUp.propTypes = {
  meet: PropTypes.object,
};
