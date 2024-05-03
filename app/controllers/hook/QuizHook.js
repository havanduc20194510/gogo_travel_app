import { useSelector } from "react-redux";

const tag = ["QuizHook"];
/**
 *
 * @returns {accessToken, accountId}
 */
export const useQuiz = () => useSelector((state) => state.quiz);
// export const getEnv = () => {
//     let envName = store?.getState().app.env ?? 'dev';
//     return _.get(env, envName);
//   };
