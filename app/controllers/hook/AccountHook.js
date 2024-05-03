import { useSelector } from "react-redux";

const tag = ["AccountHook"];
/**
 *
 * @returns {accessToken, accountId}
 */
export const useAccount = () => useSelector((state) => state.account.account);
// export const getEnv = () => {
//     let envName = store?.getState().app.env ?? 'dev';
//     return _.get(env, envName);
//   };
