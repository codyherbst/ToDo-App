import React from 'react'


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
            items: localStorage.getItem('test') ? JSON.parse(localStorage.getItem('test')) : [],
            text: '',
            status: ''
        };
        this.myStorage = localStorage
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleClear = this.handleClear.bind(this);
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
                <TodoList items={this.state.items} updateState={this.updateState} />
            </div>
        );
    }

    componentDidUpdate() {
        this.myStorage.setItem('test', JSON.stringify(this.state.items))
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

        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }

    async updateState(e) {
        e.persist();
        console.log(this.state.items)
        await this.setState(prevState => ({
            items: prevState.items.map((item) => {
                // console.log(prevState.items, 'here')
                if (item.id == e.target.id) {
                    // console.log('here')
                    item.status = 'done'
                }
                // console.log(prevState.items)
                return item
            })
        }))
        console.log(this.state.items)
    }

    handleClear() {
        localStorage.clear();
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ul>
                {/* {console.log(this.props.items)} */}
                {this.props.items.map(item => (
                    <li key={item.id}>
                        <input
                            type='checkbox'
                            name={item.id}
                            id={item.id}
                            onClick={this.props.updateState}
                        />
                        <label htmlFor={item.id}>
                            {item.text}
                        </label>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TodoApp;