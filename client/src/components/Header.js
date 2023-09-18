import React from 'react';

// Components
import Navbar from './Navbar';
import SearchForm from './SearchForm';

// Images
import Logo from '../assets/logo-no-text.jsx';

const Header = () => {
    return (
        <header className='flex-row flex-center-xy full-width'>
            <div className="logo">
                <Logo />
            </div>
            <Navbar className="navbar flex-center-x"/>
            <SearchForm />
        </header>
    );
};

export default Header;