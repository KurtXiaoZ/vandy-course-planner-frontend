import { appendParams } from "./util";

export const getCourses = (inputs = {}) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/courses/', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
};