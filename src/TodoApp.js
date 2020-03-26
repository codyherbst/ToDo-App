import React from 'react'
import AllList from './AllList'
import DoneList from './DoneList'
import ToDoList from './ToDoList'
import ViewButtons from './ViewButtons'
import { isCompositeComponent } from 'react-dom/test-utils'

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
            currentPage: 'AllList'
        };
        this.myStorage = localStorage
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }
    render() {

        return (
            <div className='row container-fluid'>
                <div className='col-lg-4' />
                <div className='col-lg-4 col-sm-12'>
                    <h2 className='text-center'>To Do List</h2>
                    <form onSubmit={this.handleSubmit} className='text-center'>
                        <label
                            htmlFor="new-todo"
                            className='pr-1'
                        >
                            What needs to be done?
                        </label>

                        <input
                            id="new-todo"
                            onChange={this.handleChange}
                            value={this.state.text}
                        />

                        <button className='ml-3'>
                            Add #{this.state.items.length + 1}
                        </button>
                    </form>

                    <div className='container text-center mt-5'>
                        {
                            this.state.currentPage === 'AllList' ?
                                <h3>All</h3> :
                                this.state.currentPage === 'DoneList' ?
                                <h3>Completed</h3> :
                                <h3>To Do</h3>
                        }
                    </div>

                    <div className='mt-2 pt-4 border'>
                        {
                            this.state.currentPage === 'AllList' ?
                                <AllList items={this.state.items} updateStatus={this.updateStatus} removeItem={this.removeItem} /> :
                                this.state.currentPage === 'DoneList' ?
                                    <DoneList items={this.state.items} updateStatus={this.updateStatus} removeItem={this.removeItem} /> :
                                    <ToDoList items={this.state.items} updateStatus={this.updateStatus} removeItem={this.removeItem} />
                        }
                    </div>

                    <div className='container text-center mt-3'>
                        <ViewButtons updatePage={this.updatePage}/>
                    </div>

                    <div className='container text-center'>
                        <button
                            className='mt-5 mr-4'
                            onClick={this.handleClear}
                        >
                            Clear All
                        </button>
                        <button
                            className='mt-5 mr-4'
                            onClick={this.clearCompleted}
                        >
                            Clear Completed
                        </button>
                    </div>
                </div>
                <div className='col-lg-4' />
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

        let result = this.state.items.filter((item) => {

            if (item.id == e.target.id && item.status != 'in progress') {
                return item;
            } else if (item.id != e.target.id) {
                return item;
            }

        });
        // console.log({result})

        await this.setState(prevState => ({
            items: result.map(item => {
                if (item.id == e.target.id && item.status === 'done') {
                    item.status = 'hiddenDone'
                }
                return item;
            })
        }));
        console.log(this.state.items)
    }

    handleClear() {
        localStorage.clear();
        this.setState({ items: [], currentPage: 'AllList' })
    }

    async updatePage(newPage) {
        await this.setState({ currentPage: newPage })
    }

    async clearCompleted() {
        await this.setState(prevState => ({
            items: prevState.items.map(item => {
                if (item.status === 'done') {
                    item.status = 'doneHidden'
                }

                return item;
            })
        }));
        console.log(this.state.items)
    }
}

export default TodoApp;