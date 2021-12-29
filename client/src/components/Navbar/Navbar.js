import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Navbar, NavItem, Nav, NavDropdown } from 'react-bootstrap';
import { BiShoppingBag } from 'react-icons/bi';
import { HiShoppingCart } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';

const Styles = styled.div`
  .nav-brand a {
    color: var(--main-nav-color);
    &:hover {
      color: var(--secondary-nav-color);
    }
  }
  .navbar-nav .nav-link {
    color: var(--main-nav-color);
    &:hover {
      color: var(--secondary-nav-color);
    }
  }
  .navbar-nav .nav-dropdown {
    color: var(--main-dropdown-color);
  }
  .icon-format {
    margin-right: 10px;
    margin-bottom: 6px;
  }
`;

const NavigationBar = ({ status, userData }) => {
  const vegProducts = `category=Vegetarian`;
  const nonVegProducts = `category=Non-Vegetarian`;

  const logout = async () => {
    await axios.get('/api/v1/mern-shopping-cart/users/logout-user');
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Styles>
        <Navbar collapseOnSelect expand="md" bg="dark" className="my-container">
          <Navbar.Brand className="nav-brand">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <BiShoppingBag className="icon-format" />
              Mern Cart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ backgroundColor: 'var(--secondary-nav-color)' }}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <NavItem>
                {status === 'Success' ? (
                  <Link to="/my-profile" className="nav-link">
                    <BsFillPersonFill className="icon-format" />
                    {userData.name.split(' ')[0]}
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    <BsFillPersonFill className="icon-format" />
                    Login
                  </Link>
                )}
              </NavItem>
              <NavDropdown title="Products" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/products" className="nav-dropdown">
                    All Products
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={{ pathname: '/products', vegProducts }} className="nav-dropdown">
                    Vegetarian
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to={{ pathname: '/products', nonVegProducts }} className="nav-dropdown">
                    Non-Vegetarian
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavItem>
                <Link to="/cart" className="nav-link">
                  <HiShoppingCart className="icon-format" />
                  Cart
                </Link>
              </NavItem>
              {status === 'Success' && (
                <NavItem>
                  <Link to="/" onClick={logout} className="nav-link">
                    Logout
                  </Link>
                </NavItem>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    status: state.authReducer.status,
    userData: state.authReducer.userData,
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
