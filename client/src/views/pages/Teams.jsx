import React, { Component } from "react";
import axios from "axios";
import { addCandidate } from "services/candidate";
import Header from "components/Navbars/Nav";

import { getTeamsByTeamId } from "services/team";

export default class Teams extends Component {
  state = {
    team: {}
  };

  componentWillMount() {
    this.getTeam();
  }

  async getTeam() {
    const t_id = this.props.match.params.t_id;
    await getTeamsByTeamId(t_id)
      .then(res => {
        console.log(res.data);
        this.setState({ team: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <div>
        <Header />
        <main className="header">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>
        </main>

        {this.state.loading ? (
          <div className=" loader-container">
            <div className="loader m-auto" />
          </div>
        ) : (
          <div>
            <div className="container">
              <div className=" shadow-lg  mb-sm">
                {/* <img src={svgHeader} alt="" sizes="" srcset=""/> */}
              </div>
              <button
                className="btn btn-block btn-primary mb-sm ml-auto "
                onClick={() => {
                  this.props.history.push(
                    `/teamMembers/${this.props.match.params.t_id}`
                  );
                }}
              >
                Add Members
              </button>
              <div className="list-group ">
                {this.state.team.members
                  ? this.state.team.members.map(member => {
                      return (
                        <a
                          key={member._id}
                          href="#!"
                          className="list-group-item list-group-item-action mb-sm "
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1"> {member.name}</h5>
                          </div>
                          <p className="mb-1">{member.email}</p>
                        </a>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
