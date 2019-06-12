import React, { Component } from "react";
import CandidateTable from "./CandidateTable";

import TableRow from "./TableRow";
import Header from "components/Navbars/Nav";

import "assets/css/style.css";
import Create from "./Create";
import EditableTable from "./EditableTable";
import CreateTeam from "components/Models/CreateTeam";
// import MaterialTable from './MaterialTable';
export default class Profile extends Component {
  state = {};

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

        <div className="m-sm ">
          <div className=" d-flex justify-content-end align-items-right mb-sm">
            <div>
              {localStorage.getItem("role") === "Team lead" ? (
                <div className="row ">
                  <div className="col-4 mb-sm">
                    <CreateTeam className="" />
                  </div>
                  <div className="col-4 mb-sm">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        this.props.history.push(
                          `/team/${localStorage.getItem("team_id")}`
                        )
                      }
                    >
                      Manage Team
                      <span className="btn-inner--icon">
                        <i className="fa fa-users pl-2" />
                      </span>
                    </button>
                  </div>
                  <div className="col-4 mb-sm">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.props.history.push("/questions");
                      }}
                    >
                      Questions
                      <span className="btn-inner--icon">
                        <i className="fa fa-question pl-2" />
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-6">
                    <CreateTeam className="" />
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.props.history.push("/questions");
                      }}
                    >
                      Questions
                      <span className="btn-inner--icon">
                        <i className="fa fa-question pl-2" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <CandidateTable {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
{
  /* <img  ref="image" src={http://media.licdn.com/dms/image/C560BAQEIOV9rnI_qmQ/company-logo_200_200/0?e=2159024400&v=beta&t=L__DJr6JencaOhdCm8y1zV5t4N_jITyuAOm7fDW4DQ0} />
				</nav> */
}
