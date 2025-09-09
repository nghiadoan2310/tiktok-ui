import * as httpRequest from '~/ultils/httpRequest'

export const postLikeVideo = async (token, videoId) => {
    try {
        const res = await httpRequest.post(`videos/${videoId}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        return res;
    }
    catch (error) {
        return {
            err: error
        }
    }
}

export const postUnLikeVideo = async (token, videoId) => {
    try {
        const res = await httpRequest.post(`videos/${videoId}/unlike`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        return res.data;
    }
    catch (error) {
        return {
            err: error
        }
    }
}

export const postLikecomment = async (token, commentId) => {
    try {
        const res = await httpRequest.post(`comments/${commentId}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        return res;
    }
    catch (error) {
        return {
            err: error
        }
    }
}

export const postUnLikecomment = async (token, commentId) => {
    try {
        const res = await httpRequest.post(`comments/${commentId}/unlike`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        return res;
    }
    catch (error) {
        return {
            err: error
        }
    }
}
