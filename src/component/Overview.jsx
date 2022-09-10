import React, { Component } from 'react'
import './Overview.scss';
import uniqid from 'uniqid';
import { ModeEditOutlineOutlined } from "@mui/icons-material"
export default class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: uniqid(),
                content: ''
            },
            taskArray: [],
            edit: false,
            taskEditId: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            taskArray: [...prevState.taskArray, prevState.task],
            task: {
                id: uniqid(),
                content: ''
            }
        }), () => {
            document.getElementById('inputText').value = '';
        });
    }

    handleOnChange(e) {
        this.setState((prevState) => ({
            task: {
                id: prevState.task.id,
                content: e.target.value
            }
        }));
    }

    handleDelete(e) {
        this.setState({
            taskArray: this.state.taskArray.filter((task) => task.id !== e.target.getAttribute("id"))
        });
    }
    handleEdit(e) {
        this.setState({
            edit: !(this.state.edit),
            taskEditId: e.target.getAttribute("id")
        }, () => {
            if (this.state.edit) {

            }
        });

    }
    handleChangeSm(e) {
        const newTask = {
            id: e.target.getAttribute('id'),
            content: e.target.value
        }
        let index = this.state.taskArray.findIndex(task => task.id === e.target.getAttribute("id"));
        console.log(index);
        let arr = this.state.taskArray;
        arr.splice(index, 1, newTask);
        this.setState({
            taskArray: arr
        });

    }

    render() {
        return (
            <div className='overview'>
                <ul className='tasks'>
                    {this.state.taskArray.map((task, _i) => {
                        return (<li key={`${task.id}${_i}`} className='taskItem'><span className='itemNum'>{_i + 1}</span>{this.state.edit && this.state.taskEditId === task.id ? <input id={task.id} onChange={this.handleChangeSm.bind(this)} className='editInput' type='text' defaultValue={task.content} /> : task.content}  <ModeEditOutlineOutlined id={task.id} className='editIcon' onClick={this.handleEdit.bind(this)} /> <button id={task.id} onClick={this.handleDelete.bind(this)} className='delete' >X</button></li>);
                    })}

                </ul>
                <form className='mainForm' action="" onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.handleOnChange.bind(this)} type="text" className='overviewInput' id="inputText" />
                    <button className='overviewButton'>Insert New Task</button>
                </form>
            </div>
        )
    }
}
