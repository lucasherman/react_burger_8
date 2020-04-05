import React from 'react';

import classes from './BuildControl.css';

const BuildControl = ({label, removed, added, disabledLessButton}) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{label}</div>
        <button
            className={classes.Less}
            onClick={removed}
            disabled={disabledLessButton}>Less
        </button>
        <button
            className={classes.More}
            onClick={added}>More
        </button>
    </div>
);

export {BuildControl};