import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../utils/dateUtil';
import { Loader } from './../../common/Loader/LoaderComp';
import { connect } from 'react-redux';
import {
  changePageNumber_ac,
  fetchProducts_ac,
  removeProduct_ac,
} from '../../../Redux/Actions/ProductAction';

import './ViewProductComponent.css';

const IMG_URL = process.env.REACT_APP_IMG_URL;

class ViewProductsComponent extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    // console.log('Props at viewProduct ==>', this.props);

    if (this.props.results) {
      return this.setState({
        products: this.props.results,
      });
    }

    this.props.fetch({
      pageNumber: this.props.pageNumber,
      pageSize: this.props.pageSize,
    });
  }

  componentDidUpdate() {
    // console.log('component is updated', this.props);
  }
  editProduct = (id) => {
    this.props.history.push(`/edit_product/${id}`);
  };

  removeProduct = (id) => {
    // ask for confirmation
    // aweosme react components>> modal (overlay)
    const confirmation = window.confirm('Are you sure to remove?');
    if (confirmation) {
      // proceed with remove
      this.props.remove(id);
    }
  };

  changePage = (evt) => {
    let { pageNumber } = this.props;
    if (evt === 'next') {
      pageNumber++;
    }
    if (evt === 'previous') {
      pageNumber--;
    }
    this.props.change_page(pageNumber);
    this.props.fetch({
      pageNumber: pageNumber,
      pageSize: this.props.pageSize,
    });
  };

  render() {
    // let content = this.state.isLoading ? (
    let content = this.props.isLoading ? (
      <Loader />
    ) : (
      <table className='table'>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Color</th>
            <th>Created Date</th>
            <th>Tags</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.length ? (
            this.props.products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/product_details/${product._id}`}>
                    {product.name}
                  </Link>{' '}
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.color}</td>
                <td>{formatDate(product.createdAt)}</td>
                <td>{product.tags ? product.tags.join(',') : 'N/A'}</td>
                <td>
                  <img
                    src={`${IMG_URL}/${product.images[0]}`}
                    alt='product_img.png'
                    width='100px'
                    height='100px'
                  ></img>
                </td>
                <td>
                  <i
                    style={{ color: 'blue', cursor: 'pointer' }}
                    className='fa fa-pencil'
                    title='Edit Product'
                    onClick={() => this.editProduct(product._id)}
                  ></i>{' '}
                  |
                  <i
                    title='Remove Product'
                    style={{ color: 'red', cursor: 'pointer' }}
                    className='fa fa-trash'
                    onClick={() => this.removeProduct(product._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ textAlign: 'center' }} colSpan='5'>
                No any products added yet{' '}
              </td>
            </tr>
          )}
          {this.props.pageNumber !== 1 && (
            <button
              onClick={() => this.changePage('previous')}
              className='btn btn-success'
            >
              Previous
            </button>
          )}
          &nbsp;
          <button
            onClick={() => this.changePage('next')}
            className='btn btn-success'
          >
            Next
          </button>
        </tbody>
      </table>
    );
    return (
      <>
        <div className='view_margin'>
          <div className='form-control bg-color'>
            <h2>View Products</h2>
            {this.props.results && (
              <button
                className='btn btn-success'
                onClick={() => this.props.resetSearch()}
              >
                Search Again
              </button>
            )}

            {content}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (rootStore) => ({
  isLoading: rootStore.product.isLoading,
  products: rootStore.product.products,
  pageNumber: rootStore.product.pageNumber,
  pageSize: rootStore.product.pageSize,
});

// const mapDispatchToProps = {
//   fetch: fetchProducts_ac,
// };

const mapDispatchToProps = (dispatch) => ({
  fetch: (params) => dispatch(fetchProducts_ac(params)),
  remove: (id) => dispatch(removeProduct_ac(id)),
  change_page: (page) => dispatch(changePageNumber_ac(page)),
});

export const ViewProducts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProductsComponent);
