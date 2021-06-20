import React, { Component } from 'react';
import { handleError } from '../../../utils/ErrorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import { ProductForm } from './../ProductForm/ProductFormComponent';
import { Loader } from './../../common/Loader/LoaderComp';

export class EditProduct extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      product: {},
      isSubmitting: false,
    };
  }

  componentDidMount() {
    this.productId = this.props.match.params['id'];

    this.setState({
      isLoading: true,
    });

    httpClient
      .GET(`/product/${this.productId}`, true)
      .then((response) => {
        this.setState({
          product: response.data,
        });
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  edit = (data, files) => {
    this.setState({
      isSubmitting: true,
    });

    httpClient
      // .PUT(`/product/${this.productId}`, data, true)
      .UPLOAD('PUT', `product/${this.productId}`, data, files)
      .then((response) => {
        notify.showInfo('Product Updated');
        this.props.history.push('/view_products');
      })
      .catch((err) => {
        this.setState({
          isSubmitting: false,
        });
        handleError(err);
      });
  };

  removeExistingImage = (files) => {
    httpClient
      .PUT(`/product/remove_image/${this.productId}`, { files }, true)
      // .UPLOAD('PUT', `product/remove_image/${this.productId}`, { files }, true)
      .then((response) => {
        console.log('removed');
      })
      .catch((err) => {
        handleError(err);
      });
  };

  render() {
    let content = this.state.isLoading ? (
      <Loader />
    ) : (
      <ProductForm
        isEditMode={true}
        submitCallback={this.edit}
        isSubmitting={this.state.isSubmitting}
        productData={this.state.product}
        removeExistingImage={this.removeExistingImage}
      ></ProductForm>
    );
    return content;
  }
}
