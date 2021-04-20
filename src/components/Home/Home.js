import { Grid } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import CreateNewMeetUp from './CreateNewMeetUp';

export default function Home() {
  return (
    <>
      <NavBar />
      <CreateNewMeetUp />
    </>
  );
}
