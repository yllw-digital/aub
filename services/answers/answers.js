
import { URL } from '../url'
import api from '../config';

console.log(api.defaults);
export const answerQuestions = (answers, arcgis_id) => {
    return api.post(URL + '/api/answer' ,{ answers, arcgis_id });
}            

export const getUserSubmissions = () => {
    return api.get(URL + '/api/user/submissions');
}
