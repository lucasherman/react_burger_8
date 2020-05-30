import React, { Component } from 'react';
import {Burger} from '../../components/Burger/Burger';
import {BuildControls} from '../../components/BuildControls/BuildControls';
import {OrderSummary} from '../../components/OrderSummary/OrderSummary';
import {Modal} from '../../components/UI/Modal/Modal';
import {axios_instance} from '../../axios-order';
import {Spinner} from '../../components/UI/Spinner/Spinner';
import {withErrorHandler} from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    bread: 2,
    salad: 0.5,
    cheese: 0.8,
    meat: 4,
    bacon: 1.5,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: INGREDIENT_PRICES['bread'],
        purchasable: null,
        purchasing: false,
        loading: false,
        error: false ,
    }

    componentDidMount() {
        axios_instance.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                this.recalculatePrice();
                this.updatePurchaseState();
            })
            .catch(error => this.setState({error: true}));
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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Jan Kowalski',
                address: 'ul. Kościuszki 34 Wrocław',
                email: 'jk@gmail.com'
            },
            deliverMethod: 'express'
        };

        this.setState({loading: true});
        axios_instance.post('/orders.json', order)
            .then(
                response => this.setState({loading: false, purchasing: false})
            ).catch(
                error => this.setState({loading: false, purchasing: false})
            );
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
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            const disabledInfo = {};
            for (let key in this.state.ingredients) {
                disabledInfo[key] = this.state.ingredients[key] <= 0;
            }
            const ingredientTypes = Object.keys(this.state.ingredients);
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={() => this.purchaseHandler(false)}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientTypes={ingredientTypes}
                        ingredientAmountChanged={this.changeAmountIngredientHandler}
                        disabledInfo={disabledInfo}
                        burgerPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>
            )
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios_instance)