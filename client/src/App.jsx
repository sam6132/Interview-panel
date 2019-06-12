import React, { Component } from "react";
import Login from "views/pages/Login.jsx";
import Register from "views/pages/Register.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "views/pages/Profile";
import Detail from "views/pages/Detail";
import EditReview from "views/pages/EditReview";
import SideBar from "views/pages/SideBar";
import Create from "views/pages/Create";
import Nav from "components/Navbars/Nav.jsx";
import PrivateRoute from "components/routes/PrivateRoute";
import PublicRoute from "components/routes/PublicRoute";
import TeamMember from "views/pages/TeamMembers";
import Teams from "views/pages/Teams";
import Questions from "views/pages/Questions";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav props={this.props} />
        <Switch>
          <PublicRoute path="/" exact component={Login} />

          {/* <Route path="/home" exact render={props => <Profile {...props} />} /> */}

          <PublicRoute path="/register" exact component={Register} />
          {/* <Route path="/create" exact render={props => <Create {...props} />} /> */}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/detail/:id" exact component={Detail} />
          <PrivateRoute
            path="/edit-review/:c_id&:r_id"
            exact
            component={EditReview}
          />
          <PrivateRoute path="/review/:c_id&:r_id" exact component={Create} />
          <PrivateRoute
            path="/teamMembers/:t_id"
            exact
            component={TeamMember}
          />
          <PrivateRoute path="/team/:t_id" exact component={Teams} />
          <PrivateRoute path="/questions" exact component={Questions} />

          {/* <Route path="/edit/:id" excat render={props => <Edit {...props} />} /> */}
          {/* <PublicRoute path="/CandidateProfile" exact component={CandidateProfile}/> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
