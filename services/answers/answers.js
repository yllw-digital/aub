
import { URL } from '../url'
import api from '../config';

export const answerQuestions = (answers, zoneInfo) => {
    return api.post(URL + '/api/answer' ,{ answers, zone_id: zoneInfo.zone_id, pid: zoneInfo.pid });
}            

export const getUserSubmissions = () => {
    return api.get(URL + '/api/user/submissions');
}

export const getSubmission = (submissionId) => {
    return api.get(URL + `/api/user/submissions/${submissionId}`);
}

export const getSubmissionCount = () => {
    return api.get(URL + `/api/submissions/count`);
}
