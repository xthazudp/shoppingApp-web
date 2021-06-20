import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addReview_ac,
  fetchProduct_ac,
} from '../../../Redux/Actions/ProductAction';
import ProductDetails from './ProductDetails/ProductDetailsComp';
import ReviewForm from './ReviewForm/ReviewFormComp';

class ProductDetailsLanding extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.productId = this.props.match.params['id'];
    this.props.fetchProduct_ac(this.productId);
  }

  render() {
    return (
      <>
        <ProductDetails product={this.props.product}></ProductDetails>
        <ReviewForm
          isSubmitting={this.props.isSubmitting}
          productId={this.productId}
          addReview={this.props.add_review}
        ></ReviewForm>
      </>
    );
  }
}

const mapStateToProps = (rootStore) => ({
  product: rootStore.product.product,
  isSubmitting: rootStore.product.isSubmitting,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct_ac: (id) => dispatch(fetchProduct_ac(id)),
  add_review: (productId, reviewData) =>
    dispatch(addReview_ac(productId, reviewData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsLanding);
