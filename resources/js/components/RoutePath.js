import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Example from './Example';
import User from './User';
import TodoApp from './TodoApp';

/*Route: Định nghĩa một ánh xạ (mapping) giữa một URL và một Component. 
Điều đó có nghĩa là khi người dùng truy cập theo một URL trên trình duyệt, 
một Component tương ứng sẽ được render trên giao diện.*/
export default class RoutePath extends Component{
    render() {
        return (
            <main>
                {/* switch là componet để wrap route */}
                <Switch>
                    {/* path: đường dẫn trên url */}
                    {/* exact: giúp cho route chỉ nhận url trên trình duyệt phù hợp tuyệt đối  với url trong path */}
                    {/* Component sẽ được load ra tương ứng với route đó */}
                    <Route exact path='/' component={TodoApp}/>
                    <Route exact path='/user' component={User}/>
                    <Route exact path='/order' component={Example}/>
                </Switch>
            </main>
        )
    }
}