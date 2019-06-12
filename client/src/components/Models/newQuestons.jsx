import React, { PureComponent, Component } from "react";
import { Modal, Alert } from "reactstrap";
import axios from "axios";
import { addQuestion } from "services/questions";
import { createQuestion } from "services/questions";

export default class QuestionModel extends Component {
  state = {
    QuestionModel: false,
    error: false,
    msg: "",
    name: ""
  };
  toggleModel = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  onSubmit = e => {
    e.preventDefault();

    createQuestion(this.state.name)
      .then(res => {
        let data = res["data"];
        this.setState({
          name: "",

          QuestionModel: false,
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
        <div className="d-flex justify-content-center ">
          <button
            className="btn btn-primary my-sm"
            onClick={e => {
              this.toggleModel("QuestionModel");
            }}
          >
            Create question
            <span className="btn-inner--icon">
              <i className="fa fa-plus pl-2" />
            </span>
          </button>
        </div>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.QuestionModel}
        >
          <div className="modal-header">
            <h6 className="modal-name" id="modal-name-default">
              Create a question
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModel("QuestionModel")}
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
                <label>question name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>

              <div className="modal-footer">
                <div className="form-group">
                  <input
                    type="submit"
                    value="Create question "
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
