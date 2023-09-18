import React from 'react';

const SearchForm = () => {
    return (
        <form className='flex-center-xy'>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" name="search" />
        </form>
    );
}

export default SearchForm;