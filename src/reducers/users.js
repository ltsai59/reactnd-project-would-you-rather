import { ADD_QUESTION_TO_USER, ADD_ANSWER_TO_USER, RECEIVE_USERS } from "../actions/users";

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER_TO_USER :
            const { answer, qid, authedUser } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case ADD_QUESTION_TO_USER :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.qid])
                }
            }
        default:
            return state
    }
}