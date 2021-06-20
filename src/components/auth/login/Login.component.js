import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from './../../../utils/toaster';

import { handleError } from './../../../utils/ErrorHandler';
import { Dashboard } from './../../../utils/util';
import { httpClient } from '../../../utils/httpClient';
import { SubmitButton } from './../../common/SubmitButton/SubmitButtonComponent';

import './Login.component.css';
const defaultForm = {
  username: '',
  password: '',
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: '',
      // password: '',
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isValidForm: false,
      isSubmitting: false,
      remember_me: false,
    };
  }

  componentDidMount() {
    var rememberMe = JSON.parse(localStorage.getItem('remember_me'));
    if (rememberMe) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmitHandler = (e) => {
    // notify.showInfo('login clicked');
    e.preventDefault();
    let isValidForm = this.validateForm();
    if (!isValidForm) {
      return;
    }
    // console.log('Form submit here', this.state);
    this.setState({
      isSubmitting: true,
    });
    httpClient
      .POST(`/auth/login`, this.state.data)
      .then((response) => {
        notify.showSuccess(`Welcome ${response.data.user.username}`);
        // localstorage setup
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('remember_me', this, this.setState.remember_me);

        // Navigate to specific link
        // console.log('this.props.history.push()=>', this.props);
        // console.log('response is >>', response);
        Dashboard.redirectToDashboard(this.props.history, response);
        // this.props.history.push('/dashboard');
        // console.log('response is >>', response);
      })
      .catch((err) => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
  };

  onChangeHandler = (e) => {
    let { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      return this.setState({
        remember_me: checked,
      });
    }
    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        if (this.state.error[name]) {
          this.validateForm();
        }
      }
    );
  };

  validateForm = () => {
    let usernameErr = this.state.data['username'] ? '' : 'required field*';
    let passwordErr = this.state.data['password'] ? '' : 'required field*';

    this.setState({
      error: {
        username: usernameErr,
        password: passwordErr,
      },
    });

    let validForm = !(usernameErr || passwordErr);
    return validForm;
  };
  // validateForm = (fieldName) => {
  //   let errMsg;
  //   switch (fieldName) {
  //     case 'username':
  //       errMsg = this.state.data[fieldName] ? '' : 'Required field*';
  //       break;
  //     case 'password':
  //       errMsg = this.state.data[fieldName] ? '' : 'Required field*';
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState(
  //     (preState) => ({
  //       error: {
  //         ...preState.error,
  //         [fieldName]: errMsg,
  //       },
  //     }),
  //     () => {
  //       const errors = Object.values(this.state.error).filter((err) => err);
  //       console.log('errors is >>', errors);
  //       this.setState({
  //         isValidForm: errors.length === 0,
  //       });
  //     }
  //   );
  // };
  render() {
    let btn = this.state.isSubmitting ? (
      <button disabled className='btn btn-primary btn-sm'>
        Logging in..
      </button>
    ) : (
      <button type='submit' className='btn btn-primary btn-sm'>
        Login
      </button>
    );
    return (
      <div className='col-md-4 login'>
        <div className='container form-control bg-color'>
          <h2>Login</h2>
          <p>Please login to Proceed</p>
          <form
            className='form-group form-control bg-color'
            onSubmit={this.onSubmitHandler}
          >
            <label htmlFor='username'>Username</label>
            <input
              className='form-control'
              type='text'
              placeholder='Username'
              name='username'
              id='username'
              onChange={this.onChangeHandler}
            ></input>
            <p className='error'>{this.state.error.username}</p>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              type='password'
              placeholder='Password'
              name='password'
              id='password'
              onChange={this.onChangeHandler}
            ></input>
            <p className='error'>{this.state.error.password}</p>

            <input
              type='checkbox'
              name='remember_me'
              onChange={this.onChangeHandler}
            ></input>
            <label> &nbsp; Remember Me</label>
            <br />
            <SubmitButton
              isSubmitting={this.state.isSubmitting}
              enabledLabel='Login'
              disabledLabel='Loging in...'
            ></SubmitButton>
          </form>
          <p>Don't Have an Account?</p>
          <p className='float-right'>
            Register <Link to='/register'>here</Link>
          </p>
          <p className='float-left'>
            {' '}
            <Link to='/forgot_password'>forgot password?</Link>
          </p>
        </div>
      </div>
    );
  }
}
