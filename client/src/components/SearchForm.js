import React from 'react';

const SearchForm = () => {
    return (
        <form>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" name="search" />
        </form>
    );
}

export default SearchForm;