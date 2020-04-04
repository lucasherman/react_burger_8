import React, { Component } from 'react';
import {Burger} from '../../components/Burger/Burger';
import {BuildControls} from '../../components/BuildControls/BuildControls';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 1,
            bacon: 0,
            salad: 0,
        }
    }

    render() {

        const ingredientTypes = Object.keys(this.state.ingredients);

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientTypes={ingredientTypes} />
            </React.Fragment>
        )
    }
}

export {BurgerBuilder};