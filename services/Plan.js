const { get } = require("../utilities/httpRequest");

export const getPlan = async () => {
    
    const response = await get({request: '/plans'});

    return response;
}