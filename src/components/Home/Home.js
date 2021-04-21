import AllMeetUps from './AllMeetUps';
import NavBar from '../NavBar/NavBar';
import CreateNewMeetUp from './CreateNewMeetUp';

export default function Home() {
  return (
    <>
      <NavBar />
      <CreateNewMeetUp />
      <AllMeetUps />
    </>
  );
}
