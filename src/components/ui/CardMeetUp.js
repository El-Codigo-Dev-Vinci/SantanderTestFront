import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userIsAdmin } from '../../state/user';
import { dateFormatter } from '../../utils/dateFormat';
import DeleteModal from './DeleteModal';
import AssistanceModal from './AssistanceModal';
import { CancelButton, SuccessButton } from './Buttons';
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { CalculateBeers } from '../../utils/calculateBeers';
import LocalBarIcon from '@material-ui/icons/LocalBar';

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
          <Box display="flex" flexDirection="row">
            <TitleIcon />
            <Typography>{meet.name}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <DescriptionIcon />
            <Typography>{meet.description}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <TodayIcon />
            <Typography>{dateFormatter(meet.date)}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <PeopleIcon />
            <Typography>People: {meet.Assistance.length}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <WbSunnyIcon />
            <Typography>Temperature: {meet.temperature}</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <LocalBarIcon />
            <Typography>
              Packs of Beers:{' '}
              {CalculateBeers(meet.Assistance.length, meet.temperature)}
            </Typography>
          </Box>
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
        meet={meet}
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
