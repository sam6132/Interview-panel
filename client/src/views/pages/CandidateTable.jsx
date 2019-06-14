import React, { Component } from "react";
import MaterialTable from "material-table";
import { getCandidates } from "services/candidate";
import { getAccessToken } from "services/auth";
import { addCandidate } from "services/candidate";
import { editCandidateById } from "services/candidate";
import { deleteCandidateById } from "services/candidate";
import { getTeams } from "services/team";

export default class CandidateTable extends Component {
  state = {
    candidates: [],
    columns: [
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Number", field: "number", type: "numeric" },
      // { title: "Team Member", field: "team_member", lookup: {} },
      { title: "Status", field: "status" }
      // { title: "Team", field: "team", lookup: this.getTeams() }
    ]
  };

  componentDidMount() {
    this.getCandidates();
    this.getTeams();
  }

  handleChange = e => {
    console.log(e.target.value);
    // this.getTeamMembers(e.target.value);
  };

  getTeams() {
    getTeams().then(res => {
      console.log(res.data);
      let obj = {};
      for (let team of res.data) {
        obj[team._id] = team.name;
        // <option value={team._id}>{team.name}</option>;
      }

      this.setState(prevState => ({
        columns: [
          ...prevState.columns,
          {
            title: "Team",
            field: "team",
            lookup: obj
          }
        ]
      }));
    });
  }

  getCandidates = () => {
    getCandidates()
      .then(response => {
        if (response.data.success === false) {
          getAccessToken();
          return;
        }
        this.setState({
          candidates: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  navEdit = (e, data) => {
    console.log(data);

    this.props.history.push({
      pathname: `/detail/${data._id}`,
      hash: "#hash",
      state: { data }
    });
  };

  render() {
    return (
      <MaterialTable
        title="Candidates List"
        columns={this.state.columns}
        data={this.state.candidates}
        onRowClick={this.navEdit}
        editComponent={e => {
          console.log("sa");
        }}
        // onChange={e => console.log("e")}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              console.log("onRowAdd..........", this.state.candidates);
              setTimeout(() => {
                resolve();
                console.log(newData);
                addCandidate(newData)
                  .then(res => {
                    let data = res.data;
                    if (data.success === false)
                      return this.setState({ msg: data.message });
                    this.getCandidates();
                  })
                  .catch(error => {
                    this.setState({ msg: error.message });
                    alert(this.state.msg);
                  });
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              console.log(newData);

              setTimeout(() => {
                resolve();

                editCandidateById(newData._id, newData)
                  .then(res => {
                    this.getCandidates();
                  })
                  .catch(err => {
                    console.log(err.msg);
                  });
              }, 600);
            }),

          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                deleteCandidateById(oldData._id)
                  .then(res => {
                    this.getCandidates();
                  })
                  .catch(err => {
                    console.log(err.msg);
                  });
              }, 600);
            })
        }}
      />
    );
  }
}
