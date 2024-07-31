import * as httpRequest from '~/ultils/httpRequest'


export const postLogin = async (email, password) => {
    try {
        const res = await httpRequest.post('auth/login', {
            email,
            password,
        })
        
        return res;
    }
    catch (error) {
        console.log(error)
    }
}

export const postLogout = async (token) => {
    try {
        const res = await httpRequest.post('auth/logout', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return res;
    }
    catch (error) {
        return {
            err: error
        }
    }
}

export const postSignup = async (type, email, password) => {
    try {
        const res = await httpRequest.post('auth/register', {
            type,
            email,
            password,
        })

        return res;
    }
    catch (error) {
        return {
            err: error
        }
    }
}

export const patchUpdateCurrentUser = async (token, avatar, first_name, last_name, bio) => {
    try {
        const res = await httpRequest.post('auth/me', 
            {
                avatar,
                first_name,
                last_name,
                bio,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    _method: 'PATCH',
                },
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