import { axiosSendRequest } from "../axios/axiosSendRequet";
import env from "../../env.json";

const _ = require("lodash");
//const FormData = require('form-data');

const statisticApi = async (accessToken) => {
  return await axiosSendRequest(
    "get",
    env.dev.mdsHost.concat("/statistic/student"),
    {},
    { Authorization: `Bearer ${accessToken}` }
  );
};

export default statisticApi;
