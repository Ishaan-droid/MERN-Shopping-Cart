import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { deleteItemFromCart } from '../ProductsContainer/store/productsAction';

const CartContainer = ({ deleteItem, cart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const newCartItems = () => {
    const arr = Array.from(
      cart.reduce((map, cur) => map.set(cur.productId, cur), new Map()).values()
    );
    setCartItems(arr);
    return arr;
  };

  const calcTotalPrice = ar => {
    const tp = ar.reduce((acc, cur) => (acc += cur.currentPrice), 0);
    return setTotalPrice(tp);
  };

  useEffect(() => {
    let ar = newCartItems();
    calcTotalPrice(ar);
  }, []); // eslint-disable-line

  const deleteItemCart = id => {
    let sum = 0;
    const newCartItems = cartItems.slice();
    newCartItems.splice(id, 1);
    deleteItem(id, newCartItems);
    setCartItems(newCartItems);

    document.querySelectorAll('.grab-price h5').forEach((cur, idx) => {
      if (idx === id) {
        cur.textContent = 0;
      }
      sum += Number(cur.textContent.slice(1));
    });

    setTotalPrice(sum);
  };

  const handleQuantity = (e, price, prodId) => {
    let sum = 0;
    const qty = e.target.value;
    const itemTotalPrice = qty * price;
    document.getElementById(`${prodId}`).textContent = `₹${itemTotalPrice}`;

    document
      .querySelectorAll('.grab-price h5')
      .forEach(cur => (sum += Number(cur.textContent.slice(1))));

    setTotalPrice(sum);
  };

  return (
    <div className="my-container">
      <h1 className="mt-2">Shopping Cart</h1>
      <Row noGutters>
        <Col lg={8}>
          {cartItems.map((cur, idx, arr) => (
            <Row className="mt-4 mb-4" key={cur.productId}>
              <div className="d-flex justify-content-between">
                <img className="w-25" src={cur.image} alt="product_image" />
                <div className="flex-column">
                  <h4>{cur.title}</h4>
                  <select
                    onChange={e => handleQuantity(e, cur.currentPrice, cur.productId)}
                    className="m-2"
                  >
                    {Array(cur.stock)
                      .fill()
                      .map((_, idx) => {
                        const num = cur.stock;
                        return num - idx;
                      })
                      .reverse()
                      .map(cur => (
                        <option key={cur}>{cur}</option>
                      ))}
                  </select>
                  <button onClick={() => deleteItemCart(idx)}>Delete</button>
                </div>
                <div className="grab-price">
                  <h5 id={cur.productId}>₹{cur.currentPrice}</h5>
                </div>
              </div>
            </Row>
          ))}
        </Col>
        <Col className="d-flex align-items-center flex-column" lg={4}>
          <div className="d-flex align-items-center flex-column">
            <h4>{`Subtotal (${cartItems.length} items): ₹${totalPrice}`}</h4>
            <button>Proceed to checkout</button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.productsReducer.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (productId, items) => dispatch(deleteItemFromCart(productId, items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
