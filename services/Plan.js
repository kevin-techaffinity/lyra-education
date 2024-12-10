const { get } = require("../utilities/httpRequest");

export const getPlan = async (domain) => {
    const response = await get({request: '/plans/' + domain});

    return response;
}
