import { get } from "../utilities/httpRequest"

export const getDetailVouchers = async (id) => {
    const response = await get({request: '/vouchers/' + id});

    return response;
}