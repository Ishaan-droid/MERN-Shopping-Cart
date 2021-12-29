import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Image = styled.img`
  width: 100%;
  height: 40rem;
  @media screen and (max-width: 700px) {
    height: 20rem;
  }
`;

const ProductCarousel = ({ carouselProducts }) => {
  return (
    <Carousel>
      {carouselProducts.map(cur => (
        <Carousel.Item key={cur._id}>
          <Link to={`/products/${cur._id}`}>
            <Image src={cur.image} alt={cur.name} />
          </Link>
          <Carousel.Caption>
            <h3>{cur.title}</h3>
            <p>{cur.summary}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
