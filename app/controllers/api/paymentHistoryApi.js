import { axiosSendRequest } from '../axios/axiosSendRequet';
import env from '../../../env.json';

const _ = require('lodash');
//const FormData = require('form-data');

const paymentHistoryApi = {
    getPaymentHistoryOfUser: async (accessToken, userId) => {
        return await axiosSendRequest('get', env.dev.baseUrl.concat(`/payment/list/${userId}`), {}, {
            Authorization: `Bearer ${accessToken}`,
        });
    },
};

export default paymentHistoryApi;
