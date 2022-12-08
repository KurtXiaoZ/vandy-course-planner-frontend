/**
 * CS4287 Project
 * Author: Zechuan Xiao (60%)
 * Email: zechuan.xiao@vanderbilt.edu
 * 
 * Author: Toby Zhu (40%)
 * Email: xiaoliang.zhu@vanderbilt.edu
 */

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

export const getSavings = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/savings/', inputs), {
            method: 'GET',
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
};

export const postSavings = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_HOST_URL + '/savings/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        }).then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
};

export const deleteSavings = (inputs) => {
    return new Promise((resolve, reject) => {
        fetch(appendParams(process.env.REACT_APP_HOST_URL + '/savings/delete/', inputs), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
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