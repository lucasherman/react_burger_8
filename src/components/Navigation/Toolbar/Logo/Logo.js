import React from 'react';

import burgerLogo from '../../../../assets/images/burger.png';
import classes from './Logo.css';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="React Burger"/>
    </div>
);

export {Logo};