import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});
/**
 * Check sensor Available
 * @returns {string} sensor type FaceId | Fingerprint | Biometrics | undefine
 */
isBiometricstSensorAvailable = async () => {
  let {biometryType} = await rnBiometrics.isSensorAvailable();
  return biometryType;
};
/**
 * Check Biomestric Key Exist
 * @returns {boolean} if BiometricsKey exists true or false
 */
isBiometricsKeyExist = async () => {
  let isExist = await rnBiometrics.biometricKeysExist();
  if (isExist) {
    return true;
  } else {
    return false;
  }
};
/**
 * create Biometrics Key
 * @returns {string} return biometricskey delete if exist and create new
 */
createBiometricsKey = async () => {
  // if (isBiometricsKeyExist()) {
  //   await rnBiometrics.deleteKeys();
  // }
  let resultObject = await rnBiometrics.createKeys();
  const {publicKey} = resultObject;

  return publicKey;
};
/**
 * delete Biometrics Key
 * @returns {boolean} if BiometricsKey exists true or false
 */
deleteBiometricsKey = async () => {
  let resultObject = await rnBiometrics.deleteKeys();
  const {keysDeleted} = resultObject;

  if (keysDeleted) {
    return true;
  } else {
    return false;
  }
};
/**
 * create signature
 * @param {string} message Message show when faceId apprearent
 * @param {string} payload data to encrypt
 * @returns {string} if success data signed else null
 */
createBioMetricsSignature = async (message, payload) => {
  let resultObject = await rnBiometrics.createSignature({
    promptMessage: message,
    payload: payload,
  });
  const {success, signature} = resultObject;
  if (success) {
    return signature;
  }
  return null;
};

export default BiometricUtils = {
  createBioMetricsSignature,
  deleteBiometricsKey,
  createBiometricsKey,
  isBiometricsKeyExist,
  isBiometricstSensorAvailable,
};
