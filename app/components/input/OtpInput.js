import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import OTPInputView from 'saymee-react-native-otp-input';
import AppColors from 'app/assets/AppColors';
import Styles from 'app/shared/Styles';
OtpInput.propTypes = {
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  marginHorizontal: PropTypes.number,
  height: PropTypes.number,
  onCodeFilled: PropTypes.func,
  onCodeChange: PropTypes.func,
  code: PropTypes.string,
  boxHighLightColor: PropTypes.string,
  errorMessage: PropTypes.string,
  pinCount: PropTypes.number,
  clearInput: PropTypes.bool,
  onFocus: PropTypes.func,
  myRef: PropTypes.any,
};

OtpInput.defaultProps = {
  backgroundColor: null,
  boxHighLightColor: null,
  onPress: () => {},
  marginHorizontal: 10,
  height: 70,
  onCodeFilled: () => {},
  onCodeChange: () => {},
  onFocus: () => {},
  code: '',
  errorMessage: '',
  clearInput: false,
  pinCount: 6,
  myRef: null,
};

/**
 * @document: https://git.mdcgate.com:8443/myx/my-x-mobile/-/issues/4
 * @param {int} marginHorizontal
 * @param {int} height
 * @param {string} backgroundColor
 * @param {(code)=>{}} onCodeFilled
 * @param {string} boxHighLightColor
 * @param {string} errorMessage
 * @param {int} pinCount
 * @returns {JSX.Element}
 * @constructor
 */
function OtpInput({
  marginHorizontal,
  height,
  backgroundColor,
  onCodeFilled,
  boxHighLightColor,
  errorMessage,
  code,
  onCodeChange,
  pinCount,
  clearInput,
  onFocus,
  myRef,
}) {
  const tag = 'OtpInput';
  const colors = AppColors;
  return (
    <View
      style={{
        // ...Styles.Layout.columnCenter,
        backgroundColor: backgroundColor,
        // paddingBottom: 10,
      }}>
      <OTPInputView
        style={{
          height: height,

          marginHorizontal: marginHorizontal,
        }}
        myRef={myRef}
        pinCount={pinCount}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => {
          onCodeChange(code);
        }}
        clearInputs={clearInput}
        onCodeFilled={code => {
          onCodeFilled(code);
        }}
        onFocus={onFocus}
        editable={true}
        selectionColor={boxHighLightColor ? boxHighLightColor : colors.primary}
        autoFocusOnLoad={false}
        codeInputFieldStyle={{
          ...Styles.Text.primary,
          borderWidth: 2,
          borderRadius: 8,
          width: 36,
          height: 40,
          borderColor:
            errorMessage.length > 0 ? AppColors.error : colors.border,
        }}
        codeInputHighlightStyle={{
          borderColor: boxHighLightColor ? boxHighLightColor : colors.primary,
        }}
        // onCodeFilled={code => {
        //   // console.log(`Code is ${code}, you are good to go!`);
        //   onCodeFilled(code);
        // }}
      />
      {errorMessage.length > 0 ? (
        <View style={{...Styles.Layout.columnCenter, paddingBottom: 5}}>
          <Text style={Styles.Text.error}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
}
export default OtpInput;
