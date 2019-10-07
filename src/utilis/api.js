import {
    _getUsers,
    _getQuestions,
    _saveAnswer,
    _saveQuestion,
} from './_DATA.js'

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveAnswer (info) {
    console.log ('saveAnswer', info)
    return _saveAnswer(info)
}

export function saveQuestion (info) {
    return _saveQuestion(info)
}