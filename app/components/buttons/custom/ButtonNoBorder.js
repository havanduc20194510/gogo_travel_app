import Const from 'app/shared/const/Const';
import Styles, {FontSize} from 'app/shared/Styles';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import AppColors from 'app/assets/AppColors';

/**
 *  
 * @param {title} tiêu đề của nút
 * @param {width} chiều rộng của nút (option)
 * @param {height} chiều cao của nút (option)
 * @param {txtColor} màu chữ (option)
 * @param {style} style (option)
 * @param {disabled} disabled: enable/disable click button (option)
 * @callback onPress gọi khi nút đc bấm
 * @constructor
 */

function ButtonNoBorder({
  title,
  width = '100%',
  height = Const.heightButton,
  txtColor,
  style,
  disabled = false,
  onPress,
}) {
  const tag = 'ButtonNoBorder';
  if (!txtColor) {
    txtColor = AppColors.titleButton;
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          height: height ? height : Const.heightButton,
          width: width ? width : Const.widthButton,
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        },
        disabled && {
          backgroundColor: AppColors.gray,
        },
        style,
      ]}
      onPress={() => {
        onPress();
      }}>
      <Text
        style={[
          Styles.Text.primary,
          {
            color: txtColor,
            fontSize: FontSize.s_14,
            fontWeight: '700',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonNoBorder;
