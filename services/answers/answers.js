
import { URL } from '../url'
import api from '../config';

export const answerQuestions = (answers) => {
    return api.post(URL + '/api/answer' ,{ answers });
}             
