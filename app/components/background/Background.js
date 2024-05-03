import PropTypes from "prop-types";
import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import Assets from "../../assets/Assets";
import Global from "../Global";
import LinearGradient from "react-native-linear-gradient";

/**
 *
 * @param children
 * @param source
 * @param blurRadius
 * @param childrenStyle
 * @param imageStyle style của ảnh header
 * @param backgroundImg ảnh background, nếu ko có sẽ là màu AppColors.background
 * @param backgroundImgStyle style của ảnh background , nếu ko truyền sẽ full màn hình
 * @returns {JSX.Element}
 * @constructor
 */
export const BackgroundImgContainer = ({
  children,
  source = Assets.Images.bgGradient,
  blurRadius = undefined,
  childrenStyle,
  imageStyle = {},
  backgroundImg = Assets.Images.bgGradient,
  backgroundImgStyle = {},
}) => {
  return (
    <BackgroundGradientContainer>
      <Image
        source={source}
        resizeMode={"stretch"}
        style={{
          height: 300,
          flex: 1,
          width: Global.Const.fullScreenWidth,
          position: "absolute",
          alignSelf: "flex-end",
          ...imageStyle,
        }}
      />
      {backgroundImg ? (
        <Image
          source={backgroundImg}
          resizeMode={"stretch"}
          style={{
            flex: 1,
            width: Global.Const.fullScreenWidth,
            position: "absolute",
            bottom: 0,
            ...backgroundImgStyle,
          }}
        />
      ) : null}
      <View style={childrenStyle}>{children}</View>
    </BackgroundGradientContainer>
  );
};

/**
 * Background gradient container. use safe when needed to avoid status bar
 * @param {*} param0
 * @returns
 */
export function BackgroundGradientContainer({
  gradient,
  children,
  safe = false,
}) {
  // const navBarHeight = useNavigationBarHeight();

  return (
    <LinearGradient
      colors={gradient ?? [Assets.Colors.background, Assets.Colors.background]}
      style={{
        flex: 1,
        overflow: "visible",
        height: "100%",
        width: "100%",
      }}
    >
      {Global.Const.os === "android" ? (
        <>
          {safe && <View style={{ height: Global.Const.statusBarHeight }} />}
          <View style={styles.SafeArea}>{children}</View>
          {safe && <View />}
        </>
      ) : safe ? (
        <SafeAreaView style={styles.SafeArea}>{children}</SafeAreaView>
      ) : (
        <View style={styles.SafeArea}>{children}</View>
      )}
    </LinearGradient>
  );
}

BackgroundGradientContainer.propTypes = {
  children: PropTypes.any,
  gradient: PropTypes.any,
  safe: PropTypes.bool,
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
  SafeArea: {
    flex: 1,
    zIndex: 0,
  },
});
