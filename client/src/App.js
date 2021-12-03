import Home from "./pages/Home";
import Login from "./pages/Login";
// import Profile from "./pages/Profile";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useContext } from "react";
// import AuthService from './utils/auth'
// import Messenger from "./pages/Messanger";

function App() {
  // const { user } = useContext(AuthService);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Route path="/messenger">
          <Messenger />
        </Route> */}
        {/* <Route path="/profile/:username">
          <Profile />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
