
import axios from 'axios';
import { URL } from '../url'

export const answerQuestions = (answers) => {
    return axios.post(URL + '/api/answer' ,{ answers });
}             
