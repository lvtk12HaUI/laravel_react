import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function RenderRows(props){ 
    //mapでループしている（for相当）
    //props: properties kiểu dữ liệu được control như 1 componet, giữ thông tin về component
    return props.todos.map(todo => { //map == for
        return (
            //key: định những phần tử nào đã thay đổi, được thêm, hay bị xóa
            <tr key={todo.id}> 
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button className="btn btn-success">Edit</button></td>
            </tr>
        );
    });
}

export default class User extends Component {
    constructor(){
        super();
        this.state = {
            todos: [] //Khai báo dữ liệu vào
        }
    }
    //khi component render lần đầu tiên nó sẽ thực hiện "mount". Khi 1 component mout nó sẽ gọi lần lượt 3 method componentWillMount, render, componentDidMount
    //componentDidMount: kết nối react vs web API ...
    componentDidMount(){
        axios
            .get('/api/get')
            .then((res) => {
                //todosを更新（描画がかかる）
                this.setState({
                    todos: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <React.Fragment>
                {/* add form */}
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 行の描画 */}
                        <RenderRows
                            todos={this.state.todos}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}


