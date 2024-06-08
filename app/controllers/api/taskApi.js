import { axiosSendRequest } from '../axios/axiosSendRequet';
import env from '../../../env.json';

const _ = require('lodash');
//const FormData = require('form-data');

const taskApi = {
    listTask: async (accessToken) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/user-task/get-all'),
            {},
            { Authorization: `Bearer ${accessToken}` },
        );
    },
};

export default taskApi;
