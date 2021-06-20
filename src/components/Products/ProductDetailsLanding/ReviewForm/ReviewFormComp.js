import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { SubmitButton } from './../../../common/SubmitButton/SubmitButtonComponent';

const defaultForm = {
  reviewPoint: 1,
  reviewMessage: '',
};

export default class ReviewForm extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        ...defaultForm,
      },
    };
  }

  changeRating = (newRating, name) => {
    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: newRating,
      },
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addReview(this.props.productId, this.state.data);
    this.setState({
      data: {
        ...defaultForm,
      },
    });
  };

  render() {
    return (
      <>
        <div className="col-md-4">
          <h3>Add Reviews</h3>
          <form onSubmit={this.handleSubmit} className="form-group" noValidate>
            <label>Points: </label>
            {/* <input
              type="number"
              value={this.state.data.reviewPoint}
              onChange={this.handleChange}
              className="form-control"
              name="reviewPoint"
            ></input> */}
            <div>
              <StarRatings
                starDimension="25px"
                rating={this.state.data.reviewPoint}
                starEmptyColor="white"
                starHoverColor="green"
                starRatedColor="green"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="reviewPoint"
              />
            </div>
            <br />
            <label>Message: </label>
            <input
              type="text"
              value={this.state.data.reviewMessage}
              onChange={this.handleChange}
              className="form-control"
              name="reviewMessage"
              placeholder="Review Here"
            ></input>
            <hr />
            <SubmitButton isSubmitting={this.props.isSubmitting}></SubmitButton>
          </form>
        </div>
      </>
    );
  }
}
