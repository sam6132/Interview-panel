import React from "react";
import Header from "./Nav";
import axios from "axios";
import { addTeamMember } from "services/team";

class TeamMember extends React.Component {
  state = {
    teamMembers: [{ name: "", email: "" }],
    teamLead: ""
  };
  handleChange = e => {
    let teamMembers = [...this.state.teamMembers];
    teamMembers[e.target.dataset.id][e.target.id] = e.target.value;
    this.setState({ teamMembers });
  };
  addMember = e => {
    this.setState(prevState => ({
      teamMembers: [...prevState.teamMembers, { name: "", email: "" }]
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  createTeamMembers = () => {
    console.log(this.state.teamMembers);
    const team_id = this.props.match.params.t_id;
    addTeamMember(team_id, this.state.teamMembers)
      .then(res => {
        let data = res["data"];
        this.setState({
          name: "",
          email: ""
        });
        this.props.history.goBack();
      })
      .catch(err => {
        console.log(err.msg);
      });
  };
  render() {
    let { teamLead, teamMembers } = this.state;
    return (
      <div>
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
        <div className="container mt-sm">
          <div className="card bg-secondary shadow border-0">
            <div className="card-header bg-white pb-5">
              Add members to your team
            </div>

            <form
              className="form"
              role="form"
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            >
              <div className="card-body">
                <button
                  className="btn btn-block btn-primary"
                  onClick={this.addMember}
                >
                  Add new Member
                </button>
                {teamMembers.map((val, idx) => {
                  let memberId = `teamMembers-${idx}`,
                    emailId = `email-${idx}`;
                  return (
                    <div key={idx} className="p-sm">
                      Member {idx + 1}
                      <div className="input-group-alternative my-sm ">
                        <input
                          type="text"
                          name={memberId}
                          placeholder="Member name"
                          data-id={idx}
                          id="name"
                          onChange={this.handleChange}
                          className=" name form-control"
                        />
                      </div>
                      <div className="input-group-alternative ">
                        <input
                          type="text"
                          name={emailId}
                          placeholder="Email address"
                          data-id={idx}
                          id="email"
                          onChange={this.handleChange}
                          className="email form-control"
                        />
                      </div>
                    </div>
                  );
                })}
                <input
                  className="btn btn-block btn-primary"
                  type="submit"
                  onClick={this.createTeamMembers}
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default TeamMember;
