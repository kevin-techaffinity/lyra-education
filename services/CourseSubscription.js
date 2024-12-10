import { getCookie } from 'cookies-next';

import { get, post } from "../utilities/httpRequest"

export const createSubscription = async ({plan_id, amount, moduleId, update = false}) => {
    const token = getCookie('token');
    const params = `token=${token}`;

    const response = await post({request: '/subscription', body: plan_id?.length > 0 ? {plan_id, amount, moduleId} : {moduleId, update}, params});

    return response;
}

export const checkSubscription = async (id) => {
    const token = getCookie('token');
    const params = `token=${token}`;

    const response = await get({request: '/subscription/' + id, params});

    return response;
}

export const getSlots = async (id) => {
    const token = getCookie('token');
    const params = `token=${token}`;

    const response = await get({request: '/user-slots/' + id, params});

    return response;
}

export const getAlertContent = async (domain) => {
  const response = await get({request: '/alert_page/' + domain});

  return response;
}

export const getMyProgress = async (id) => {
    const token = getCookie('token');
    const params = `token=${token}`;

    const response = await get({request: '/user-progress', params});

    return response;
}
