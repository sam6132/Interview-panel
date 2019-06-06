import React, { Component } from "react";
import MaterialTable from "material-table";
import { getRoundDetailsByCandidateId } from "services/candidate";
import { updateRoundDetailsByCandidateId } from "services/candidate";
import { addReview } from "services/review";
import { editReviewByReviewId } from "services/review";
import { deleteReviewByReviewId } from "services/review";
import { getTeamMembers } from "services/team";

export default class RoundDetailTable extends Component {
  state = {
    rounddetails: [],
    candidate_id: "",
    team_id: "",
    columns: [
      { title: "round", field: "title" },
      { title: "comment", field: "comment" },
      {
        title: "qualified",
        field: "qualified",
        lookup: { true: "yes", false: "no" }
      }
    ]
  };

  componentDidMount() {
    console.log(this.props);
    this.getReview();
    // this.getTeamMembers();
  }
  componentWillReceiveProps() {
    // this.setState({ team_id: this.props.team });
    // console.log(this.props.team);
  }

  getReview = async () => {
   
    await getRoundDetailsByCandidateId(this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({ rounddetails: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    // this.getTeamMembers();
  };
 

  render() {
    return (
      <MaterialTable
        title="Rounds List"
        columns={this.state.columns}
        data={this.state.rounddetails}
        onRowClick={(e, data) => {
          this.props.history.push(
            `/review/${this.props.match.params.id}&${data._id}`
          );
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                addReview(this.props.match.params.id, newData)
                  .then(res => {
                    this.getReview();
                    console.log(res.data);
                  })
                  .catch(err => {
                    console.log(err.message);
                  });
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();

                console.log(newData);
                editReviewByReviewId(newData._id, newData)
                  .then(res => {
                    console.log(res.data);
                    this.getReview();
                  })
                  .catch(err => {
                    console.log(err.message);
                  });
              }, 600);
            }),

          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                deleteReviewByReviewId(this.props.match.params.id, oldData._id)
                  .then(res => {
                    console.log(res.data);
                    this.getReview();
                  })
                  .catch(err => {
                    console.log(err.message);
                  });
              }, 600);
            })
        }}
      />
    );
  }
}
