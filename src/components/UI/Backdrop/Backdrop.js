import React from 'react';
import classes from './Backdrop.css';

const Backdrop = ({show, clicked}) => {
    const backdrop = show ? <div
        className={classes.Backdrop}
        onClick={() => clicked(false)}
    >
    </div> : null;
    return backdrop;
}

export {Backdrop};