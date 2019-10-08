import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserScore extends Component {
    render() {
        const {user, answersCount, questionsCount, score, winnerId} = this.props

        if (user === null) {
            return <p>This user doesn't exist</p>
        }

        const {id, name, avatarURL} = user

        return (
            <div className='score-container'>
                {id === winnerId && (<div className='ribbon-wrapper'>
                    <div className="ribbon">WINNER</div>
                </div>)}
                <img
                    src={avatarURL}
                    alt={`Avatar of ${name}`}
                    className='avatar-score'
                />
                <div className='vertical-line'>
                </div>
                <div className='score-detail'>
                    <h3>{name}</h3>
                    <div>
                        <p>Answered Questions:&nbsp;<span className='answer-count'>{answersCount}</span></p>
                        <p>Created Questions: <span className='question-count'>{questionsCount}</span></p>
                    </div>
                </div>
                <div className='vertical-line'>
                </div>
                <div className='score-overview'>
                    <div className='score-header'>Score</div>
                    <div className='score'>{score}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users}, {id, winnerId}) {
    const user = users[id]
    const answersCount = Object.keys(user.answers).length
    const questionsCount = Object.keys(user.questions).length
    const score = answersCount + questionsCount
    return {
        user,
        answersCount,
        questionsCount,
        score,
        winnerId,
    }
}

export default connect(mapStateToProps)(UserScore)