
import axios from 'axios';
import { URL } from '../url'

export const importQuestions = () => {
    return axios.get(URL + '/api/questions/import');
}             

export const getQuestions = () => {
    return axios.get(URL + '/api/questions');
}             

export const getQuestionAnswers = (questionId) => {
    return axios.get(URL + `/api/questions/${questionId}/answers`);
}             
