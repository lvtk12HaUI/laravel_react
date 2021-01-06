// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// export default class Example extends Component {
//     render() {
//         return (
//             <div>TodoApp</div>
//         );
//     }
// }

// if (document.getElementById('todoApp')) {
//     ReactDOM.render(<Example />, document.getElementById('todoApp'));
// }
// 1 component là một block code độc lập, có thể tái sử dụng, nó chia UI thành nhiều phần nhỏ. Mặt khác, có thể nghĩ đơn giản các components như một khối các blocks LEGO. Tương tự, cấu trúc LEGO được tạo từ nhiều blocks LEGO nhỏ, như tạo một web page hoặc UI từ nhiều block code(components).
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//RenderRowsの機能実装
//function components
// một function Javascript / ES6 function
// phải trả về 1 React element
// nhận props làm tham số nếu cần
function RenderRows(props){ 
    //mapでループしている（for相当）
    //props: properties kiểu dữ liệu được control như 1 componet, giữ thông tin về component
    return props.todos.map(todo => { //map == for
        return (
            //key: định những phần tử nào đã thay đổi, được thêm, hay bị xóa
            <tr key={todo.id}> 
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button className="btn btn-danger" onClick={() => props.deleteTask(todo)}>Delete</button></td>
            </tr>
        );
    });
}

 //class components
// là một class ES6, nó sẽ là một component khi nó "kế thừa" React component.
// có thể nhận props (trong hàm khởi tạo) nếu cần.
// có thể maintain data của nó với state
// phải có 1 method render() trả về 1 React element (JSX), or null
export default class TodoApp extends Component {

    //コンストラクタ内でstateにtodosを宣言
    constructor(){
        super();//hàm khởi tạo của class cha(không thể dùng this khi không gọi super)
        //state: chứa dữ liệu, thông tin về component
        //khởi tạo 1 state: this.state
        //lấy giá trị của state: this.state.name
        this.state = { 
            todos: [],
            todo: ''
        }
        //bind: gắn hàm xử lý đó với component instance trong constructor
        this.inputChange = this.inputChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    //コンポーネントがマウントされた時点で初期描画用のtodosをAPIから取得
    componentDidMount(){
        axios //Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.
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

    inputChange(event){
        switch(event.target.name){
            case 'todo': 
            //cập nhật lại giá trị cho state
                this.setState({
                    todo: event.target.value
                });
                break;
            default:
                break;
        }
    }

    addTodo(){
        if(this.state.todo == ''){
            return;
        }
        axios //Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.
            .post('/api/add',{
                title: this.state.todo
            })
            .then((res) => {
                //todosを更新（描画がかかる）
                this.setState({
                    todos: res.data,
                    todo: ''
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteTask(todo){
        axios //Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.
            .post('/api/del',{
                id: todo.id
            })
            .then((res) => {
                //todosを更新（描画がかかる）
                this.setState({
                    todos: res.data,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    //テーブルの骨組みを描画し、行の描画はRenderRowsに任せる（その際、todosを渡す）
    render() {
        return (
            <React.Fragment>
                {/* add form */}
                <div className="form-group mt-4">
                    <label htmlFor="todo">新規Todo</label>
                    <input type="text" className="form-control" name="todo" value={this.state.todo} onChange={this.inputChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.addTodo}>登録</button>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タスク</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 行の描画 */}
                        <RenderRows
                            todos={this.state.todos}
                            deleteTask={this.deleteTask}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

// ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));//<TodoApp>: 1 componet được gọi như 1 thẻ HTML, nhưng được bắt đầu bằng chữ hoa