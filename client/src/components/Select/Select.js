import React from 'react';
import { Form } from 'react-bootstrap';

const ProductSelect = ({
  defaultChoice,
  choiceOne,
  choiceTwo,
  valueOne,
  valueTwo,
  changeFilter,
}) => {
  return (
    <Form.Control as="select" className="bg-light mb-4" onChange={changeFilter}>
      <option>{defaultChoice}</option>
      <option value={valueOne}>{choiceOne}</option>
      <option value={valueTwo}>{choiceTwo}</option>
    </Form.Control>
  );
};

export default ProductSelect;
