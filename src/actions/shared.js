import {getInitialData, saveAnswer, saveQuestion} from '../utilis/api'
import {receiveUsers, addAnswerToUser, addQuestionToUser} from '../actions/users'
import {receiveQuestions, addAnswerToQuestion, addQuestion} from '../actions/questions'
import {setAuthedUser} from '../actions/authedUser'
import {showLoading, hideLoading} from 'react-redux-loading-bar'

const AUTHED_ID = null

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function handleAddAnswer(answer, qid) {
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveAnswer({
            authedUser,
            qid,
            answer,
        })
            .then(() => dispatch(addAnswerToQuestion(authedUser, qid, answer)))
            .then(() => dispatch(addAnswerToUser(authedUser, qid, answer)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then(question => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(authedUser, question.id))
                dispatch(hideLoading())
            })
    }
}
