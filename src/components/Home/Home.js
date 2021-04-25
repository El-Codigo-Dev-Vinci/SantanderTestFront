import AllMeetUps from './AllMeetUps';
import NavBar from '../NavBar/NavBar';
import CreateNewMeetUp from './CreateNewMeetUp';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/user';

export default function Home() {
  const user = useRecoilValue(userState);

  return (
    <>
      <NavBar />
      {user?.role === 'admin' && <CreateNewMeetUp />}
      <AllMeetUps />
    </>
  );
}
