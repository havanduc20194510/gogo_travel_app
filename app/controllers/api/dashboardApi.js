import { axiosSendRequest } from '../axios/axiosSendRequet';
import env from '../../../env.json';

const _ = require('lodash');
//const FormData = require('form-data');

const dashboardApi = {
    topTour: async (accessToken = '') => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/tour/top-tour'),
            {},
            // { Authorization: `Bearer ${accessToken}` },
        );
    },

    topPlace: async (accessToken = '') => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/places/top-recommend'),
            {},
            // { Authorization: `Bearer ${accessToken}` },
        );
    },
};

export default dashboardApi;
