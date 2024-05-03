import AsyncStorage from "@react-native-async-storage/async-storage";
import { sha256 } from "js-sha256";
import _, { isNumber } from "lodash";
import moment from "moment";

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
      let temp = item.split("_");
      if (temp[0] == "quiz" && isNumber(Number(temp[1]))) filterKeys.push(item);
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
      let temp = item.split("_");
      if (temp[0] == "answer" && isNumber(Number(temp[1])))
        filterKeys.push(item);
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
export function humanizeTime(inputTime, formatter = "HH:mm - DD/MM/YYYY") {
  if (inputTime === undefined) {
    return "";
  }

  if (!moment(inputTime).isValid()) {
    return inputTime;
  }
  return moment(inputTime).format(formatter);
}
