/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CountdownBannerProps } from "./banner";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import _ from "lodash";
import AutoHeightImage from "react-native-auto-height-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import Const from "../Const";
import Utils from "../../utils/util";
import Styles from "../Styles";
import AppColors from "../../assets/AppColors";

const tag = "[CountdownBanner]";
/**
 *
 * @param {Object} param
 * @param {React.MutableRefObject<{show(props:CountdownBannerProps):void, hide():void}>} param.bannerRef
 * @param {boolean} param.forceClose
 */
export default function CountdownBanner({ bannerRef, forceClose }) {
  const [visible, setVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const insets = useSafeAreaInsets();

  /**
   * @type {[CountdownBannerProps, React.Dispatch<React.SetStateAction<CountdownBannerProps>>]}
   */
  const [props, setProps] = useState({});

  const [timer, setTimer] = useState(0);
  const [timerAnim, setTimerAnim] = useState(0);

  /* force close modal */
  useEffect(() => {
    if (visible) {
      if (forceClose) {
        setVisible(false);
      }
    }
  }, [forceClose, visible]);

  // useEffect(() => {
  //   if (!visible) {
  //     store?.dispatch(
  //       setForceCloseModal({
  //         scaleToast: false,
  //         alert: false,
  //         indicator: false,
  //       })
  //     );
  //   }
  // }, [visible]);

  // useEffect(() => {
  //   bannerRef.current = {
  //     show(props) {
  //       setProps({ ...props });

  //       setTimeout(() => setVisible(true), 250);
  //     },
  //     hide() {
  //       setVisible(false);
  //     },
  //   };
  // }, [bannerRef]);

  const onDismiss = useCallback(() => {
    if (!timer) {
      setVisible(false);
      if (_.isFunction(props.onDismiss)) {
        props.onDismiss();
      }
    }
  }, [timer, props]);

  let timerRef = useRef();
  let timerAnimRef = useRef();
  useEffect(() => {
    console.log("countdown", props.banner?.countdown);
    if (Utils.isValidNumber(props.banner?.countdown)) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimer(_.toNumber(props.banner?.countdown));
      timerRef.current = setInterval(() => {
        setTimer((sec) => {
          if (sec <= 0) {
            clearInterval(timerRef.current);
            return 0;
          }

          return sec - 1;
        });
      }, 1000);

      if (timerAnimRef.current) {
        clearInterval(timerAnimRef.current);
      }
      setTimerAnim(_.toNumber(props.banner?.countdown));
      timerAnimRef.current = setInterval(() => {
        setTimerAnim((sec) => {
          if (sec <= 0) {
            clearInterval(timerAnimRef.current);
            return 0;
          }

          return sec - 0.25;
        });
      }, 250);
    }
  }, [imageLoaded]);

  useEffect(() => {
    if (!visible) {
      setProps({ banner: null, onDismiss: undefined });
      setImageLoaded(false);
      setTimer(0);
      setTimerAnim(0);
    }
  }, [visible]);

  // console.log({timer});

  return (
    <Modal
      animationType="none"
      visible={visible}
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={timer ? () => {} : onDismiss}
      transparent
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback
          disabled
          //   onPress={onDismiss}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity disabled>
              {/* Close Button */}
              {!timer ? (
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    top: -40,
                    //   right: Const.space_12,
                  }}
                >
                  <TouchableOpacity
                    onPress={onDismiss}
                    style={{
                      padding: Const.space_2,
                      borderWidth: 1,
                      borderColor: AppColors.white,
                      borderRadius: 100,
                    }}
                  >
                    {/* <Image
                      source={icons.icClose}
                      resizeMode="contain"
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: AppColors.white,
                      }}
                    /> */}
                    <Text
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: AppColors.white,
                      }}
                    >
                      image Icons
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {/* timer */}
              {timer ? (
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    top: -40,
                    //   right: Const.space_12,
                  }}
                >
                  <Progress.Circle
                    color={AppColors.white}
                    unfilledColor={"#00000000"}
                    thickness={2}
                    borderWidth={0}
                    strokeCap="round"
                    animated
                    progress={timerAnim / props.banner?.countdown}
                    // indeterminate
                    fill={"#00000000"}
                    showsText
                    size={34}
                    formatText={(progress) => {
                      return (
                        <View>
                          <Text
                            style={[
                              Styles.Text.primary(),
                              { color: AppColors.white },
                            ]}
                          >
                            {Math.ceil(timer)}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : null}
              {/* image */}
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  if (props.banner?.link) {
                    // NavigatorUtil.gotoDeepLink(props.banner.link);
                    console.log("go to deep link");
                  }
                }}
                style={{
                  borderRadius: Const.space_20,
                  overflow: "hidden",
                  width: Const.fullScreenWidth - Const.space_12 * 2,
                }}
              >
                <AutoHeightImage
                  onLoadEnd={() => {
                    console.log("Banner loaded");
                    if (props.banner?.image) {
                      setImageLoaded(true);
                    }
                  }}
                  source={{ uri: props.banner?.image }}
                  resizeMode="contain"
                  width={Const.fullScreenWidth - Const.space_12 * 2}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

/**
 * @type {React.RefObject<{show(props:CountdownBannerProps):void, hide():void}>}
 */
export const GlobalCountdownBannerRef = React.createRef();
