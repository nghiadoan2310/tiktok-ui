import * as httpRequest from "~/ultils/httpRequest";

export const search = async (q, type='less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type: type
            }
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
    }   
}
