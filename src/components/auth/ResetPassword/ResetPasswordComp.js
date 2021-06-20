import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from './../../../utils/ErrorHandler';
import { httpClient } from './../../../utils/httpClient';
import { notify } from './../../../utils/toaster';
import { SubmitButton } from './../../common/SubmitButton/SubmitButtonComponent';

const defaultForm = {
  password: '',
  confirmPassword: '',
};

export class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isSubmitting: false,
      isValidForm: false,
    };
  }

  componentDidMount() {
    this.token = this.props.match.params['token'];
  }

  validateForm = (fieldName, type = 'change') => {
    if (type === 'submit') {
      console.log('Inside Submit..');
      let passwordErr = false;
      let confirmPasswordErr = false;
      let validForm = true;

      if (!this.state.data['password']) {
        passwordErr = 'required field*';
        validForm = false;
      }

      if (!this.state.data['confirmPassword']) {
        confirmPasswordErr = 'required field*';
        validForm = false;
      }

      this.setState({
        error: {
          password: passwordErr,
          confirmPassword: confirmPasswordErr,
        },
      });

      return validForm;
    }

    let errMsg;

    switch (fieldName) {
      case 'password':
        errMsg = this.state.data[fieldName]
          ? this.state.data['confirmPassword']
            ? this.state.data['confirmPassword'] === this.state.data[fieldName]
              ? ''
              : 'password did not match'
            : this.state.data[fieldName].length > 6
            ? ''
            : 'weak password'
          : 'required field*';
        break;
      case 'confirmPassword':
        errMsg = this.state.data[fieldName]
          ? this.state.data['password']
            ? this.state.data['password'] === this.state.data[fieldName]
              ? ''
              : 'password did not match'
            : this.state.data[fieldName].length > 6
            ? ''
            : 'weak password'
          : 'required field*';
        break;
      default:
        break;
    }

    this.setState(
      (preState) => ({
        error: {
          ...preState.error,
          [fieldName]: errMsg,
        },
      }),
      () => {
        const errors = Object.values(this.state.error).filter((err) => err);
        this.setState({
          isValidForm: errors.length === 0,
        });
      }
    );
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        this.validateForm(name);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const isValidForm = this.validateForm(null, 'submit');

    if (!isValidForm) return;

    this.setState({
      isSubmitting: true,
    });

    httpClient
      .POST(`/auth/reset-password/${this.token}`, this.state.data)
      .then((response) => {
        notify.showInfo('Password Reset Successfull please login');
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
        <h2>Reset Password</h2>
        <p>Please choose your password wisely</p>
        <form onSubmit={this.handleSubmit} className="form-group" noValidate>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          <p className="error">
            {this.state.error.password && this.state.error.password}
          </p>

          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
          <p className="error">
            {this.state.error.confirmPassword &&
              this.state.error.confirmPassword}
          </p>
          <SubmitButton isSubmitting={this.state.isSubmitting}></SubmitButton>
        </form>
        <p>
          back to <Link to="/">login</Link>
        </p>
      </div>
    );
  }
}

export default ResetPassword;
