import React from 'react';
import ReactDOM from 'react-dom'
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import logo from '../img/logo.svg';
import '../img/font-awesome-4.7.0/css/font-awesome.min.css'
import './all.sass';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    }
  }

  handleClick = () => {
    let node = ReactDOM.findDOMNode(this.refs.hamburger);
    if (node !== null) {
      node.classList.toggle('is-active');
      ReactDOM.findDOMNode(this.refs.menu).classList.toggle('is-active');
    }
  }

  render() {
    return (
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
              </figure>
            </Link>
            <button
              onClick={this.handleClick}
              className="button navbar-burger"
              ref="hamburger"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div ref="menu" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Blog
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
            </div>
            <div className="navbar-end">
              <a className="navbar-item" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <FontAwesome name="facebook-square" size="2x" />
                </span>
              </a>
              <a className="navbar-item" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <FontAwesome name="instagram" size="2x" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
};

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Broo Guud Coffee" />
    <Navbar />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
