import { Box, Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { haveLogUser, initialUserRouteState } from './state/user';

export default function App() {
  const initialUserRoute = useRecoilValue(initialUserRouteState);

  return (
    <Box>
      <Router>
        <Container>
          <Switch>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Redirect to={haveLogUser ? initialUserRoute : '/login'} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </Box>
  );
}
