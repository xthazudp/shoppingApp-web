import React, { Component } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { relativeTime } from '../../../../utils/dateUtil';

import './ProductDetailsComp.css';
import StarRatings from 'react-star-ratings';

const IMG_URL = process.env.REACT_APP_IMG_URL;

export default class ProductDetails extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('Product Details Comp ==>', this.props);
  }

  getImages = () => {
    return (this.props.product.images || []).map((img, index) => ({
      original: `${IMG_URL}/${img}`,
      // thumbnail: 'https://picsum.photos/id/1019/250/150/',
      thumbnail: `${IMG_URL}/${img}`,
    }));
  };

  render() {
    const { product } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <ImageGallery items={this.getImages()} />
          </div>
          <div className="col-md-6">
            <h3>{product.name}</h3>
            <hr />
            <h5>Description:</h5>
            <p>{product.description}</p>
            <p>RS {product.price}</p>
            <p>Categrory : {product.category}</p>
            <p>Color : {product.color}</p>
            <div className="col-md-8 review_box">
              {product.reviews && product.reviews.length > 0 && (
                <>
                  <p>Reviews</p>
                  <hr />
                  {product.reviews
                    .filter((result) => result)
                    .map((result, index) => (
                      <div key={index}>
                        {/* <p>{result.point}</p> */}
                        <div>
                          <StarRatings
                            starDimension="20px"
                            rating={result.point}
                            starEmptyColor="white"
                            starHoverColor="green"
                            starRatedColor="green"
                            disabled={true}
                            numberOfStars={5}
                          />
                        </div>
                        <br />
                        <p>Message : {result.message}</p>
                        <p>
                          By : <strong>{result.user.username}</strong>
                        </p>
                        <small>{relativeTime(result.createdAt)}</small>
                        <hr />
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
