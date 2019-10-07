import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserScore from "./UserScore"

class LeaderBoard extends Component {
    render() {
        const {sortedUserIds} = this.props
        const winnerId = (sortedUserIds.length > 0) ? sortedUserIds[0] : "";
        return (
            <div className='board-container'>
                <h3 className='center'>Score Board</h3>
                <ul>
                    {this.props.sortedUserIds.map((id) => (
                        <li key={id}>
                            <UserScore id={id} winnerId={winnerId}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    // This obtains user with score list
    const scoreList = (() => {
        let usersWithScore = {}
        let withScore
        for (let user in users) {
            withScore = {
                [user]: {
                    score: Object.keys(users[user].answers).length + Object.keys(users[user].questions).length
                }
            }
            usersWithScore = {...usersWithScore, ...withScore}
        }
        return usersWithScore
    })()
    // This sorts the user list with the highest score as the first element
    const sortedUserIds = Object.keys(scoreList).sort((a, b) => scoreList[b].score - scoreList[a].score)
    return {
        sortedUserIds,
    }
}

export default connect(mapStateToProps)(LeaderBoard)

