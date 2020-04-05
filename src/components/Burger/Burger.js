import React from 'react';
import classes from './Burger.css';
import {BurgerIngredient} from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {

    const ingredientsAsList = Object.entries(props.ingredients)
    const ingredientLayers = ingredientsAsList.reduce((prev, cur) => {
        let [type, number] = cur;
        let newCur = [].concat(...Array(number).fill([type]));
        return prev.concat(newCur);
    },[]);

    let ingredientsDisplayed = ingredientLayers.map((ingredient,  i) =>
        <BurgerIngredient key={`layer-${i}`} type={ingredient} />);

    if (ingredientsDisplayed.length === 0) {
        ingredientsDisplayed = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" key="bread-1"/>
              {ingredientsDisplayed}
            <BurgerIngredient type="bread-bottom" key="bread-2" />
        </div>
    );
};

export {Burger};