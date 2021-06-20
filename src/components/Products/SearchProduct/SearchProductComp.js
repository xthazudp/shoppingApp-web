import React, { Component } from 'react';
// import { ViewProducts } from '../ViewProduct/ViewProductComponent';
import { ProductView } from './../../common/ProductView/ProductViewComp';
import { handleError } from './../../../utils/ErrorHandler';
import { httpClient } from './../../../utils/httpClient';
import { notify } from './../../../utils/toaster';
import { SubmitButton } from './../../common/SubmitButton/SubmitButtonComponent';

import './SearchProductComp.css';

const defaultForm = {
  name: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  tags: '',
  fromDate: '',
  toDate: '',
  multipleDateRange: false,
};

export class SearchProduct extends Component {
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
      categories: [],
      allProducts: [],
      names: [],
      searchResults: [],
    };
  }

  componentDidMount() {
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
    if (type === 'checkbox') {
      value = checked;
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
    if (!data.multipleDateRange) {
      data.toDate = data.fromDate;
    }
    httpClient
      .POST('/product/search', data)
      .then((response) => {
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
    let content =
      this.state.searchResults.length > 0 ? (
        <ProductView
          {...this.props}
          resetSearch={this.resetSearch}
          results={this.state.searchResults}
        ></ProductView>
      ) : (
        <>
          <div className='col-md-6 form_margin'>
            <div className='form-control  bg-color'>
              <h2>Search Product</h2>
              <form
                onSubmit={this.handleSubmit}
                className='form-group content'
                noValidate
              >
                <label>Category</label>
                <select
                  name='category'
                  className='form-control'
                  value={this.state.data.category}
                  onChange={this.handleChange}
                >
                  <option value=''>(Select Category)</option>
                  {this.state.categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {this.state.names.length > 0 && (
                  <>
                    <label>Name</label>
                    <select
                      name='name'
                      value={this.state.data.name}
                      className='form-control'
                      onChange={this.handleChange}
                    >
                      <option>(Select Name)</option>
                      {this.state.names.map((name, index) => (
                        <option key={name._id} value={name.name}>
                          {name.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <label>Brand</label>
                <input
                  type='text'
                  name='brand'
                  placeholder='Brand'
                  className='form-control'
                  onChange={this.handleChange}
                ></input>
                <label>Min Price</label>
                <input
                  type='number'
                  name='minPrice'
                  className='form-control'
                  onChange={this.handleChange}
                ></input>
                <label>Max Price</label>
                <input
                  type='number'
                  name='maxPrice'
                  className='form-control'
                  onChange={this.handleChange}
                ></input>
                <label>Tags</label>
                <input
                  type='text'
                  name='tags'
                  placeholder='Tags'
                  className='form-control'
                  onChange={this.handleChange}
                ></input>
                <label>Select Date</label>
                <input
                  type='date'
                  name='fromDate'
                  className='form-control'
                  onChange={this.handleChange}
                ></input>
                <input
                  type='checkbox'
                  name='multipleDateRange'
                  onChange={this.handleChange}
                ></input>
                <label> &nbsp;Multiple Date Range</label>
                {this.state.data.multipleDateRange && (
                  <>
                    <br />
                    <label>To Date</label>
                    <input
                      type='date'
                      name='To Date'
                      className='form-control'
                      onChange={this.handleChange}
                    ></input>
                  </>
                )}
                <br></br>
                <SubmitButton
                  isSubmitting={this.state.isSubmitting}
                ></SubmitButton>
              </form>
            </div>
          </div>
        </>
      );
    return content;
  }
}
