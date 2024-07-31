import * as httpRequest from "~/ultils/httpRequest";

export const getVideosList = async (token, type, page) => {
    try {
        const res = await httpRequest.get('videos', 
            {
                params: {
                    type,
                    page
                },
                headers: {
                    Authorization: `${token}`,
                }
            }
        );
        return res;
    }
    catch (error) {
        console.log(error);
    }   
}

export const getAVideo = async (videoId) => {
    try {
        const res = await httpRequest.get(`videos/${videoId}`);
        return res.data;
    }
    catch (error) {
        console.log(error);
    }   
}

export const getLikedVideos = async (token, userId) => {
    try {
        const res = await httpRequest.get(`users/${userId}/liked-videos`, {
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
