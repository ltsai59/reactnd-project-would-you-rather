import { ADD_QUESTION, ADD_ANSWER_TO_QUESTION, RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case ADD_ANSWER_TO_QUESTION :
            const { answer, qid, authedUser } = action
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    } ,
                }
            }
        case ADD_QUESTION :
            const { question } = action
            return {
                ...state,
                [question.id]: question,
            }
        default:
            return state
    }
}
