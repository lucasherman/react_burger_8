import React, {Component} from 'react';
import classes from './Layout.css';
import {Toolbar} from '../../components/Navigation/Toolbar/Toolbar';
import {SideDrawer} from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerHandler = (value) => {
        this.setState({showSideDrawer: value});
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar sideDrawerOpen={this.sideDrawerHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
};

export { Layout };