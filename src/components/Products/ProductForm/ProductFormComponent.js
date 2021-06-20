import React, { Component } from 'react';
import { SubmitButton } from '../../common/SubmitButton/SubmitButtonComponent';
import { formatDate } from '../../../utils/dateUtil';

import './ProductFormComponent.css';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const defaultForm = {
  name: '',
  description: '',
  brand: '',
  color: '',
  category: '',
  price: '',
  quantity: '',
  status: '',
  tags: '',
  isReturnEligible: false,
  warrentyStatus: false,
  warrentyPeroid: '',
  purchasedDate: '',
  manuDate: '',
  discountedItem: false,
  discountType: '',
  discountValue: '',
  expiryDate: '',
  salesDate: '',
};

const validationFields = {
  category: '',
  name: '',
};

export class ProductForm extends Component {
  constructor() {
    super();

    this.state = {
      data: { ...defaultForm },
      error: { ...validationFields },
      filesToUpload: [],
      selectedFiles: [],
      filesToRemove: [],
    };
  }

  componentDidMount() {
    // console.log('this.props >>', this.props);
    const { productData } = this.props;
    if (productData) {
      // edit
      this.setState({
        data: {
          ...defaultForm,
          ...productData,
          discountedItem:
            productData.discount && productData.discount.discountedItem
              ? productData.discount.discountedItem
              : false,

          discountType:
            productData.discount && productData.discount.discountType
              ? productData.discount.discountType
              : '',

          discountValue:
            productData.discount && productData.discount.discountValue
              ? productData.discount.discountValue
              : '',

          purchasedDate: productData.purchasedDate
            ? formatDate(productData.purchasedDate, 'YYYY-MM-DD')
            : '',

          salesDate: productData.salesDate
            ? formatDate(productData.salesDate, 'YYYY-MM-DD')
            : '',
          manuDate: productData.manuDate
            ? formatDate(productData.manuDate, 'YYYY-MM-DD')
            : '',
          expiryDate: productData.expiryDate
            ? formatDate(productData.expiryDate, 'YYYY-MM-DD')
            : '',
        },
        // to show preview
        selectedFiles: (productData.images || []).map((img) => ({
          img: `${IMG_URL}/${img}`,
          type: 'old',
        })),
      });
    }
  }

  handleChange = (e) => {
    console.log('productform e.target==> ', e.target);
    console.log('porductform this.state==>', this.state);
    let { type, checked, name, value, files } = e.target;

    if (type === 'file') {
      console.log('files =>', files);
      const { filesToUpload, selectedFiles } = this.state;
      var temp_id = Date.now();

      filesToUpload.push({
        img: files[0],
        temp_id: temp_id,
      });

      selectedFiles.push({
        img: URL.createObjectURL(files[0]),
        type: 'new',
        temp_id: temp_id,
      });

      return this.setState({
        filesToUpload,
        selectedFiles,
      });
    }

    if (type === 'checkbox') {
      value = checked;
    }

    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        // form validation here
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { filesToUpload } = this.state;
    const filesOnly = filesToUpload.map((file) => file.img);
    this.props.submitCallback(this.state.data, filesOnly);
    if (this.state.filesToRemove.length > 0) {
      this.props.removeExistingImage(this.state.filesToRemove);
    }
  };

  removeSelectedImage = (file, index) => {
    const { selectedFiles, filesToUpload, filesToRemove } = this.state;

    if (this.props.isEditMode) {
      // create API to remove existing image
      // for existing only
      console.log('file =>', file);
      if (file.type === 'old') {
        filesToRemove.push(file.img);
      }
    }

    filesToUpload.forEach((item, index) => {
      if (item.temp_id === file.temp_id) {
        filesToUpload.splice(index, 1);
      }
    });

    selectedFiles.splice(index, 1);

    this.setState({
      selectedFiles,
      filesToUpload,
      filesToRemove,
    });
  };

