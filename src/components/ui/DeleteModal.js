import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useNotifyUpdate } from '../../state/stateUpdate';
import { useApi } from '../../utils/fetchApi';
import { TEXT } from '../../text/Text';
import { DangerButton } from './Buttons';

export default function DeleteModal({
  openModal,
  setOpenModal,
  route,
  meetToDelete,
}) {
  const notifyUpdate = useNotifyUpdate(route);
  const { deleteById } = useApi(route);

  const closeModal = () => {
    setOpenModal(false);
  };

  const deleteFile = async () => {
    await deleteById(meetToDelete.id);
    await notifyUpdate();
    closeModal();
  };

  return (
    <Dialog
      onClose={() => closeModal()}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        ¿Are you sure you want to delete <strong>{meetToDelete?.name}</strong>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeModal}>{TEXT.cancel}</Button>
        <DangerButton variant="contained" onClick={deleteFile}>
          {TEXT.delete}
        </DangerButton>
      </DialogActions>
    </Dialog>
  );
}

DeleteModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  route: PropTypes.string,
  meetToDelete: PropTypes.object,
};
