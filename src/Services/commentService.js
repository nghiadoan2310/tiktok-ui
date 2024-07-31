import * as httpRequest from "~/ultils/httpRequest";

export const getComment = async (token, videoId) => {
    try {
        const res = await httpRequest.get(`videos/${videoId}/comments`, {
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

export const postComment = async (token, videoId, comment) => {
    try {
        const res = await httpRequest.post(`videos/${videoId}/comments`,
            {
                comment,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    }
    catch (error) {
        console.log(error);
    }   
}
