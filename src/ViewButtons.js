import React from 'react'

class ViewButtons extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <button
                    id='AllBtn'
                    className='float-left'
                    onClick={() => { this.props.updatePage('AllList') }}
                >
                    All
                </button>

                <button
                    id='DoneBtn'
                    onClick={() => { this.props.updatePage('DoneList') }}
                >
                    Completed
                </button>

                <button
                    id='ToDoBtn'
                    className='float-right'
                    onClick={() => { this.props.updatePage('ToDoList') }}
                >
                    To Do
                </button>
            </React.Fragment>
        )
    }
}

export default ViewButtons