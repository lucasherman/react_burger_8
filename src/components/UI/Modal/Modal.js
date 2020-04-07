import React from 'react';
import classes from './Modal.css';
import {Backdrop} from '../Backdrop/Backdrop';

const Modal = ({show, children, modalClosed}) => (
    <React.Fragment>
        <Backdrop show={show} clicked={modalClosed}/>
        <div
            className={classes.Modal}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? '1': '0',
            }}
        >
            {children}
        </div>
    </React.Fragment>
);

export {Modal};