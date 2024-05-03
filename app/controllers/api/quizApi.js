import { axiosSendRequest } from "../axios/axiosSendRequet";
import env from "../../env.json";

const _ = require("lodash");

const quizApi = {
  /**
   *
   * @param {any} params
   * @returns Object Quiz
   */
  createQuiz: async (params, accessToken) => {
    const url = `/quiz/create`;
    return await axiosSendRequest("post", env.dev.mdsHost.concat(url), params, {
      Authorization: `Bearer ${accessToken}`,
    });
  },
  getQuizToTest: async (quizId, passCode, location, accessToken) => {
    const url = `/quiz/get-quiz?quizId=${quizId}&passCode=${passCode}&location=${JSON.stringify(
      location
    )}`;
    return await axiosSendRequest(
      "get",
      env.dev.mdsHost.concat(url),
      {},
      {
        Authorization: `Bearer ${accessToken}`,
      },
      true
    );
  },
  commitQuiz: async (accountQuizId, answers, location, accessToken) => {
    const url = `/quiz/commit-quiz/${accountQuizId}`;
    return await axiosSendRequest(
      "put",
      env.dev.mdsHost.concat(url),
      {
        answers: answers,
        location: JSON.stringify(location),
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },
  download: async (quizId, accessToken) => {
    const url = `/quiz/download/${quizId}`;
    return await axiosSendRequest(
      "get",
      env.dev.mdsHost.concat(url),
      {},
      {
        Authorization: `Bearer ${accessToken}`,
      },
      true
    );
  },
  commitQuizOffline: async (quizId, answers, accessToken) => {
    const url = `/quiz/commit-quiz-offline/${quizId}`;
    return await axiosSendRequest(
      "put",
      env.dev.mdsHost.concat(url),
      {
        cypherText: answers,
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
  },
};

export default quizApi;
