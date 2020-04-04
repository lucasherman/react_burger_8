import React, { Component } from 'react';
import {Burger} from '../../components/Burger/Burger';
import {BuildControls} from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    bread: 2,
    salad: 0.5,
    cheese: 0.8,
    meat: 4,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 1,
            bacon: 1,
            salad: 0,
            cheese: 1
        },
        totalPrice: INGREDIENT_PRICES['bread']
    }

    componentDidMount() {
        this.recalculatePrice();
    }

     changeAmountIngredientHandler = (type, sign) => {
        const updatedIngredients = Object.assign({}, this.state.ingredients);
        updatedIngredients[type] = updatedIngredients[type] + (1 * sign);
        if (updatedIngredients[type] >= 0) {
            this.setState(
                {ingredients: updatedIngredients},
                () => this.recalculatePrice()
            );
        }
    }

    recalculatePrice = () => {
        const entries = Object.entries(this.state.ingredients);
        const newTotalPrice = entries.reduce((prev, cur) => {
            const [type, amount] = cur;
            const priceItem = amount * INGREDIENT_PRICES[type];
            return prev + priceItem;
        }, INGREDIENT_PRICES['bread']);
        this.setState({totalPrice: newTotalPrice});
    }

    render() {
        const ingredientTypes = Object.keys(this.state.ingredients);
        const disabledInfo = {};
        for (let key in this.state.ingredients) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientTypes={ingredientTypes}
                    ingredientAmountChanged={this.changeAmountIngredientHandler}
                    disabledInfo={disabledInfo}
                    burgerPrice={this.state.totalPrice}
                />
            </React.Fragment>
        )
    }
}

export {BurgerBuilder};