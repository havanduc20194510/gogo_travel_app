import React, {useMemo, useState} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AppColors from "../../../../assets/AppColors";

/**
 *
 * @param {TouchableOpacityProps & {highlightColor?: ColorValue, normalColor?: ColorValue}} props
 * @returns
 */
export default function HighlightTouchable(props) {
  const colors = AppColors;

  const [bgColor, setBgColor] = useState(
    props.normalColor ? props.normalColor : colors.background,
  );

  const style = useMemo(
    /**
     * @return {StyleProp<ViewStyle>}
     */
    () => {
      return [props.style, {backgroundColor: bgColor}];
    },
    [props.style, bgColor],
  );

  return (
    <TouchableOpacity
      onPressIn={() =>
        setBgColor(
          props.highlightColor
            ? props.highlightColor
            : colors.backgroundPrimary,
        )
      }
      onPressOut={() =>
        setBgColor(props.normalColor ? props.normalColor : colors.background)
      }
      {...props}
      style={style}
    />
  );
}
