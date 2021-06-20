import React, { Component } from 'react';
import { handleError } from '../../../utils/ErrorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import Product from '../Product/Product';

const IMG_URL = process.env.REACT_APP_IMG_URL;

export class ProductView extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      products: [],
    };
  }
  componentDidMount() {
    if (this.props.results) {
      return this.setState({
        products: this.props.results,
      });
    }

    this.setState({
      isLoading: true,
    });

    httpClient
      .GET('/product', true)
      .then((response) => {
        this.setState({
          products: response.data,
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

  editProduct = (id) => {
    this.props.history.push(`/edit_product/${id}`);
  };

  removeProduct = (id, idx) => {
    // ask for confirmation
    // aweosme react components>> modal (overlay)
    const confirmation = window.confirm('Are you sure to remove?');
    if (confirmation) {
      // proceed with remove
      httpClient
        .DELETE(`/product/${id}`, true)
        .then((response) => {
          notify.showInfo('Product Removed');
          const { products } = this.state;
          products.splice(idx, 1);

          this.setState({
            products,
          });
        })
        .catch((err) => {
          handleError(err);
        });
    }
  };

  render() {
    return (
      <div className='homescreen'>
        <h2 className='homescreen__title'>Products</h2>
        {this.props.results && (
          <button
            className='btn btn-success'
            onClick={() => this.props.resetSearch()}
          >
            Search Again
          </button>
        )}

        <div className='homescreen__products'>
          {this.state.loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {(this.state.products || []).map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  imageUrl={`${IMG_URL}/${product.images[0]}`}
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  stockLeft={product.quantity}
                  description={product.description}
                />
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}
