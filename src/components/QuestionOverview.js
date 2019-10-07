import React, { Component } from 'react'
import { connect } from 'react-redux'
import {formatQuestionOverview} from "../utilis/helpers"
import { Link, withRouter } from 'react-router-dom'
class QuestionOverview extends Component {

    render() {
        const { question, id, answered} = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const { author, avatar, option1} = question
        let addition = 's'
        if (answered === 'Y') {
            addition = 'ed'
        }

        return (
            <div className='question-overview'>
                <div className='question-header'>{author} ask{addition}</div>
                <div className='question-container'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${author}`}
                        className='avatar-question'
                    />
                    <div className='vertical-line'>
                    </div>
                    <div className='question-info'>
                        <p><b>Would you rather</b></p>
                        <p>{option1}</p>
                        <Link to={`/question/${id}`}
                              className='btn'>
                            View Poll
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({questions, users}, { id, answered }) {
    const question = questions[id]

    return {
        question: question
            ? formatQuestionOverview(question, users[question.author])
            : null,
        id,
        answered,
    }
}

export default withRouter(connect(mapStateToProps)(QuestionOverview))