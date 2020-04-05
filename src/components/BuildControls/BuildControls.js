import React from 'react';
import {BuildControl} from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const ARITHMETIC_SIGNS = {
    add: 1,
    subtract: -1,
};

const BuildControls = ({ingredientTypes, ingredientAmountChanged, disabledInfo, burgerPrice}) => {

    const ingredientTypesData = ingredientTypes.map((ingredientType) => {
        return {
            label: ingredientType.charAt(0).toUpperCase() + ingredientType.slice(1),
            type: ingredientType
        }
    });

    const buildControls = ingredientTypesData.map(
            (ingredientEntry) => {
                return (
                    <BuildControl
                        key={ingredientEntry.type}
                        label={ingredientEntry.label}
                        added={() => ingredientAmountChanged(ingredientEntry.type, ARITHMETIC_SIGNS['add'])}
                        removed={() => ingredientAmountChanged(ingredientEntry.type, ARITHMETIC_SIGNS['subtract'])}
                        disabledLessButton = {disabledInfo[ingredientEntry.type]}
                    />
                );
            });

    return (
        <div className={classes.BuildControls}>
            <p>Burger Price: <strong>{burgerPrice}</strong></p>
            {buildControls}
        </div>
    );
}

export {BuildControls}