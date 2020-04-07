import React from 'react';

const OrderSummary = (props) => {
    const ingredientsArrayData = Object.entries(props.ingredients);
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
            <p>Continue to Checkout?</p>
        </React.Fragment>
    )

};

export {OrderSummary}