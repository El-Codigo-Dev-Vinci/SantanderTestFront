import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userIsAdmin, userState } from '../../state/user';
import { dateFormatter, hourFormatter } from '../../utils/dateFormat';
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
import { find } from 'ramda';
import { useApi } from '../../utils/fetchApi';
import { useNotifyUpdate } from '../../state/stateUpdate';

export default function CardMeetUp(props) {
  const { meet } = props;
  const isAdmin = useRecoilValue(userIsAdmin);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAssistanceModal, setOpenAssistanceModal] = useState(false);
  const user = useRecoilValue(userState);
  const notifyUpdate = useNotifyUpdate('meetup');

  const deleteMeet = () => {
    setOpenDeleteModal(true);
  };

  const assistanceMeet = () => {
    setOpenAssistanceModal(true);
  };

  const isMyAssistance = (assistance) => {
    return assistance.userId === user.id;
  };

  const myAssistance = () => {
    return find(isMyAssistance, meet.Assistance);
  };
  const { create } = useApi(`assistance/${myAssistance()?.id}/entry`);

  const confirmEntry = async () => {
    await create();
    await notifyUpdate();
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
            <WbSunnyIcon />
            <Typography>Temperature: {meet.temperature}</Typography>
          </Box>
          {isAdmin && (
            <>
              <Box display="flex" flexDirection="row">
                <PeopleIcon />
                <Typography>People: {meet.Assistance.length}</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <LocalBarIcon />
                <Typography>
                  Packs of Beers:{' '}
                  {CalculateBeers(meet.Assistance.length, meet.temperature)}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
        <CardActions>
          {isAdmin ? (
            <CancelButton size="small" onClick={deleteMeet}>
              Delete Meeting
            </CancelButton>
          ) : !myAssistance() ? (
            <SuccessButton size="small" onClick={assistanceMeet}>
              Go to meet
            </SuccessButton>
          ) : meet.Assistance[0].dateOfEntry ? (
            <Button size="small">
              {hourFormatter(meet.Assistance[0].dateOfEntry)}
            </Button>
          ) : (
            <SuccessButton size="small" onClick={confirmEntry}>
              Confirm entry
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
