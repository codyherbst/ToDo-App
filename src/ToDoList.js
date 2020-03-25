import React from 'react';
import './ToDoList.css';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.checked = false;
    }

    render() {

        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>
                        {(item.status === 'done' ? this.checked = true : this.checked = false)}
                        <input
                            type='checkbox'
                            name={item.id}
                            id={item.id}
                            checked={this.checked}
                            onClick={this.props.updateStatus}
                            className='float-left inputHover'
                        />
                        <label
                            htmlFor={item.id}
                            className='pl-3 '
                        >
                            {item.text}
                        </label>
                        <button
                            id={item.id}
                            onClick={this.props.removeItem}
                            className='float-right'
                        >
                            X
                        </button>
                    </li>
                ))
                }
            </ul>
        );
    }
}

export default ToDoList;