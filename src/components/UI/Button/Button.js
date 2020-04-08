import React from 'react';
import classes from './Button.css';

const Button = ({btnType, children, clicked}) => (
    <button
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
    >
        {children}
    </button>
);

export {Button};