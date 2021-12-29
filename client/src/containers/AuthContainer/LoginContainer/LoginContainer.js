import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../Store/AuthContainerActions';
import constants from '../Store/AuthContainerConstants';
import Button from '../../../components/Button/Button';
import Alert from '../../../components/Alert/Alert';

const LoginContainer = ({
  bringLoader,
  loginUser,
  openModal,
  status,
  loader,
  loginError,
  modalOpen,
  modalClose,
}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  useEffect(() => {
    openModal();
  }, [modalOpen || modalClose]); // eslint-disable-line

  useEffect(() => {
    if (status === 'Success') history.push('/');
  }, [status]); // eslint-disable-line

  const handleEmail = e => {
    setLoginDetails(prevDetails => {
      return {
        ...prevDetails,
        email: e.target.value,
      };
    });
  };

  const handlePassword = e => {
    setLoginDetails(prevDetails => {
      return {
        ...prevDetails,
        password: e.target.value,
      };
    });
  };

  const verifyUser = async () => {
    bringLoader();
    await loginUser(loginDetails);
  };

  return (
    <>
      <div className="my-container">
        <Row noGutters className="mt-5">
          <Col>
            <h1 className="text-center">Login</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={6} lg={6}>
            <Form.Group controlId="ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleEmail} type="email" placeholder="name@example.com" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col xs={6} lg={6}>
            <Form.Group controlId="ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handlePassword} type="password" placeholder="Password" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center text-center mt-4">
          <Col xs={6} lg={6}>
            <Button
              buttonText={loader === true ? 'Loading...' : 'Login'}
              buttonColor="warning"
              clickMe={verifyUser}
            />
          </Col>
        </Row>
        {status === 'Fail' && <Alert title={status} errorMessage={loginError} />}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loader: state.authReducer.loader,
    status: state.authReducer.status,
    loginError: state.authReducer.loginError,
    modalOpen: state.authReducer.modalOpen,
    modalClose: state.authReducer.modalClose,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: loginDetails => dispatch(loginUser(loginDetails)),
    openModal: () => dispatch({ type: constants.SHOW_MODAL }),
    bringLoader: () => dispatch({ type: constants.LOADER }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
