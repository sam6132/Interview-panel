import React, { Component } from "react";
import "assets/css/style.css";
import { addSkillsByCandidateId } from "services/candidate";
import { getSkillsByCandidateId } from "services/candidate";

export default class SideBar extends Component {
  state = {
    skill: "",
    skills: []
  };
  componentWillMount() {
    console.log(this.props.candidate);
    this.getSkill();
  }

  getSkill = () => {
    getSkillsByCandidateId(this.props.candidate._id).then(res => {
      const data = res.data;

      console.log(data);
      if (data === false) return console.log("Cannot get skill");
      this.setState({ skills: data });
    });
  };
  render() {
    return (
      <div className=" mt-sm">
        <div>
          <h2 className=" text-center pt-0  bold">Profile</h2>

          <h3 className="  mt-3 text-center ">{this.props.candidate.name}</h3>

          <p className="lead mt-sm text-center font-weight-bold">
            contact info
          </p>

          <p className="lead  mt-1 text-center  ">
            {this.props.candidate.email}
          </p>
          <p className="lead  mt-1 text-center ">
            {this.props.candidate.number}
          </p>
        </div>

        <div className="bg-dark text-white  p-sm">
          <h2 className=" text-center text-white">Skills</h2>
          <div className="row ">
            {this.state.skills.map((skill, index) => {
              return (
                <span className="badge badge-primary m-1" key={index}>
                  {skill}
                </span>
              );
            })}
          </div>
          <div className="input-group mt-sm">
            <input
              type="text"
              className="form-control input-group-alternative"
              placeholder="Add skill"
              value={this.state.skill}
              onChange={e => {
                this.setState({ skill: e.target.value });
              }}
            />
            <div className="input-group-append">
              <button
                className="btn  btn-success"
                onClick={() => {
                  console.log(this.state.skill);
                  addSkillsByCandidateId(
                    this.props.candidate._id,
                    this.state.skill
                  ).then(res => {
                    console.log(res.data);
                    this.getSkill();
                    this.setState({ skill: "" });
                  });
                }}
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-plus " />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
