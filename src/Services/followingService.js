import * as httpRequest from "~/ultils/httpRequest";

export const getFollowing = async (token, page) => {
    try {
        const res = await httpRequest.get('me/followings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
            },
        });
        return res;
    }
    catch (error) {
        console.log(error);
    }   
}

export const postFollowAnUser = async (token, userId) => {
    try {
        const res = await httpRequest.post(`users/${userId}/follow`, 
            {},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
    }   
}

export const postUnFollowAnUser = async (token, userId) => {
    try {
        const res = await httpRequest.post(`users/${userId}/unfollow`, 
            {},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
    }   
}
