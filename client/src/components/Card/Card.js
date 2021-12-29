import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BiFoodTag } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({
  cardImage,
  title,
  stock,
  category,
  currentPrice,
  discount,
  originalPrice,
  summary,
  btnText,
  viewProduct,
}) => {
  return (
    <Card className="mb-5" style={{ width: '22rem' }}>
      <LazyLoadImage alt={title} src={cardImage} effect="blur" width="100%" />
      <Card.Body>
        <Card.Title>
          {title}
          {stock <= 5 ? (
            <div className="card-tags few-stock-left"> Only {stock} left </div>
          ) : (
            <div className="card-tags in-stock"> In Stock </div>
          )}
          {category === 'Vegetarian' ? (
            <BiFoodTag className="ml-3 veg" />
          ) : (
            <BiFoodTag className="ml-3 non-veg" />
          )}
        </Card.Title>
        <Card.Title>
          {discount ? (
            <div className="card-tags sale">
              <span className="old-price mr-1">₹{originalPrice}</span> ₹{currentPrice}{' '}
            </div>
          ) : (
            <div className="card-tags sale"> ₹{currentPrice} </div>
          )}
        </Card.Title>
        <Card.Text>{summary}</Card.Text>
        <Button variant="warning" size="lg" block onClick={viewProduct}>
          {btnText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
