import env from '../../../env.json';
import { axiosSendRequest } from '../axios/axiosSendRequet';

const authApi = {
    // sign in
    signIn: async (username, password) => {
        const url = '/auth/token';
        return await axiosSendRequest('post', env.dev.baseUrl.concat(url), {
            username,
            password,
        });
    },

    // sign in
    register: async (username, password, email, fullname) => {
        const url = '/auth/register';
        return await axiosSendRequest('post', env.dev.baseUrl.concat(url), {
            username,
            password,
            email,
            fullname,
        });
    },
};

export default authApi;
