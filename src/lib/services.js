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

export const getSavings = (email) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/savings/', email), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
};

export const classifyCrs = (course) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/courses/classify', course), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
};