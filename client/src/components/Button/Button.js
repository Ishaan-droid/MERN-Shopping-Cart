import React from 'react';
import { Button } from 'react-bootstrap';

const ProductButton = ({
  disableButton,
  buttonText,
  buttonColor,
  buttonSize,
  blockLength,
  clickMe,
}) => {
  return (
    <Button
      disabled={disableButton}
      variant={buttonColor}
      size={buttonSize}
      block={blockLength}
      onClick={clickMe}
    >
      {buttonText}
    </Button>
  );
};

export default ProductButton;
