import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default {
  // padding, margin
  space_0: 0,
  space_1: 1,
  space_2: 2,
  space_3: 3,
  space_4: 4,
  space_5: 5,
  space_6: 6,
  space_7: 7,
  space_8: 8,
  space_9: 9,
  space_10: 10,
  space_11: 11,
  space_12: 12,
  space_13: 13,
  space_14: 14,
  space_15: 15,
  space_16: 16,
  space_17: 17,
  space_18: 18,
  space_19: 19,
  space_20: 20,
  space_21: 21,
  space_22: 22,
  space_23: 23,
  space_24: 24,
  space_25: 25,
  space_26: 26,
  space_27: 27,
  space_28: 28,
  space_29: 29,
  space_30: 30,
  space_32: 32,
  space_35: 35,
  space_37: 37,
  space_39: 39,
  space_40: 40,
  space_44: 44,
  space_48: 48,
  space_50: 50,
  space_57: 57,
  space_60: 60,
  space_69: 69,
  space_72: 72,
  space_80: 80,
  space_90: 90,
  space_100: 100,
  space_120: 120,
  space_124: 124,
  space_130: 130,
  space_138: 138,
  space_140: 140,
  space_160: 160,
  space_180: 180,
  space_200: 200,
  // screen
  fullScreenHeight: Dimensions.get("screen").height,
  fullScreenWidth: Dimensions.get("screen").width,
  fullWindowHeight: Dimensions.get("window").height,
  fullWindowWidth: Dimensions.get("window").width,
  navigationBarHeight:
    Dimensions.get("screen").height - Dimensions.get("window").height,
  statusBarHeight: getStatusBarHeight(),
  // os
  os: Platform.OS,
  // default opacity
  defaultActiveOpacity: 0.7,
  defaultButtonActiveOpacity: 0.5,
  //fixed height
  headerHeight: 89,
  //mai: button
  widthButton: 200,
  heightButton: 44,
  widthBackButton: 40,
  //default tabbar height
  heightTabBar: 180,
  iconSize: 32, //  hầu hết các icon có kích thước là 32
  borderPage: 20, // border 2 góc trên gần header
  borderHome: 35, //  border 2 góc dưới ở các màn Home
  paddingPage: 20, //  padding của các màn hình
  startGradient: { x: 0.0, y: 1.0 },
  endGradient: { x: 1.0, y: 1.0 },
  bottomPaddingHome: 80, // padding để cách phần bottomTabBar
  defaultDialogBackgroundOpacity: 0.3,
  downloadLink: "https://saymee.vn/download",
  lineHeightWebview: 28,
  DigitalCertificateCardStatus: {
    ACTIVE: {
      code: "ACTIVE",
      label: "Hoạt động",
    },
    INACTIVE: {
      code: "INACTIVE",
      label: "Ngừng hoạt động",
    },
    EXPIRED: {
      code: "EXPIRED",
      label: "Đã hết hạn",
    },
  },
};
