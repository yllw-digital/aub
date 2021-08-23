
import axios from 'axios';
import { URL } from '../url'
import api from '../config';

export const importQuestions = () => {
    return api.get(URL + '/api/questions/import');
}             

export const getQuestions = () => {
    return api.get(URL + '/api/questions');
}             

export const getQuestionAnswers = (questionId) => {
    return api.get(URL + `/api/questions/${questionId}/answers`);
}             
