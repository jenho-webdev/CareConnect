import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <ul className="navbar-list flex-row">
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-link">About</a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Contact</a>
          </li>
          <li className="navbar-item">
            <a href="/logOut" className="navbar-link">Log Out</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
