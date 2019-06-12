import React, { Component } from "react";
import axios from "axios";
import Header from "components/Navbars/Nav";

import "assets/css/style.css";
import RoundDetailTable from "./RoundDetails";

export default class CandidateDetail extends Component {
  state = {
    candidate: "",

    candidate_id: ""
  };

  componentDidMount() {
    this.setState({ candidate_id: this.props.match.params.id });
    this.setState({ candidate: this.props.location.state });
  }
  render() {
    return (
      <div className="container ">
        <div>
          <div>
            <RoundDetailTable
              candidate={this.props.location.state}
              {...this.props}
            />
          </div>
        </div>
      </div>
    );
  }
}
