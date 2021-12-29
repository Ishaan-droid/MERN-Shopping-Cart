import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const ProductSpinner = ({ animation }) => {
  return (
    <div className="text-center">
      <Spinner animation={animation} variant="dark" />
    </div>
  );
};

export default ProductSpinner;
