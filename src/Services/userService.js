import * as httpRequest from "~/ultils/httpRequest";

export const getAnUser = async (token, username) => {
    try {
        const res = await httpRequest.get(`users/@${username}`, 
            {
            headers: {
                Authorization: `${token}`,
            },
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
    }   
}