import React, { Component } from "react";
import Header from "components/Navbars/Nav";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getQuestions } from "services/questions";
import { addQuestion } from "services/questions";
import QuestionModel from "components/Models/newQuestons";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "assets/css/style.css";
import { List, ListItemText } from "@material-ui/core";
import { Card, Paper } from "material-ui";
import empty from "assets/svg/empty.svg";
export default class Questions extends Component {
  state = {
    questions: [],
    question: "",
    id: "",

    editable: false,
    editordata: "",
    data: []
  };

  componentWillMount() {
    this.get();
  }
  get() {
    getQuestions().then(res => {
      console.log(res.data);
      this.setState({ questions: res.data });
      return res.data;
    });
  }

  submit(content) {
    console.log(this.state.questions);
  }

  handleChange = (id, ques) => {
    console.log(ques);
    this.setState({ question: ques, id: id });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="bg-gradient-default ">
          <div className="py-sm">
            <div className="align-items-center row" />
          </div>
        </div>
        <div>
          <div>
            <div className="row full-height ">
              <div className="col-md-3 bg-dark p-0 scrollable">
                <h3 className="text-white text-center"> Topics </h3>
                <QuestionModel className="mx-sm" />

                {this.state.questions.map((que, index) => {
                  return (
                    <List
                      onClick={() => {
                        this.handleChange(que._id, que.questions);
                      }}
                      key={index}
                    >
                      <div
                        className="alert alert-success mx-sm text-center"
                        role="alert"
                      >
                        {que.title}
                      </div>
                    </List>
                  );
                })}
              </div>

              <div className="col-md-9">
                <div>
                  {this.state.question === "" ? (
                    <div>
                      <img className="svg" src={empty} alt="" />
                      <p className="lead text-center">
                        {" "}
                        Click on any topics to view question{" "}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="card w-100 mh-2 my-sm text-center"
                      onDoubleClick={e => {
                        this.setState({ editable: true });
                      }}
                    >
                      <div>
                        {this.state.editable ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={this.state.question}
                            onInit={editor => {
                              // You can store the "editor" and use when it is needed.
                              // console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              this.setState({ editordata: data });
                            }}
                            onBlur={editor => {
                              this.setState({ editable: false });
                              console.log("blur");
                              addQuestion(this.state.id, this.state.editordata)
                                .then(res => {
                                  // console.log(res.data);
                                })
                                .catch(err => {
                                  console.log(err);
                                });
                              getQuestions().then(res => {
                                console.log(res.data);
                                this.setState({ questions: res.data });
                                console.log(res.data);
                                this.handleChange(
                                  this.state.id,
                                  res.data.questions
                                );
                              });
                            }}
                            onFocus={editor => {}}
                          />
                        ) : (
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: this.state.question
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
