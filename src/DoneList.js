import React from 'react';
import './AllList.css';

class DoneList extends React.Component {
    constructor(props) {
        super(props);
        this.checked = false;
    }

    render() {

        return (
            <ul className='pl-3'>
                {this.props.items.map(item => (
                    <li key={item.id} className='mr-3 my-1 border'>
                        {item.status === 'done' ?
                            <React.Fragment>
                                <input
                                    type='checkbox'
                                    name={item.id}
                                    id={item.id}
                                    checked={true}
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
                            </React.Fragment> :
                            null
                        }
                    </li>
                ))
                }
            </ul>
        );
    }
}

export default DoneList;