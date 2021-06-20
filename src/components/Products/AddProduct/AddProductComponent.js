import React, { Component } from 'react';
import { ProductForm } from './../ProductForm/ProductFormComponent';
import { httpClient } from './../../../utils/httpClient';
import { handleError } from './../../../utils/ErrorHandler';

import { notify } from './../../../utils/toaster';

export class AddProduct extends Component {
  constructor() {
    super();

    this.state = {
      isSubmitting: false,
    };
  }

  add = (data, files) => {
    // console.log('function in add product component', data);
    this.setState({
      isSubmitting: true,
    });

    const requestData = data;
    if (!requestData.discountedItem) {
      delete requestData.discountType;
      delete requestData.discountValue;
    }
    if (!requestData.warrentyStatus) {
      delete requestData.warrentyPeroid;
    }

    // API call
    httpClient
      .UPLOAD('POST', 'product', requestData, files)
      // .POST('/product', data, true)
      .then((response) => {
        notify.showSuccess('Product Added Successfully!');
        this.props.history.push('/view_products');
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
      <ProductForm
        isSubmitting={this.state.isSubmitting}
        isEditMode={false}
        submitCallback={this.add}
      ></ProductForm>
    );
  }
}
