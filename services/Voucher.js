import { get, patch } from "../utilities/httpRequest"

export const getDetailVouchers = async (id) => {
    const response = await get({request: '/vouchers/' + id});

    return response;
}

export const applyVoucher = async (code) => {
    const response = await get({request: '/vouchers/' + code});

    return response;
}