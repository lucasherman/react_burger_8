import React, {Component} from 'react';
import {Button} from '../UI/Button/Button';

class OrderSummary extends Component {

    //this could be a functional component
    componentDidUpdate() {
        console.log("[OrderSummary] Will Update");
    }

    render() {
        const {ingredients, price, purchaseCanceled, purchaseContinued} = this.props;

        const ingredientsArrayData = Object.entries(ingredients);
        const ingredientsSummary = ingredientsArrayData.map((ingredient) => {
            const [type, amount] = ingredient;
            return (
              <li key={`ing-sum-${type}`}>
                  <span style={{textTransform: 'capitalize'}}>{type}</span>: {amount}
              </li>
            );
        });

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
        )
    }
}

export {OrderSummary}