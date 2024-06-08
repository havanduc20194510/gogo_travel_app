import { axiosSendRequest } from '../axios/axiosSendRequet';
import env from '../../../env.json';
import { retry } from '@reduxjs/toolkit/query';
import axios from 'axios';

const _ = require('lodash');
//const FormData = require('form-data');

const bookingApi = {
    create: async (accessToken, params) => {
        return await axiosSendRequest('post', env.dev.baseUrl.concat('/booking/create'), params, {
            Authorization: `Bearer ${accessToken}`,
        });
    },
    getBookingOfUser: async (accessToken, userId, params) => {
        return await axiosSendRequest('get', env.dev.baseUrl.concat(`/booking/get-by-user/${userId}`), params, {
            Authorization: `Bearer ${accessToken}`,
        });
    },
    paymentBooking: async (accessToken, params) => {
        return await axiosSendRequest('get', env.dev.baseUrl.concat('/payment/vn-pay/submit'), params, {
            Authorization: `Bearer ${accessToken}`,
        });
    },
    getTotalBooking: async (accessToken, params) => {
        return await axiosSendRequest('get', env.dev.baseUrl.concat('/booking/get-total'), params, {
            Authorization: `Bearer ${accessToken}`,
        });
    },
};

export default bookingApi;
