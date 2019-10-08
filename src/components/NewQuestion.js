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

    handleOptionChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
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
                                name="textOne"
                                className="input"
                                type="text"
                                placeholder="Option One"
                                value={textOne}
                                onChange={this.handleOptionChange}
                                maxLength={280}
                            />
                            <p className='center'>Or</p>
                            <input
                                name="textTwo"
                                className="input"
                                type="text"
                                placeholder="Option Two"
                                value={textTwo}
                                onChange={this.handleOptionChange}
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