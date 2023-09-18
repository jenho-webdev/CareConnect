import React from 'react';

// Images
import SearchIcon from '../assets/icons/SearchIcon.jsx';

const SearchForm = () => {
    return (
        <form className='search-form flex-center-y'>
            <div className="search-icon">
                <SearchIcon />
            </div>
            <input type="text" id="search" name="search" className='focus-none' />
        </form>
    );
}

export default SearchForm;