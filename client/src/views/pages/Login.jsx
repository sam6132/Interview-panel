import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";

// core components
import Header from "components/Navbars/Nav.jsx";
import { login } from "services/auth";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    msg: null,
    loggingIn: false
  };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  login = e => {
    e.preventDefault();
    this.setState({ loggingIn: true });
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    login(user)
      .then(res => {
        let data = res.data;
        console.log(data);
        if (data.success === false)
          return this.setState({ msg: data.message, loggingIn: false });
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("team_id", data.user.team);
        localStorage.setItem("team_id", data.user.team);
        localStorage.setItem("role", data.user.role);
        this.props.history.push("/profile");
      })
      .catch(err => {
        return this.setState({ msg: err.message, loggingIn: false });
      });
  };
  render() {
    return (
      <div>
        <Header />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="container pt-lg-sm">
              <div className=" row justify-content-center">
                <div className="col-lg-5">
                  <div className="card bg-secondary shadow border-0">
                    <div className=" card-header bg-white pb-5">
                      <div className="text-center mb-2">
                        <h3>Sign in with credentials</h3>
                      </div>
                    </div>
                    <div className=" card-body px-lg-5 py-lg-5">
                      {this.state.msg ? (
                        <div className="alert alert-danger text-center">
                          {this.state.msg}
                        </div>
                      ) : (
                        ""
                      )}

                      <form className="form" role="form" onSubmit={this.login}>
                        <div className="mb-3 form-group">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              aria-label="email"
                              aria-required="true"
                              name="email"
                              value={this.state.email}
                              onChange={e =>
                                this.setState({ email: e.target.value })
                              }
                            />
                          </InputGroup>
                        </div>
                        <div className="form-group">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              aria-label="password"
                              aria-required="true"
                              name="password"
                              value={this.state.password}
                              onChange={e =>
                                this.setState({ password: e.target.value })
                              }
                            />
                          </InputGroup>
                        </div>

                        <div className="text-center">
                          {!this.state.loggingIn ? (
                            <button
                              onClick={this.login}
                              className="btn btn-primary my-4"
                              color="primary"
                              type="button"
                              aria-label="login"
                            >
                              Sign in
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary my-4"
                              type="button"
                              role="login"
                              aria-label="login"
                              disabled
                            >
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />
                              Loading...
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col text-center">
                      <Link to="/register" className="text-light">
                        <small>Create new account</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Login;
