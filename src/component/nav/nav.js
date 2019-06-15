import React, { Component } from 'react'
import auth from './../../common/auth';
import './css/nav.css';

class Nav extends Component {
    constructor(props) {
        super();
        
    }

    componentWillMount(){}

    render() {
        const context = this.props.children;
        console.log('------------------------');
        console.log(context);
        return (
            <div className="layout-aside" >
                <div className="layout-main" >
                    <div className="header">
                        <div className="title">用户管理</div>
                    </div>
                    <div className="layout-container">
                        <div className="layout-content">
                            {context}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Nav;