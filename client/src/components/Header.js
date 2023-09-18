import React from 'react';

// Components
import Navbar from './Navbar';
import SearchForm from './SearchForm';

// Images
import Logo from '../assets/logo-no-text.jsx';

const Header = () => {
    return (
        <header className='flex-row flex-center-xy width-100'>
            <Logo />
            <Navbar />
            <SearchForm />
        </header>
    );
};

export default Header;