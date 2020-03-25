import React from 'react'
import ToDoList from './ToDoList'

//need to save input field as an object
//      it will add in progress to status
//      id will be current time to be used for list key
//need to be able to set each one to done
//      link each one to a checkbox
//      this gives the option to undo a previously completed list
//have three views
//      first view will just show all of them
//      second view will be uncompleted objects
//      third view will be completed objects

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : [],
            text: '',
        };
        this.myStorage = localStorage
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    render() {

        return (
            <div>
                <h3>TODO</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
                <ToDoList items={this.state.items} updateStatus={this.updateStatus} removeItem={this.removeItem} />
            </div>
        );
    }

    componentDidUpdate() {
        this.myStorage.setItem('toDoList', JSON.stringify(this.state.items))
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.text.length === 0) {
            return;
        }

        const newItem = {
            text: this.state.text,
            status: 'in progress',
            id: Date.now()
        };

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }

    async updateStatus(e) {
        e.persist();

        await this.setState(prevState => ({
            items: prevState.items.map((item) => {

                if (item.id == e.target.id && item.status === 'in progress') {
                    item.status = 'done'
                } else if (item.id == e.target.id && item.status === 'done') {
                    item.status = 'in progress'
                }

                return item;
            })
        }));
    }

    async removeItem(e) {
        e.persist();
        let result = this.state.items.filter((item, i) => {

            if (item.id != e.target.id) {
                return item;
            }

        });
        // console.log({result})

        await this.setState(prevState => ({
            items: result
        }));
        // console.log(this.state.items)
    }

    handleClear() {
        localStorage.clear();

    }
}

export default TodoApp;