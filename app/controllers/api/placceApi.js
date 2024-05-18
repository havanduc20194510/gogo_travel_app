import { axiosSendRequest } from '../axios/axiosSendRequet';
import env from '../../../env.json';

const _ = require('lodash');
//const FormData = require('form-data');

const placeApi = {
    listTour: async (accessToken) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/tour/list'),
            {},
            // { Authorization: `Bearer ${accessToken}` },
        );
    },
    all: async (accessToken) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/places/all'),
            {},
            // { Authorization: `Bearer ${accessToken}` },
        );
    },

    search: async (accessToken, name = '', address = '', activities = '', offset = 1, pageSize = 10) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat(`/places/search/pagination`),
            { name, address, activities, offset, pageSize },
            // { Authorization: `Bearer ${accessToken}` },
        );
    },
};

export default placeApi;
