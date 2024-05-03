import { axiosSendRequest } from "../axios/axiosSendRequet";
import env from "../../env.json";

const classApi = {
  detailClass: async (classId, accessToken) => {
    const url = `/class/detail/${classId}`;
    return await axiosSendRequest(
      "get",
      env.dev.mdsHost.concat(url),
      {},
      { Authorization: `Bearer ${accessToken}` }
    );
  },
  detailClassOfStudent: async (classId, accessToken) => {
    const url = `/class/detail-of-student/${classId}`;
    return await axiosSendRequest(
      "get",
      env.dev.mdsHost.concat(url),
      {},
      { Authorization: `Bearer ${accessToken}` }
    );
  },
  findClass: async (accessToken) => {
    const url = `/class/find-class-of-student`;
    return await axiosSendRequest(
      "get",
      env.dev.mdsHost.concat(url),
      {},
      { Authorization: `Bearer ${accessToken}` }
    );
  },
};

export default classApi;
