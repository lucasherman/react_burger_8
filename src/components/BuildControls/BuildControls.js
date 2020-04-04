import React from 'react';
import {BuildControl} from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const BuildControls = (props) => {

    const ingredientTypesData = props.ingredientTypes.map((ingredientType) => {
        return {
            label: ingredientType.charAt(0).toUpperCase() + ingredientType.slice(1),
            type: ingredientType
        }
    });

    const buildControls = ingredientTypesData.map(
            (ingredientType) => <BuildControl key={ingredientType.type} label={ingredientType.label} />
        );

    return <div className={classes.BuildControls}>
        {buildControls}
    </div>
}

export {BuildControls}