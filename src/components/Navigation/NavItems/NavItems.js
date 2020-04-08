import React from 'react';

import classes from './NavItems.css';

const NavItems = () => (
    <ul className={classes.NavItems}>
        <li>
            <a href="/" className={classes.NavActiveItem}>Burger Builder</a>
        </li>
        <li>
            <a href="/">Checkout</a>
        </li>
    </ul>
);

export {NavItems};