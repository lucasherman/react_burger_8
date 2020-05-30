import React, {Component} from 'react';

import {Modal} from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error:  null
        }

        componentWillMount() {
            this.req_interceptor = axios.interceptors.request.use(req =>  {
                this.setState({error: null});
                return req;
            });
            this.resp_interceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.req_interceptor);
            axios.interceptors.response.eject(this.resp_interceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export {withErrorHandler};