  render() {
    return (
      <>
        <div className='col-md-8 form_margin'>
          <div className='container form-control bg-color'>
            <h2>{this.props.isEditMode ? 'Update' : 'Add'} Product</h2>
            <p>Please add necessary details</p>
            <form
              onSubmit={this.onSubmit}
              className='form-group content'
              noValidate
            >
              <label>Name</label>
              <input
                type='text'
                className='form-control'
                value={this.state.data.name}
                name='name'
                placeholder='Name'
                onChange={this.handleChange}
              />
              <label>Description</label>
              <textarea
                rows={6}
                className='form-control'
                value={this.state.data.description}
                name='description'
                placeholder='Description here'
                onChange={this.handleChange}
              />
              <label>Category</label>
              <input
                type='text'
                className='form-control'
                value={this.state.data.category}
                name='category'
                placeholder='Category'
                onChange={this.handleChange}
              />
              <label>Brand</label>
              <input
                type='text'
                className='form-control'
                value={this.state.data.brand}
                name='brand'
                placeholder='Brand'
                onChange={this.handleChange}
              />
              <label>Price</label>
              <input
                type='number'
                className='form-control'
                value={this.state.data.price}
                name='price'
                placeholder='Price'
                onChange={this.handleChange}
              />
              <label>Color</label>
              <input
                type='text'
                className='form-control'
                value={this.state.data.color}
                name='color'
                placeholder='Color'
                onChange={this.handleChange}
              />
              <label>Quantity</label>
              <input
                type='text'
                className='form-control'
                value={this.state.data.quantity}
                name='quantity'
                placeholder='Quantity'
                onChange={this.handleChange}
              />
              <input
                type='checkbox'
                name='isReturnEligible'
                checked={this.state.data.isReturnEligible}
                onChange={this.handleChange}
              />
              <label> &nbsp;Is Return Eligible</label>
              <br />
              <label>Tags</label>
              <input
                type='text'
                className='form-control'
                value={this.state.data.tags}
                name='tags'
                placeholder='Tags'
                onChange={this.handleChange}
              />
              {this.props.isEditMode && (
                <>
                  <label>Status</label>
                  <select
                    className='form-control'
                    value={this.state.data.status}
                    name='status'
                    onChange={this.handleChange}
                  >
                    <option value=''>Select Status</option>
                    <option value='available'>Available</option>
                    <option value='booked'>Booked</option>
                    <option value='out_of_stock'>Out Of Stock</option>
                  </select>
                </>
              )}

              <input
                type='checkbox'
                checked={this.state.data.warrentyStatus}
                name='warrentyStatus'
                onChange={this.handleChange}
              />
              <label> &nbsp;Warrenty Status</label>
              <br />
              {this.state.data.warrentyStatus && (
                <>
                  <label>Warrenty Peroid</label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.data.warrentyPeroid}
                    name='warrentyPeroid'
                    placeholder='Warrenty Peroid'
                    onChange={this.handleChange}
                  />
                </>
              )}

              <input
                type='checkbox'
                checked={this.state.data.discountedItem}
                name='discountedItem'
                onChange={this.handleChange}
              />
              <label> &nbsp;Discounted Item</label>
              {this.state.data.discountedItem && (
                <>
                  <br />
                  <label>Discount Type</label>
                  <select
                    className='form-control'
                    value={this.state.data.discountType}
                    name='discountType'
                    onChange={this.handleChange}
                  >
                    <option disabled value=''>
                      (Select Type)
                    </option>
                    <option value='percentage'>Percentage</option>
                    <option value='qunantity'>Quantity</option>
                    <option value='value'>Value</option>
                  </select>
                  <label>Discount Value</label>
                  <input
                    type='text'
                    className='form-control'
                    value={this.state.data.discountValue}
                    name='discountValue'
                    placeholder='Discount Value'
                    onChange={this.handleChange}
                  />
                </>
              )}
              <br />
              <label>Purchased Date</label>
              <input
                type='date'
                className='form-control'
                value={this.state.data.purchasedDate}
                name='purchasedDate'
                onChange={this.handleChange}
              />
              <label>Sales Date</label>
              <input
                type='date'
                className='form-control'
                value={this.state.data.salesDate}
                name='salesDate'
                onChange={this.handleChange}
              />
              <label>Manu Date</label>
              <input
                type='date'
                className='form-control'
                value={this.state.data.manuDate}
                name='manuDate'
                onChange={this.handleChange}
              />
              <label>Expiry Date</label>
              <input
                type='date'
                className='form-control'
                value={this.state.data.expiryDate}
                name='expiryDate'
                onChange={this.handleChange}
              />
              <label>Select Image</label>
              <input
                type='file'
                onChange={this.handleChange}
                className='form-control'
              ></input>
              {this.state.selectedFiles.length > 0 &&
                this.state.selectedFiles.map((file, index) => (
                  <React.Fragment key={index}>
                    <br />
                    <img src={file.img} alt='files.png' width='100px'></img>
                    <i
                      title='Remove Selected Image'
                      style={{
                        marginLeft: '10px',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                      className='fa fa-trash'
                      onClick={() => this.removeSelectedImage(file, index)}
                    ></i>
                    <br />
                  </React.Fragment>
                ))}
              <hr />
              <SubmitButton
                isSubmitting={this.props.isSubmitting}
              ></SubmitButton>
            </form>
          </div>
        </div>
      </>
    );
  }
}
