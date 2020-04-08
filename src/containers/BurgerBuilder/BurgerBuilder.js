import React, { Component } from 'react';
import {Burger} from '../../components/Burger/Burger';
import {BuildControls} from '../../components/BuildControls/BuildControls';
import {OrderSummary} from '../../components/OrderSummary/OrderSummary';
import {Modal} from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    bread: 2,
    salad: 0.5,
    cheese: 0.8,
    meat: 4,
    bacon: 1.5,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 1,
            bacon: 1,
            salad: 0,
            cheese: 1,
        },
        totalPrice: INGREDIENT_PRICES['bread'],
        purchasable: null,
        purchasing: false,
    }

    componentDidMount() {
        this.recalculatePrice();
        this.updatePurchaseState();
    }

    updatePurchaseState = () => {
        const ingredients = this.state.ingredients;
        const ingredientsSum = Object.values(ingredients).reduce(((a, b) => a + b), 0);
        this.setState({purchasable: ingredientsSum > 0});
    }

    purchaseHandler = (isPurchasing) => {
        this.setState({purchasing: isPurchasing});
    }

    purchaseContinueHandler = () => {
        alert("You continue!");
    }

    changeAmountIngredientHandler = (type, sign) => {
        const updatedIngredients = Object.assign({}, this.state.ingredients);
        updatedIngredients[type] = updatedIngredients[type] + (1 * sign);
        if (updatedIngredients[type] >= 0) {
            this.setState(
                {ingredients: updatedIngredients},
                () => {
                    this.recalculatePrice();
                    this.updatePurchaseState();
                },
            );
        }

    }

    recalculatePrice = () => {
        const ingredientsAsList = Object.entries(this.state.ingredients);
        const newTotalPrice = ingredientsAsList.reduce((prev, cur) => {
            const [type, amount] = cur;
            const itemPrice = amount * INGREDIENT_PRICES[type];
            return prev + itemPrice;
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
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseHandler}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={() => this.purchaseHandler(false)}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientTypes={ingredientTypes}
                    ingredientAmountChanged={this.changeAmountIngredientHandler}
                    disabledInfo={disabledInfo}
                    burgerPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}

export {BurgerBuilder};