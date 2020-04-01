import React, { Component } from 'react';
import {Burger} from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            meat: 2,
            bacon: 1,
            salad: 1,
        }
    }

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/ >
                <div>Build Controls</div>
            </React.Fragment>
        )
    }
}

export {BurgerBuilder};