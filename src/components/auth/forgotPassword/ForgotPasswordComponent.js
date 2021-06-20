import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from './../../../utils/ErrorHandler';
import { httpClient } from './../../../utils/httpClient';
import { notify } from './../../../utils/toaster';
import { SubmitButton } from './../../common/SubmitButton/SubmitButtonComponent';

export class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      emailErr: true,
      isSubmitting: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let errMsg;
    this.setState(
      {
        [name]: value,
      },
      () => {
        errMsg = this.state.email
          ? this.state.email.includes('@') && this.state.email.includes('.com')
            ? ''
            : 'invalid email'
          : 'required field';
        this.setState({
          emailErr: errMsg,
        });
      }
    );
  };

  handleSubmit = (e) => {
    this.setState({
      isSubmitting: true,
    });
    e.preventDefault();
    httpClient
      .POST('/auth/forgot-password', { email: this.state.email })
      .then((response) => {
        notify.showInfo(
          'Password reset link sent to your email please check your inbox'
        );
        this.props.history.push('/');
      })
      .catch((err) => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
  };

  render() {
    return (
      <div className="form-group">
        <h2>Forgot Password</h2>
        <p>Please Provide registered email to reset your password</p>
        <form className="form-group" onSubmit={this.handleSubmit} noValidate>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email address here"
            className="form-control"
            onChange={this.handleChange}
          ></input>
          <p className="error">{this.state.emailErr}</p>
          <SubmitButton
            isSubmitting={this.state.isSubmitting}
            isDisabled={this.state.emailErr}
          ></SubmitButton>
        </form>
        <p>
          back to <Link to="/">login</Link>
        </p>
      </div>
    );
  }
}
