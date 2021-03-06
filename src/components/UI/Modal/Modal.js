import React, {Component} from 'react';
import classes from './Modal.css';
import {Backdrop} from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    }

    render() {
        const {show, children, modalClosed} = this.props;

        return (
            <React.Fragment>
                <Backdrop show={show} clicked={modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0',
                    }}
                >
                    {children}
                </div>
            </React.Fragment>
        )
    }
}

export {Modal};