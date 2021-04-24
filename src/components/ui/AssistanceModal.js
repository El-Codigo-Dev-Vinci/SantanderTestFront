import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useNotifyUpdate } from '../../state/stateUpdate';
import { useApi } from '../../utils/fetchApi';
import { TEXT } from '../../text/Text';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/user';

export default function DeleteModal({ openModal, setOpenModal, route, meet }) {
  const notifyUpdate = useNotifyUpdate(route);
  const { create } = useApi(route);
  const user = useRecoilValue(userState);

  const closeModal = () => {
    setOpenModal(false);
  };

  const goToMeetup = async () => {
    await create({
      userId: user.id,
      meetupId: meet.id,
    });
    await notifyUpdate();
    closeModal();
  };

  return (
    <Dialog
      onClose={() => closeModal()}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      {console.log(meet)}
      <DialogTitle id="alert-dialog-slide-title">
        ¿Do you want to go to <strong>{meet?.name}</strong>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeModal}>{TEXT.cancel}</Button>
        <SuccessButton variant="contained" onClick={goToMeetup}>
          {TEXT.accept}
        </SuccessButton>
      </DialogActions>
    </Dialog>
  );
}

DeleteModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  route: PropTypes.string,
  meet: PropTypes.object,
};

export const SuccessButton = withStyles(({ palette }) => ({
  root: {
    color: palette.success.contrastText,
    backgroundColor: palette.success.main,
    '&:hover': {
      backgroundColor: palette.success.dark,
    },
  },
}))(Button);
