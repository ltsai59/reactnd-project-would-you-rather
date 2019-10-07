import React, {Component} from 'react'
import {connect} from "react-redux"
import {setAuthedUser} from '../actions/authedUser'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        selectedOption: 'select',
        toHome: false,
    }
    handleChange = e => {
        e.preventDefault()
        const selectedOption = e.target.value
        this.setState(
            {selectedOption}
        );
    };

    handleLogin = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        const {selectedOption} = this.state
        if (selectedOption !== "select") {
            dispatch(setAuthedUser(selectedOption))
            this.setState(() => ({
                selectedOption: 'select',
                toHome: true,
            }))
        }
    }

    render() {
        const {options} = this.props
        const {selectedOption, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/'/>
        }

        return (
            <form className='login' onSubmit={this.handleLogin}>
                <div className='header'>
                    <h3>Welcome to Would you rather application!</h3>
                </div>
                <div className='container'>
                    <p>Please select a user to continue:</p>
                    <select className='select' onChange={this.handleChange} value={selectedOption}>
                        <option key='select' value='select'>--Select--</option>
                        {options.map((option) => (
                            <option className='option' key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <br/>
                    <button
                        type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({users, authedUser}) {

    const options =
        Object.keys(users).map(user => {
            return {value: users[user].id, label: users[user].name}
        })
    return {
        authedUser,
        options
    }
}

export default connect(mapStateToProps)(Login)