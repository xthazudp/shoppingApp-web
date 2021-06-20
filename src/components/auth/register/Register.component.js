import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from './../../../utils/toaster';

import { handleError } from '../../../utils/ErrorHandler';
import { httpClient } from '../../../utils/httpClient';
import { SubmitButton } from './../../common/SubmitButton/SubmitButtonComponent';

import './Register.component.css';

const defaultForm = {
  name: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  temporaryAddress: '',
  permanentAddress: '',
};

const errFields = {
  username: false,
  password: false,
  email: false,
  confirmPassword: false,
};

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...errFields,
      },
      isValidForm: false,
      isSubmitting: false,
    };
  }

  // initial
  componentDidMount() {
    // console.log('Component Mounted.');
  }

  // Update Stage
  // componentDidUpdate(preProps, PreState) {
  //   console.log('PrevState ==>', PreState.data);
  //   console.log('Current State ==>', this.state.data);
  // }

  // Destroy
  componentWillUnmount() {
    // console.log('componentWillUnmont-> Usage completed.');
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const isValidForm = this.validateRequiredFields();
    if (!isValidForm) {
      return;
    }
    this.setState({
      isSubmitting: true,
    });
    //  api call
    httpClient
      .POST(`/auth/register`, this.state.data)
      .then((response) => {
        notify.showInfo('Registration successfull..Now Login');
        this.props.history.push('/');
      })
      .catch((err) => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
  };

  onChangeHandler = (e) => {
    let { name, value } = e.target;

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

  validateForm = (fieldName) => {
    let errMsg;
    switch (fieldName) {
      case 'username':
        errMsg = this.state.data[fieldName] ? '' : 'required field*';
        break;

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
      case 'email':
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].includes('@') &&
            this.state.data[fieldName].includes('.com')
            ? ''
            : 'invalid email'
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
        // console.log('errors is >>', errors);
        this.setState({
          isValidForm: errors.length === 0,
        });
      }
    );
  };

  validateRequiredFields = () => {
    let validForm = true;
    let usernameErr = false;
    let passwordErr = false;
    let confirmPasswordErr = false;
    let emailErr = false;

    if (!this.state.data.username) {
      validForm = false;
      usernameErr = 'required field*';
    }
    if (!this.state.data.password) {
      validForm = false;
      passwordErr = 'required field*';
    }
    if (!this.state.data.confirmPassword) {
      validForm = false;
      confirmPasswordErr = 'required field*';
    }
    if (!this.state.data.email) {
      validForm = false;
      emailErr = 'required field*';
    }

    this.setState({
      error: {
        username: usernameErr,
        password: passwordErr,
        confirmPassword: confirmPasswordErr,
        email: emailErr,
      },
    });

    return validForm;
  };
  render() {
    let btn = this.state.isSubmitting ? (
      <button disabled className='btn btn-primary btn-sm'>
        Submitting..
      </button>
    ) : (
      <button
        disabled={!this.state.isValidForm}
        type='submit'
        className='btn btn-primary btn-sm'
      >
        Submit
      </button>
    );
    return (
      <div className='col-md-6 register'>
        <div className='form-control bg-color'>
          <h2>Register</h2>
          <p>Please fill up the following details</p>
          <form
            className='form-group form-control bg-color'
            onSubmit={this.onSubmitHandler}
          >
            <label htmlFor='name'>Name</label>
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              name='name'
              id='name'
              onChange={this.onChangeHandler}
            ></input>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control'
              type='text'
              placeholder='Email'
              name='email'
              id='email'
              onChange={this.onChangeHandler}
            ></input>
            <p className='error'>{this.state.error.email}</p>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              className='form-control'
              type='number'
              name='phoneNumber'
              id='phoneNumber'
              onChange={this.onChangeHandler}
            ></input>
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
            <label>Confirm Password</label>
            <input
              type='password'
              className='form-control'
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={this.onChangeHandler}
            />
            <p className='error'>{this.state.error.confirmPassword}</p>
            <label>Gender</label>
            <br />
            <input
              type='radio'
              value='male'
              name='gender'
              onChange={this.onChangeHandler}
            />{' '}
            Male
            <input
              type='radio'
              value='female'
              name='gender'
              onChange={this.onChangeHandler}
            />{' '}
            Female
            <input
              type='radio'
              value='others'
              name='gender'
              onChange={this.onChangeHandler}
            />{' '}
            Others
            <br />
            <label>Date Of Birth</label>
            <input
              type='date'
              name='dob'
              className='form-control'
              onChange={this.onChangeHandler}
            ></input>
            <label>Temporary Address</label>
            <input
              type='text'
              name='temporaryAddress'
              placeholder='Temporary Address'
              className='form-control'
              onChange={this.onChangeHandler}
            ></input>
            <label>Permanent Address</label>
            <input
              type='text'
              name='permanentAddress'
              placeholder='Permanent Address'
              className='form-control'
              onChange={this.onChangeHandler}
            ></input>
            <hr />
            <SubmitButton
              isSubmitting={this.state.isSubmitting}
              isDisabled={!this.state.isValidForm}
            ></SubmitButton>
          </form>
          <p>
            Already Registered? <Link to='/'>back to login</Link>
          </p>
        </div>
      </div>
    );
  }
}
