import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link} from 'react-router-dom';
import RoutePath from './RoutePath';

export default class Sidebar extends Component {
    render() {
        return (
            // HashRouter: Sử dụng hash của URL (window.location.hash) để ghi nhớ mọi thứ.
            <BrowserRouter>
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                            <div className="container">
                                <Link className="navbar-brand js-scroll-trigger" to="/">React JS</Link>
                                <div className="collapse navbar-collapse" id="navbarResponsive">
                                    <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                            {/* <link></link> == <a></a> to == href */}
                                            <Link className="nav-link js-scroll-trigger" to={'/'}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link js-scroll-trigger" to={'/user'}>User</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link js-scroll-trigger" to={'/order'}>Order</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div style={{ marginTop: '100px' }}><RoutePath /></div>
                </div>
            </BrowserRouter >
        )
    }
}

ReactDOM.render(<Sidebar />,document.getElementById('sidebar'));
