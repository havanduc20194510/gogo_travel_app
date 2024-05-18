import AsyncStorage from '@react-native-async-storage/async-storage';
import { sha256 } from 'js-sha256';
import _, { isNumber } from 'lodash';
import moment from 'moment';

const Utils = {
    // sha256
    sha256: (text) => {
        return sha256(text);
    },
    rsa: (accountId) => {
        return {
            publicKey: accountId,
            privateKey: accountId,
        };
    },
    getAllKeyAsyncStorage: async () => {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    },
    /**
     *
     * @returns all downloaded quiz
     */
    getAllValueQuizAsyncStorage: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const filterKeys = [];
        _.toArray(keys).forEach((item) => {
            let temp = item.split('_');
            if (temp[0] == 'quiz' && isNumber(Number(temp[1]))) filterKeys.push(item);
        });
        const values = await AsyncStorage.multiGet(filterKeys);

        return values;
    },
    /**
     *
     * @returns all answer
     */
    getAllValueAnswerAsyncStorage: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const filterKeys = [];
        _.toArray(keys).forEach((item) => {
            let temp = item.split('_');
            if (temp[0] == 'answer' && isNumber(Number(temp[1]))) filterKeys.push(item);
        });
        const values = await AsyncStorage.multiGet(filterKeys);

        return values;
    },
    /**
     *
     * @param {*} num
     * @returns
     */
    isValidNumber: (num) => {
        return !isNaN(parseInt(num));
    },
};

export default Utils;
export function humanizeTime(inputTime, formatter = 'HH:mm - DD/MM/YYYY') {
    if (inputTime === undefined) {
        return '';
    }

    if (!moment(inputTime).isValid()) {
        return inputTime;
    }
    return moment(inputTime).format(formatter);
}

export function isValidNumber(param) {
    if (((!_.isString(param) || _.isEmpty(param)) && !_.isNumber(param)) || _.isNull(param) || _.isUndefined(param)) {
        return false;
    }
    return !isNaN(param) && isFinite(param);
}

export function formatCurrencyK(amount, moreThanAThousandOnly = false) {
    if (!isValidNumber(amount)) {
        return amount;
    }

    amount = _.toNumber(amount);

    if (moreThanAThousandOnly) {
        if (amount < 1000) {
            return String(amount);
        }
    }

    var strPrice;
    var temp = _.toString(amount);
    if (temp.endsWith('000')) {
        strPrice = temp.substring(0, temp.length - 3) + 'K';
        temp = strPrice;
    } else if (temp.endsWith('00')) {
        if (temp.length === 3) {
            temp = '0.' + temp.substring(0, temp.length - 2) + 'K';
        } else if (temp.length >= 4) {
            temp = temp.substring(0, temp.length - 3) + '.' + temp.substring(temp.length - 3, temp.length - 2) + 'K';
        }
    }
    return temp;
}

export function formatCurrency(amount, hideCurrencySign = false) {
    if (!isValidNumber(amount)) {
        return amount;
    }
    amount = _.toNumber(amount);

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        signDisplay: 'never',
        currency: 'VND',
        compactDisplay: 'short',
    })
        .format(amount)
        .replace('₫', '')
        .trim()
        .concat(hideCurrencySign ? '' : ' đ');
}
