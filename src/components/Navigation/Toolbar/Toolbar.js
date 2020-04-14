import React from 'react';
import classes from './Toolbar.css';
import {Logo} from '../Logo/Logo';
import {NavItems} from '../NavItems/NavItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div
            className={classes.Hamburger}
            onClick={() => props.sideDrawerOpen(true)}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export{Toolbar};