
import { URL } from '../url'
import api from '../config'; 

export const answerQuestions = (answers, zoneInfo, draftId =  null, isDraft = false) => {
    return api.post(URL + '/api/answer' ,{ answers, zone_id: zoneInfo.zone_id, pid: zoneInfo.pid, draft_id: draftId, is_draft: isDraft });
}            

export const getUserSubmissions = () => {
    return api.get(URL + '/api/user/submissions');
}

export const delDraft = (id) => {
    return api.post(URL + '/api/user/delete-draft', { draft_id: id });
}

export const getUserDrafts = () => {
    return api.get(URL + '/api/user/drafts');
}
export const getSubmission = (submissionId) => {
    return api.get(URL + `/api/user/submissions/${submissionId}`);
}

export const getDraftAnswers = (submissionId) => {
    return api.get(URL + `/api/user/drafts/${submissionId}`);
}
export const getSubmissionCount = () => {
    return api.get(URL + `/api/submissions/count`);
}
