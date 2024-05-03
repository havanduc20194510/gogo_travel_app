import AppColors from 'app/assets/AppColors';
import Const from 'app/shared/const/Const';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ConfirmDialogProps} from './types';
import _ from 'lodash';
import Styles, {FontSize} from 'app/shared/Styles';
import {store} from 'app/controllers/redux/AppStore';
import {setForceCloseModal} from 'app/controllers/slice/ModalSlice';
import HighlightTouchable from 'app/shared/components/buttons/custom/HighlightTouchable';
import AppIcons from '../../../../assets/AppIcons';

const TouchableOpacity = RNTouchableOpacity;
const tag = '[ConfirmDialog]';

/**

 * @description Place this component in root stack
 *
 * @param {Object} param
 * @param {React.MutableRefObject<{show:(props:ConfirmDialogProps)=>void,hide?:()=>void}>} param.dialogRef controller of this dialog
 * @param {boolean} param.forceClose
 *
 */
const ConfirmDialog = ({dialogRef, forceClose}) => {
  const icons = AppIcons;
  const colors = AppColors;
  const [visible, setVisible] = useState(false);
  const animHeight = useRef(new Animated.Value(Const.fullScreenHeight)).current;

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
      store?.dispatch(
        setForceCloseModal({
          scaleToast: false,
          alert: false,
          indicator: false,
        }),
      );
    }
  }, [visible]);

  /*  */
  /**
   * @type {[ConfirmDialogProps,React.Dispatch<React.SetStateAction<ConfirmDialogProps>>]}
   */
  const [props, setProps] = useState({});

  const slideInFromBottom = useMemo(() => {
    if (Const.os == 'ios') {
      return Animated.spring(animHeight, {
        toValue: Const.fullScreenHeight / 2 - 150,
        velocity: 23,
        tension: 40,
        friction: 18,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    } else if (Const.os == 'android') {
      return Animated.timing(animHeight, {
        toValue: Const.fullScreenHeight / 2 - 150,
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
        if (_.isArray(props.options)) {
          props.options = props.options.slice(0, 2);
        }
        setProps({
          title: undefined,
          message: undefined,
          options: [],
          onDimiss: undefined,
          titleStyle: undefined,
          messageStyle: undefined,
          onOpen: undefined,
          ...props,
          dismissable:
            props.dismissable !== undefined && props.dismissable !== null
              ? !!props.dismissable
              : true,
        });
        if (props.message && props.title) {
          setTimeout(() => setVisible(!forceClose && true));
        }
      },
      hide() {
        onDismiss(false);
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

      hideToBottom.start(({finished}) => {
        if (isDismiss && _.isFunction(props.onDimiss)) {
          props.onDimiss();
        }
      });
      setTimeout(() => setVisible(false), 225);
    },
    [props, hideToBottom],
  );

  return (
    <Modal
      animationType="none"
      visible={visible && !forceClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={props.dismissable ? onDismiss : () => {}}
      transparent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          flex: 1,
        }}>
        <TouchableWithoutFeedback
          onPress={props.dismissable ? onDismiss : () => {}}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  // maxHeight: Const.fullScreenHeight / 3,
                  transform: [
                    {
                      translateY: animHeight,
                    },
                  ],
                  marginHorizontal: Const.space_14,
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
                      flexShrink: 1,
                    },
                  ]}>
                  {/* title */}
                  {props.title ? (
                    <Text
                      style={[
                        Styles.Text.title,
                        {
                          color: AppColors.black,
                          fontSize: FontSize.s_17,
                          lineHeight: Const.space_28,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          flexShrink: 1,
                          fontWeight: '700',
                        },
                        props.titleStyle,
                      ]}>
                      {props.title}
                    </Text>
                  ) : null}
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
                    {_.isString(props.message) && !_.isEmpty(props.message) ? (
                      <Text
                        numberOfLines={7}
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
                    ) : null}
                    {React.isValidElement(props.message) ? props.message : null}
                    {_.isFunction(props.message) ? props.message() : null}
                  </View>
                  {/* Button */}
                  <View
                    style={{
                      // flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-around',
                      paddingHorizontal: Const.space_16,
                      marginTop: Const.space_24,
                    }}>
                    {_.isArray(props.options) &&
                      props.options.length &&
                      props.options.map((option, index, arr) => {
                        let TouchableWrapper =
                          option.type == 'cancel'
                            ? HighlightTouchable
                            : TouchableOpacity;
                        return (
                          <TouchableWrapper
                            delayPressIn={1}
                            key={index}
                            onPress={() => {
                              if (_.isFunction(option.onPress)) {
                                setTimeout(() => option.onPress(), 300);
                              }
                              onDismiss(false);
                            }}
                            style={[
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: Const.space_12,
                                borderRadius: Const.space_22,
                              },
                              !option.type || option.type == 'default'
                                ? {backgroundColor: colors.primary}
                                : undefined,
                              option.type == 'cancel'
                                ? {
                                    borderColor: colors.primary,
                                    borderWidth: Const.space_1,
                                  }
                                : undefined,
                              index <= arr.length - 1 && index > 0
                                ? {marginTop: Const.space_10}
                                : undefined,
                            ]}>
                            <Text
                              style={[
                                Styles.Text.primary,
                                {
                                  textAlign: 'center',
                                  textAlignVertical: 'center',
                                  lineHeight: Const.space_20,
                                  flexWrap: 'wrap',
                                  fontWeight: '600',
                                },
                                !option.type || option.type == 'default'
                                  ? {color: AppColors.white}
                                  : undefined,
                                option.type == 'cancel'
                                  ? {
                                      color: AppColors.primary,
                                    }
                                  : undefined,
                                option.titleStyle,
                              ]}>
                              {option.title}
                            </Text>
                          </TouchableWrapper>
                        );
                      })}
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
                    display: props.dismissable ? 'flex' : 'none',
                  }}>
                  <Image
                    source={icons.icClose}
                    style={{width: 22, height: 22}}
                  />
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;

/**
 * @type {React.RefObject<{show:(props:ConfirmDialogProps)=>void}>}
 */
export const GlobalConfirmDialogRef = createRef();
