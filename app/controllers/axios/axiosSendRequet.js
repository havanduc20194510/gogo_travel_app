import axios from 'axios';
import axiosMiddleware from './middleware/axiosMiddleware';
import _ from 'lodash';
import { humanizeTime } from '../../utils/util';

import { store } from '../redux/AppStore';
// import { AccountActions } from '../slice/AccountSlice';
const qs = require('qs');
const tag = '[axiosSendRequest]';

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        console.log(tag, 'status_code', response?.status);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            // xóa accessToken
            // store.dispatch(AccountActions.updateState({ accessToken: null }));
        }
        return Promise.reject(error);
    },
);

/**
 * @param method: post/get/put/delete
 * @param url
 * @param params
 * @param header
 * @param notShowError: có hiển thị thông báo lỗi hay ko
 * @param httpsAgent
 * @returns {Promise<{result: string, code: number, message: string}>}
 */
export async function axiosSendRequest(
    method,
    url,
    params = null,
    header = {},
    notShowError = false,
    httpsAgent = null,
) {
    method = _.toLower(method);

    if (__DEV__) {
        console.log(
            `\n[Axios ${method}]: ${humanizeTime(undefined, 'HH:mm:ss DD/MM/YY')} \n\t url = `,
            url,
            '\n\t params = ',
            JSON.stringify(params),
            '\n\t header = ',
            header,
            `notshowError:${notShowError}`,
        );
    }

    let responseData = {
        status: 'error',
        message: 'Không xác định',
        code: 0,
    };

    const config = {
        method: method,
        url: url,
        responseType: 'json',
    };

    if (httpsAgent) {
        config.httpsAgent = httpsAgent;
    }

    config.headers = header;

    // console.log('\n\t common header: ', axios.defaults.headers.common);

    if (params) {
        if (method === 'get') {
            config.url =
                url +
                '?' +
                qs.stringify(params, {
                    arrayFormat: 'indices',
                    encode: false,
                });

            console.log('url: ', config.url);
        } else {
            config.data = params;
        }
    }

    // console.log('config: ', config);
    await axios(config)
        .then((data) => {
            responseData = data; // nhin thay gi ko
        })
        .catch((error) => {
            // console.error(error);
            console.error('Axios Exception:123 ', JSON.stringify(error));
            // console.log('Axios Exception: ', error);
            error.notShowError = notShowError;
            responseData = {
                status: 'error',
                error: error?.response?.data?.message ?? error?.response?.data?.error,
                notShowError,
            };
            // return axiosMiddleware.handleException(error);
        });

    // await axios(config)
    //     .catch((error) => {
    //         console.log('Axios Exception: ', JSON.stringify(error));
    //         error.notShowError = notShowError;
    //         return { data: { status: false, error: error, notShowError } };
    //         //return axiosMiddleware.handleException(error);
    //     })
    //     .then((response) => response.data)
    //     .then((data) => {
    //         data.notShowError = notShowError;
    //         console.log('data: ', data);
    //         // return axiosMiddleware.handleResponseMessage(data);
    //     })
    //     .then((data) => {
    //         responseData = data;
    //     });

    // if (__DEV__) {
    //     console.log(
    //         `\n[Axios Response Data] ${humanizeTime(undefined, 'HH:mm:ss DD/MM/YY')}: \n\t`,
    //         url,
    //         '\n\t',
    //         JSON.stringify(responseData),
    //         '\n',
    //     );
    // }

    // xong return ve no luon nay

    return responseData;
}

/**
 * set a field for all axios request header
 * @param {*} key
 * @param {*} value
 */
export const setAxiosHeader = (key, value) => {
    axios.defaults.headers.common[key] = value;
    console.log('[Axios]', 'Set default header', { key, value });
};

export const removeAxiosAuthorization = () => {
    delete axios.defaults.headers.common.Authorization;
};

setAxiosHeader('Accept-Encoding', 'gzip');
setAxiosHeader('Content-Type', 'application/json');
setAxiosHeader('User-Agent', 'mobile');

// const ag = new https.Agent({
//   rejectUnauthorized: false,
// });
//axios.defaults.httpsAgent = ag;
