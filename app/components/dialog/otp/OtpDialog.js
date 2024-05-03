import OTPInputView from 'saymee-react-native-otp-input';
import AppColors from 'app/assets/AppColors';
import AppIcons from 'app/assets/AppIcons';
import Const from 'app/shared/const/Const';
import Styles, {FontSize} from 'app/shared/Styles';
import {isValidNumber} from 'app/shared/utils/AppUtil';
import {useAppState} from '../../../../controllers/hook/AppHook';
import _ from 'lodash';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {OTPDialogProps, OTPDialogController} from './types';
import Clipboard from '@react-native-clipboard/clipboard';
import {setForceCloseModal} from 'app/controllers/slice/ModalSlice';
import {useDispatch} from 'react-redux';

const tag = '[OtpDialog]';

/**
 * @document: https://git.mdcgate.com:8443/myx/my-x-mobile/-/issues/9
 * @description Place this component in root stack
 *
 * @example example use see below
 * @link [example](../../../../../screens/test/shared_component/SonSharedComponent.js)
 *
 * @param {Object} param
 * @param {React.MutableRefObject<OTPDialogController>} param.dialogRef controller of this dialog
 * @param {boolean} param.forceClose
 *
 */
const OtpDialog = ({dialogRef, forceClose}) => {
  const dispatch = useDispatch();
  /* theme */
  const [visible, setVisible] = useState(false);
  const animHeight = useRef(new Animated.Value(Const.fullScreenHeight)).current;
  /*  */
  /**
   * @type {[OTPDialogProps,React.Dispatch<React.SetStateAction<OTPDialogProps>>]}
   */
  const [props, setProps] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const otpInputRef = useRef();

  /* force close modal */
  useEffect(() => {
    if (visible) {
      if (forceClose) {
        setVisible(false);
      }
    }
  }, [forceClose, visible]);

  useEffect(() => {
    if (!visible) {
      dispatch(
        setForceCloseModal({
          confirmDialog: false,
          scaleToast: false,
          alert: false,
          indicator: false,
        }),
      );
    }
  }, [dispatch, visible]);
  useEffect(() => {
    if (otpInputRef && otpInputRef.current) {
      otpInputRef.current.focusField(0);
    }
  }, [otpInputRef]);

  const slideInFromBottom = useMemo(() => {
    if (Const.os == 'ios') {
      return Animated.spring(animHeight, {
        toValue: Const.fullWindowHeight / 2 - 200,
        velocity: 23,
        tension: 40,
        friction: 18,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    } else if (Const.os == 'android') {
      return Animated.timing(animHeight, {
        toValue: Const.fullWindowHeight / 2 - 200,
        duration: 0,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    }
  }, [animHeight]);

  const hideToBottom = useMemo(() => {
    if (Const.os == 'ios') {
      return Animated.spring(animHeight, {
        toValue: Const.fullScreenHeight,
        velocity: 13,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    } else if (Const.os == 'android') {
      return Animated.timing(animHeight, {
        toValue: Const.fullScreenHeight,
        duration: 0,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    }
  }, [animHeight]);

  useEffect(() => {
    if (visible) {
      slideInFromBottom.start(({finished}) => {
        if (finished) {
          console.log(tag, 'opened', props);
          if (_.isFunction(props.onOpen)) {
            props.onOpen();
          }
        }
      });
    } /* else if (!visible) {
      hideToBottom.start();
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    dialogRef.current = {
      show(props) {
        setProps({
          message: undefined,
          title: undefined,
          onDimiss: undefined,
          messageStyle: undefined,
          onConfirm: undefined,
          onOpen: undefined,
          onResendPress: undefined,
          timeout: undefined,
          titleStyle: undefined,
          pinCount: undefined,
          confirmTitle: undefined,
          errorColor: AppColors.error,
          highlightColor: AppColors.primary,
          timeoutRemindPlaceholder: undefined,
          resendButtonTitle: undefined,
          resendMessage: undefined,
          pasteFromClipboardMessage: undefined,
          closeTitle: undefined,
          ...props,
        });
        if (props.title) {
          setOtp('');
          setErrorMessage('');
          setTimeout(() => setVisible(!forceClose && true));
          setIsSubmit(false);
        }
      },
      hide() {
        onDismiss(false);
      },
      update(otp) {
        setOtp(otp);
      },
    };
  }, [dialogRef, onDismiss, forceClose]);

  const onDismiss = useCallback(
    /**
     *
     * @param {boolean} isDismiss
     */
    (isDismiss = true) => {
      isDismiss = !!isDismiss;
      Keyboard.dismiss();

      hideToBottom.start(({finished}) => {
        if (isDismiss && _.isFunction(props.onDimiss)) {
          props.onDimiss();
        }
      });
      // setTimeout(() => setVisible(false), 0);

      // props.onDimiss();
      setVisible(false);
    },

    [props, hideToBottom],
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef(setInterval(() => {}, 0));
  const [otp, setOtp] = useState('');

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  /* keyboard hide */
  useEffect(
    () =>
      Keyboard.addListener('keyboardDidHide', () => setIsKeyboardShow(false))
        .remove,
    [],
  );

  /* keyboard show */
  useEffect(
    () =>
      Keyboard.addListener('keyboardDidShow', () => setIsKeyboardShow(true))
        .remove,
    [],
  );

  /* bộ đếm */
  useEffect(() => {
    if (isValidNumber(props.timeout) && visible) {
      setTimer(props.timeout);
    }
  }, [props.timeout, visible]);

  useEffect(() => {
    if (isValidNumber(props.timeout) && props.timeout === timer) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      timerIntervalRef.current = setInterval(() => {
        setTimer(time => {
          if (time <= 1) {
            clearInterval(timerIntervalRef.current);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
  }, [props, timer]);

  /**
   * reset otp
   */
  const reset = useCallback(() => {
    if (isValidNumber(props.timeout)) {
      setTimer(props.timeout);
    }

    setErrorMessage('');
    setOtp('');
    if (otpInputRef && otpInputRef.current) {
      otpInputRef.current.focusField(0);
    }
    if (_.isFunction(props.onResendPress)) {
      props.onResendPress();
    }
  }, [props]);

  const isConfirmDisabled = useMemo(
    () => !otp || _.isEmpty(otp) || props.pinCount != otp.length,
    [props, otp],
  );

  /* reminder */
  const exactReminderMessage = useCallback(
    /**
     *
     * @param {string} placeholder
     * @param {number} timer
     */
    (placeholder, timer) => {
      let [part1, part2] = placeholder.split('{{timeout}}');

      return `${part1}${timer}${part2}`;
    },
    [],
  );

  /* confirm */
  const onConfirm = useCallback(
    async code => {
      if (isKeyboardShow) {
        Keyboard.dismiss();
        setIsKeyboardShow(false);
      }
      setIsSubmit(true);

      let [rs] = await Promise.all([
        props.onConfirm(code ?? otp) /* sleep(0) */,
      ]);

      setIsSubmit(false);

      if (!rs.error || _.isEmpty(rs.error)) {
        onDismiss(false);
        return;
      }

      setErrorMessage(rs.error);
    },
    [props, otp, isKeyboardShow, onDismiss],
  );

  /* remove error on re-type */
  useEffect(() => {
    if (errorMessage && isKeyboardShow) {
      setErrorMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, isKeyboardShow]);

  /* clipboard detection */
  const [clipboardData, setClipboardData] = useState('');
  const appState = useAppState();

  useEffect(() => {
    if (visible && appState === 'active') {
      (async function () {
        let data = await Clipboard.getString();

        const regexp = new RegExp(`^\\d{${props.pinCount}}$`);

        if (!!data && !_.isEmpty(data) && regexp.test(data) && data != otp) {
          console.log(tag, 'Clipboard otp detection', data);
          setClipboardData(data);
        } else {
          setClipboardData('');
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, appState]);

  /* paste from clipboard visible */
  const showClipboardSuggestion = useMemo(
    () =>
      props.pasteFromClipboardMessage &&
      !_.isEmpty(props.pasteFromClipboardMessage) &&
      !!clipboardData &&
      !_.isEmpty(clipboardData) &&
      visible &&
      isKeyboardShow &&
      clipboardData !== otp,
    [clipboardData, visible, isKeyboardShow, otp, props],
  );

  const animY = useRef(new Animated.Value(0)).current;

  const animYInterpolate = animY.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const pasteClipboardSlideIn = useMemo(() => {
    if (Const.os == 'ios') {
      return Animated.spring(animY, {
        toValue: 1,
        velocity: 23,
        tension: 40,
        friction: 18,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    } else if (Const.os == 'android') {
      return Animated.timing(animY, {
        toValue: 1,
        duration: 225,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [animY]);

  const pasteClipboardHide = useMemo(() => {
    return Animated.spring(animY, {
      toValue: 0,
      velocity: 13,
      useNativeDriver: false,
      easing: Easing.linear,
    });
  }, [animY]);

  useEffect(() => {
    if (showClipboardSuggestion) {
      pasteClipboardSlideIn.start();
    } else {
      pasteClipboardHide.start();
    }
  }, [showClipboardSuggestion, pasteClipboardHide, pasteClipboardSlideIn]);

  return (
    <Modal
      animationType="none"
      visible={visible}
      statusBarTranslucent
      presentationStyle="overFullScreen"
      // onDismiss={onDismiss}
      onRequestClose={onDismiss}
      transparent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          flex: 1,
        }}>
        <TouchableWithoutFeedback
          onPress={onDismiss}
          disabled
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}>
            <KeyboardAvoidingView
              keyboardShouldPersistTaps="handled"
              behavior={Const.os == 'ios' ? 'padding' : 'padding'}>
              <View style={{height: '100%'}}>
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={{
                      // maxHeight: Const.fullScreenHeight / 3,
                      transform: [
                        {
                          translateY: animHeight,
                        },
                      ],
                      marginHorizontal: Const.space_20,
                    }}>
                    <View
                      style={[
                        {
                          backgroundColor: AppColors.white,
                          alignItems: 'center',
                          paddingTop: 36,
                          borderRadius: Const.space_12,
                          paddingBottom: Const.space_24,
                        },
                        {
                          width: '100%',
                        },
                      ]}>
                      {/* title */}
                      <Text
                        style={[
                          Styles.Text.title,
                          {
                            textAlign: 'center',
                          },
                          props.titleStyle,
                        ]}>
                        {props.title}
                      </Text>
                      {/* message */}
                      <View
                        style={[
                          {
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: Const.space_16,
                            marginTop: Const.space_16,
                            flexShrink: 1,
                          },
                        ]}>
                        <Text
                          style={[
                            Styles.Text.primary,
                            {
                              textAlignVertical: 'center',
                              flexShrink: 1,
                              flexWrap: 'wrap',
                              textAlign: 'center',
                            },
                            props.messageStyle,
                          ]}>
                          {props.message}
                        </Text>
                      </View>
                      {/* otp input */}
                      <View
                        style={{
                          width: '100%',
                          paddingHorizontal: Const.space_1,
                        }}>
                        <OTPInputView
                          onCodeFilled={code => {
                            console.log('[OtpDialog] onCodeFilled:', code);
                            onConfirm(code);
                          }}
                          myRef={otpInputRef}
                          onCodeChanged={setOtp}
                          keyboardType="number-pad"
                          code={otp}
                          clearInputs={otp?.length > 0 ? false : true}
                          // autoFocusOnLoad={Const.os == 'ios'} //bugs on android detect
                          autoFocusOnLoad
                          style={{
                            height: 60,
                            maxWidth:
                              props.pinCount * 35.65 +
                              (props.pinCount - 1) * Const.space_12,
                            alignSelf: 'center',
                          }}
                          pinCount={props.pinCount}
                          selectionColor={props.highlightColor}
                          codeInputFieldStyle={{
                            ...Styles.Text.primary,
                            borderWidth: 1,
                            height: 40,
                            width: 35.65,
                            borderColor:
                              errorMessage && !_.isEmpty(errorMessage)
                                ? props.errorColor
                                : AppColors.border,
                            borderRadius: Const.space_12,
                            paddingTop: Const.os == 'ios' ? 6 : 0,
                            paddingBottom: Const.os == 'android' ? 4 : 0,
                          }}
                          codeInputHighlightStyle={{
                            borderColor: props.highlightColor,
                          }}
                        />

                        {/* error message */}
                        {errorMessage && !_.isEmpty(errorMessage) && (
                          <View
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={[
                                Styles.Text.primary,
                                {color: props.errorColor},
                              ]}>
                              {errorMessage}
                            </Text>
                          </View>
                        )}
                        {/* timer reminder */}
                        {isValidNumber(props.timeout) &&
                          props.timeoutRemindPlaceholder && (
                            <View
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: Const.space_4,
                              }}>
                              <Text style={[Styles.Text.primary]}>
                                {exactReminderMessage(
                                  props.timeoutRemindPlaceholder,
                                  timer,
                                )}
                              </Text>
                            </View>
                          )}
                        {/* resend */}
                        {props.resendMessage &&
                          !_.isEmpty(props.resendMessage) && (
                            <View
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: Const.space_16,
                              }}>
                              <Text
                                style={
                                  ([Styles.Text.primary],
                                  {
                                    marginRight: Const.space_4,
                                    color: AppColors.primary,
                                  })
                                }>
                                {props.resendMessage}
                              </Text>
                              {/* button */}
                              <TouchableOpacity
                                hitSlop={{
                                  bottom: 15,
                                  left: 15,
                                  right: 15,
                                  top: 15,
                                }}
                                onPress={reset}
                                activeOpacity={0.5}>
                                <Image
                                  source={props.resendIcon ?? AppIcons.icReload}
                                  style={{
                                    height: 14,
                                    width: 14,
                                    tintColor: AppColors.primary,
                                  }}
                                  resizeMode="contain"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                      </View>
                      {/* Button */}
                      {/* confirm */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          paddingHorizontal: Const.space_16,
                          marginTop: Const.space_24,
                        }}>
                        <TouchableOpacity
                          activeOpacity={isKeyboardShow ? 1 : undefined}
                          disabled={isSubmit || isConfirmDisabled}
                          onPress={() => onConfirm(otp)}
                          style={[
                            {
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 1,
                              height: Const.heightButton,
                              borderRadius: Const.space_22,
                              backgroundColor: isConfirmDisabled
                                ? AppColors.lightgrey
                                : AppColors.primary,
                            },
                          ]}>
                          <Text
                            style={[
                              Styles.Text.primary,
                              {
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                lineHeight: Const.space_20,
                                fontWeight: '600',
                                color: isConfirmDisabled
                                  ? AppColors.darkgray
                                  : AppColors.labelColor,
                              },
                            ]}>
                            {props.confirmTitle}
                          </Text>
                        </TouchableOpacity>
                        {isSubmit ? (
                          <ActivityIndicator
                            size={'small'}
                            color={AppColors.white}
                            style={{
                              right: Const.space_40,
                              position: 'absolute',
                              alignSelf: 'center',
                            }}
                          />
                        ) : null}
                      </View>
                      {/* goback */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          paddingHorizontal: Const.space_16,
                          marginTop: Const.space_12,
                        }}>
                        <TouchableOpacity
                          activeOpacity={isKeyboardShow ? 1 : undefined}
                          onPress={onDismiss}
                          style={[
                            {
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 1,
                              height: Const.heightButton,
                              borderRadius: Const.space_22,
                              borderColor: AppColors.primary,
                              borderWidth: 1,
                              backgroundColor: AppColors.white,
                            },
                          ]}>
                          <Text
                            style={[
                              Styles.Text.primary,
                              {
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                lineHeight: Const.space_20,
                                fontWeight: '600',
                                color: AppColors.primary,
                              },
                            ]}>
                            {props.closeTitle ?? 'Đóng'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* close button */}
                    <TouchableOpacity
                      onPress={onDismiss}
                      style={{
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        top: Const.space_20,
                        right: Const.space_24,
                      }}>
                      <Image
                        source={AppIcons.icClose}
                        style={{width: 22, height: 22}}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                </TouchableWithoutFeedback>
                {/* stick to end of screen if detec clipboard */}
                <Animated.View
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: AppColors.white,
                    borderTopWidth: 1,
                    borderTopColor: AppColors.lightgrey,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    // top: Const.fullScreenHeight - 430,
                    bottom: 0,
                    display: showClipboardSuggestion ? 'flex' : 'none',
                    transform: [{translateY: animYInterpolate}],
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setOtp(clipboardData);
                      onConfirm(clipboardData);
                    }}
                    style={{
                      flex: 1,
                      height: '100%',
                      width: '100%',
                      alignItems: 'center',
                      paddingVertical: Const.space_4,
                    }}>
                    <Text style={[Styles.Text.primary, {fontWeight: '600'}]}>
                      {props.pasteFromClipboardMessage}
                    </Text>
                    <Text
                      style={[Styles.Text.primary, {marginTop: Const.space_2}]}>
                      {clipboardData}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default OtpDialog;

/**
 * @type {React.RefObject<{show:(props:OTPDialogProps)=>void}>}
 */
export const GlobalOTPDialogRef = createRef();
