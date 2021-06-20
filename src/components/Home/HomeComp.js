import React, { Component } from 'react';
import { handleError } from '../../utils/ErrorHandler';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { ViewProducts } from '../Products/ViewProduct/ViewProductComponent';

import Product from '../common/Product/Product';
import { SubmitButton } from '../common/SubmitButton/SubmitButtonComponent';
import { ProductView } from '../common/ProductView/ProductViewComp';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const defaultForm = {
  name: '',
  category: '',
  tags: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
};

export class HomeComp extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isLoading: false,
      isSubmitting: false,
      categories: [],
      allProducts: [],
      names: [],
      searchResults: [],
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
      .GET('/product/search', true)
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

    httpClient
      .POST(`/product/search`, {})
      .then((response) => {
        let categories = [];
        response.data.forEach((item, index) => {
          if (!categories.includes(item.category)) {
            categories.push(item.category);
          }
        });
        this.setState({
          categories: categories,
          allProducts: response.data,
        });
      })
      .catch((err) => {
        handleError(err);
      });
  }

  handleChange = (e) => {
    let { type, checked, name, value } = e.target;
    if (name === 'category') {
      this.prepareNames(value);
    }
    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: value,
      },
    }));
  };

  prepareNames = (selectedCategory) => {
    const names = this.state.allProducts.filter(
      (item) => item.category === selectedCategory
    );
    this.setState({
      names,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    // console.log('data=>', data);
    httpClient
      .POST('/product/search', data)
      .then((response) => {
        // console.log('response', response.data.length);
        if (!response.data.length) {
          return notify.showInfo('No any products matched your search query');
        }
        //  TODO show in proper UI
        this.setState({
          searchResults: response.data,
        });
      })
      .catch((err) => {
        handleError(err);
      });
  };

  resetSearch = () => {
    this.setState({
      searchResults: [],
      data: {
        ...defaultForm,
      },
    });
  };

  render() {
    return (
      <div className='homescreen'>
        <div className='homescreen__products'>
          {this.state.loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {/* {console.log('state', this.state)} */}
              {this.state.searchResults.length > 0 ? (
                <ProductView
                  {...this.props}
                  resetSearch={this.resetSearch}
                  results={this.state.searchResults}
                ></ProductView>
              ) : (
                <>
                  <form
                    onSubmit={this.handleSubmit}
                    className='form-group mb-2'
                    noValidate
                  >
                    {/* <label>Brand</label>
                    <input
                      type='text'
                      name='brand'
                      placeholder='Brand'
                      className='form-control'
                      onChange={this.handleChange}
                    ></input> */}
                    <label>Search</label>
                    <input
                      type='text'
                      name='tags'
                      placeholder='Tags'
                      className='form-control'
                      onChange={this.handleChange}
                    ></input>
                    <br />
                    <div className='row'>
                      <div className='col-md-6'>
                        <h6>Filter By Category</h6>
                        <div className='row'>
                          <div className='col-md-6'>
                            <label>Category</label>
                            <select
                              name='category'
                              className='form-control'
                              value={this.state.data.category}
                              onChange={this.handleChange}
                            >
                              <option value=''>Select Category</option>
                              {this.state.categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='col-md-6'>
                            {this.state.names.length > 0 && (
                              <>
                                <label>Name</label>
                                <select
                                  name='name'
                                  value={this.state.data.name}
                                  className='form-control'
                                  onChange={this.handleChange}
                                >
                                  <option>Select Name</option>
                                  {this.state.names.map((name, index) => (
                                    <option key={name._id} value={name.name}>
                                      {name.name}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <h6>Filter By Price</h6>
                        <div className='row'>
                          <div className='col-md-6'>
                            <label>Min Price</label>
                            <input
                              type='number'
                              name='mnPrice'
                              className='form-control'
                              onChange={this.handleChange}
                            ></input>
                          </div>
                          <div className='col-md-6'>
                            <label>Max Price</label>
                            <input
                              type='number'
                              name='maxPrice'
                              className='form-control'
                              onChange={this.handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <SubmitButton
                      isSubmitting={this.state.isSubmitting}
                    ></SubmitButton>
                  </form>
                  {(this.state.products || []).map((product) => (
                    <Product
                      product={product}
                      key={product._id}
                      imageUrl={`${IMG_URL}/${product.images[0]}`}
                      productId={product._id}
                      name={product.name}
                      stockLeft={product.quantity}
                      price={product.price}
                      description={product.description}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
