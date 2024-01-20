import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
                <h1 >Henry Queen's Website</h1>
            </Link>
        </header>
    )
};

export default Header