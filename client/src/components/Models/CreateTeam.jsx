import React, { PureComponent, Component } from "react";
import { Button, Modal, Alert } from "reactstrap";
import axios from "axios";

export default class CreateTeam extends Component {
  state = {
    createTeam: false,
    error: false,
    msg: "",
    team_name: "",
    name: "",
    email: ""
  };
  toggleModel = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const team = {
      name: this.state.team_name,
      team_lead: {
        name: this.state.name,
        email: this.state.email
      }
    };
    // console.log(team);
    // console.log(team);

    if (!team.team_lead.email.endsWith("blockchainappfactory.com")) {
      return this.setState({
        error: true,
        msg: "email id doesnot present in context"
      });
    }

    axios
      .post("http://localhost:5000/api/team/createTeam/", team, {
        headers: { "x-auth": localStorage.getItem("token") }
      })
      .then(res => {
        let data = res["data"];
        this.setState({
          name: "",
          email: "",
          createTeam: false,
          error: true
        });
      })
      .catch(err => {
        console.log(err.msg);
        this.setState({
          error: true,
          msg: err
        });
      });

    // this.props.history.push('/Profile');
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-end ">
          <button
            className="btn btn-primary  mb-sm"
            onClick={e => {
              this.toggleModel("createTeam");
            }}
          >
            Create Team
            <span className="btn-inner--icon">
              <i className="fa fa-plus pl-2" />
            </span>
          </button>
        </div>
        <Modal className="modal-dialog-centered" isOpen={this.state.createTeam}>
          <div className="modal-header">
            <h6 className="modal-name" id="modal-name-default">
              Create a team
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModel("createTeam")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="container">
            {this.state.error ? (
              <Alert color="danger mt-sm">
                <strong>Error ! </strong>
                {this.state.msg}
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="modal-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Team name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.team_name}
                  onChange={e => {
                    this.setState({ team_name: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Team lead name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label> Team lead email Address: </label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </div>

              <div className="modal-footer">
                <div className="form-group">
                  <input
                    type="submit"
                    value="Create team and send mail"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
