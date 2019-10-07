import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleAddAnswer} from '../actions/shared'
import {formatQuestionDetail, formatQuestion} from "../utilis/helpers"
import {Redirect} from 'react-router-dom'
import {ProgressBar} from './ProgressBar'

class Question extends Component {
    state = {
        selectedValue: 'optionOne',
    }
    handleChange = (e) => {
        const selectedValue = e.target.value
        this.setState({
            selectedValue: selectedValue
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {selectedValue} = this.state
        const {dispatch, id} = this.props
        dispatch(handleAddAnswer(selectedValue, id))
    }

    render() {
        const {selectedValue} = this.state
        const {answeredAlready, answer, question, authedUser} = this.props
        if (authedUser === null) {
            return <Redirect to='/login'/>
        }
        if (question === null) {
            return <Redirect to='/pageNotFound'/>
        }
        const {
            author, avatar, option1, option2, totalVoters,
            option1Count, option2Count, option1Percentage, option2Percentage
        } = question
        return (
            <div className='question'>
                {answeredAlready && (<div className='question-header'>{author} Asked:</div>)}
                {!answeredAlready && (<div className='question-header'>{author} Asks:</div>)}
                <div className='question-container'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${author}`}
                        className='avatar-question'
                    />
                    <div className='vertical-line'>
                    </div>
                    <div className='question-info'>
                        {answeredAlready && (
                            <Fragment>
                                <h3>Results:</h3>
                                <div className='question-detail'
                                     data-notifications={answer === 'optionOne' ? 'your vote' : ''}>
                                    <div className='question-option'>Would you rather {option1}
                                        <ProgressBar percentage={option1Percentage}/>
                                        <p>{option1Count} out of {totalVoters} votes</p>
                                        {/*{answer === 'optionOne' && ( <p>You selected this answer.</p>) }*/}
                                    </div>
                                </div>
                                <br/>
                                <div className='question-detail'
                                     data-notifications={answer === 'optionTwo' ? 'your vote' : ''}>
                                    <div className='question-option'>Would you rather {option2}
                                        <ProgressBar percentage={option2Percentage}/>
                                        <p>{option2Count} out of {totalVoters} votes</p>
                                        {/*{answer === 'optionTwo' && ( <p>You selected this answer.</p>) }*/}
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {!answeredAlready && (
                            <form className='new-question' onSubmit={this.handleSubmit}>
                                <p>Would you Rather ... </p>
                                <div>
                                    <input type='radio' name='option' value='optionOne'
                                           checked={selectedValue === 'optionOne'} onChange={this.handleChange}/>
                                    <label htmlFor='option1'>{option1}</label>
                                </div>
                                <div>
                                    <input type='radio' name='option' value='optionTwo'
                                           checked={selectedValue === 'optionTwo'} onChange={this.handleChange}/>
                                    <label htmlFor='option2'>{option2}</label>
                                </div>
                                <button
                                    className='submit-btn'
                                    type='submit'>
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, props) {
    const {id} = props.match.params
    const question = questions[id]
    const answeredQuestionIds = question ? Object.keys(users[authedUser].answers) : null
    const answeredAlready = question ? answeredQuestionIds.includes(id) : null
    return {
        id: id,
        answeredAlready: answeredAlready,
        answer: answeredAlready ? users[authedUser].answers[id] : "",
        question: !question
            ? null
            : answeredAlready
                ? formatQuestionDetail(question, users[question.author], users)
                : formatQuestion(question, users[question.author])
    }
}

export default connect(mapStateToProps)(Question)
