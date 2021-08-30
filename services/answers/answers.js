
import { URL } from '../url'
import api from '../config';

export const answerQuestions = (answers, arcgis_id) => {
    return api.post(URL + '/api/answer' ,{ answers, arcgis_id });
}             
