import { getCookie } from 'cookies-next';

import { get, post } from "../utilities/httpRequest"

export const createSubscription = async ({plan_id, amount, moduleId}) => {
    const token = getCookie('token');
    const params = `token=${token}`;

    const response = await post({request: '/subscription', body: {plan_id, amount, moduleId}, params});

    return response;
}

export const checkSubscription = async (id) => {
    const token = getCookie('token');
    const params = `token=${token}`;
    
    const response = await get({request: '/subscription/' + id, params});

    return response;
}