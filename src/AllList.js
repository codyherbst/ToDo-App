import React from 'react';
import './AllList.css';

class AllList extends React.Component {
    constructor(props) {
        super(props);
        this.checked = false;
    }

    render() {

        return (
            <ul className='pl-3'>
                {this.props.items.map(item => (
                    <div>
                        {item.status === 'in progress' || item.status === 'done' ?
                        <li key={item.id} className='mr-3 my-1 border'>
                            {(item.status === 'done' ? this.checked = true : this.checked = false)}
                            <input
                                type='checkbox'
                                name={item.id}
                                id={item.id}
                                checked={this.checked}
                                onClick={this.props.updateStatus}
                                className='float-left mt-2 ml-1'
                            />
                            <label
                                htmlFor={item.id}
                                className='pl-3 pt-1'
                            >
                                {item.text}
                            </label>
                            <button
                                id={item.id}
                                onClick={this.props.removeItem}
                                className='float-right mt-1 mr-1'
                            >
                                X
                        </button>
                        </li> :
                        null
                        }
                    </div>
                ))
                }
            </ul>
        );
    }
}

export default AllList;