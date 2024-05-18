import { axiosSendRequest } from '../axios/axiosSendRequet';
import env from '../../../env.json';

const _ = require('lodash');
//const FormData = require('form-data');

const tourApi = {
    listTour: async (accessToken) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/tour/list'),
            {},
            // { Authorization: `Bearer ${accessToken}` },
        );
    },
    tourType: async (accessToken) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/tour-type/get-all'),
            {},
            // { Authorization: `Bearer ${accessToken}` },
        );
    },
    search: async (
        accessToken,
        {
            destination = '',
            departureLocation = '',
            startDate = '',
            numberOfDay = 4,
            filterType = '',
            filterPriceMin = 0,
            filterPriceMax = 1000000000,
            sortField = '',
            offset = 1,
            pageSize = 10,
        },
    ) => {
        return await axiosSendRequest(
            'get',
            env.dev.baseUrl.concat('/tour/search/pagination/sort/filter'),
            {
                destination,
                departureLocation,
                startDate,
                numberOfDay,
                filterType,
                filterPriceMin,
                filterPriceMax,
                offset,
                pageSize,
            },
            // { Authorization: `Bearer ${accessToken}` },
        );
    },
};

export default tourApi;
