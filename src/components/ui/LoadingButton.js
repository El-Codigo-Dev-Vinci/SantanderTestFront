import { CircularProgress, Button } from '@material-ui/core';
import { PropTypes } from 'prop-types';

export function LoadingButton({ loading, texto = 'Save' }) {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading}
    >
      {loading ? <CircularProgress size={25} /> : texto}
    </Button>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  texto: PropTypes.string,
};
