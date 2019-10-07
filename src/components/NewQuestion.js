import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/shared'
import {Redirect} from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        textOne: '',
        textTwo: '',
        toHome: false,
    }
    handleChangeOne = (e) => {
        const textOne = e.target.value
        this.setState(() => ({
            textOne
        }))
    }
    handleChangeTwo = (e) => {
        const textTwo = e.target.value
        this.setState(() => ({
            textTwo
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const {textOne, textTwo} = this.state
        const {dispatch} = this.props
        dispatch(handleAddQuestion(textOne, textTwo))

        this.setState(() => ({
            textOne: '',
            textTwo: '',
            toHome: true,
        }))
    }

    render() {
        const {textOne, textTwo, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <div className='question'>
                    <div className='new-question-header'>Create New Question</div>
                    <div className='question-info'>
                        <form className='new-question' onSubmit={this.handleSubmit}>
                            <h3>Would you rather...</h3>
                            <input
                                name="optionOne"
                                className="input"
                                type="text"
                                placeholder="Option One"
                                value={textOne}
                                onChange={this.handleChangeOne}
                                maxLength={280}
                            />
                            <p className='center'>Or</p>
                            <input
                                name="optionTwo"
                                className="input"
                                type="text"
                                placeholder="Option Two"
                                value={textTwo}
                                onChange={this.handleChangeTwo}
                                maxLength={280}
                            />
                            <button
                                className='btn'
                                type='submit'
                                disabled={textOne === '' || textTwo === ''}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        author: users[authedUser],
    }
}

export default connect(mapStateToProps)(NewQuestion)