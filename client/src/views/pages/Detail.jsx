import React, { Component } from "react";
import axios from "axios";
import Header from "components/Navbars/Nav";

import "assets/css/style.css";
import RoundDetailTable from "./RoundDetails";
import SideBar from "views/pages/SideBar";
import CandidateDetail from "./CandidateDetail";

export default class Detail extends Component {
  state = {
    candidate: "",
    // infoModel: false,
    // addRoundModel: false,
    candidate_id: ""
  };

  componentDidMount() {
    this.setState({ candidate_id: this.props.match.params.id });
    this.setState({ candidate: this.props.location.state });
    console.log(this.state.candidate);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bg-gradient-default ">
          <div className="py-sm">
            <div className="align-items-center row" />
          </div>
        </div>
        <div className="row full-height ">
          <div className="col-lg-3 col-sm-12 bg-light text-dark p-0 order-lg-1 ">
            <SideBar className="" candidate={this.props.location.state} />
          </div>
          <div className="col-lg-8 p-0 mx-auto ml-0 mt-sm order-lg-2">
            <CandidateDetail {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
