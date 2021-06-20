import './Product.css';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem, updateItem, removeItem } from './../../Carts/CartHelper';

const Product = ({
  product,
  imageUrl,
  name,
  price,
  stockLeft,
  description,
  productId,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const handleChange = (productId) => (e) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    // console.log('count=>', stockLeft);
    return stockLeft > 0
      ? cartUpdate && (
          <div>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Total Qty</span>
              </div>
              <input
                type='number'
                className='form-control'
                value={count}
                onChange={handleChange(productId)}
              />
            </div>
          </div>
        )
      : null;
  };

  return (
    <div className='product'>
      {shouldRedirect(redirect)}
      <img src={imageUrl} alt={name} />
      <div className='product__info'>
        <p className='info__name'>{name}</p>
        <p className='info__description'>{description}...</p>
        <p className='info__name'>
          Stock Left : {stockLeft > 0 ? stockLeft : 'Out of Stock'}
        </p>

        <p className='info__price'>Rs {price}</p>
        <Link to={`/product_details/${productId}`} className='info__button'>
          View
        </Link>

        {showAddToCartButton ? (
          stockLeft > 0 ? (
            <button onClick={addToCart} className='info__button'>
              Add to Cart
            </button>
          ) : (
            <button className='info__button__remove'>Out Of Stock</button>
          )
        ) : (
          ''
        )}
        {showRemoveProductButton ? (
          <button
            onClick={() => {
              removeItem(productId);
              setRun(!run);
            }}
            className='info__button__remove'
          >
            Remove Product
          </button>
        ) : (
          ''
        )}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Product;
