import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import AppColors from '../../../assets/AppColors';
import Const from '../../Const';
import { FontSize } from '../../Styles';
import Global from '../../Global';

/**
 *  
 * @param {title} title tiêu đề của nút
 * @param {width} width chiều rộng của nút (option)
 * @param {height} height chiều cao của nút (option)
 * @param {borColor} borColor màu viền của nút (option)
 * @param {txtColor} txtColor màu chữ (option)
 * @param {style} style (option)
 * @param {disabled} disabled enable/disable click button (option)
 * @callback onPress gọi khi nút đc bấm
 * @constructor
 */

function ButtonHasBorder({
  title,
  width = '100%',
  height = Const.heightButton,
  borColor,
  txtColor,
  style,
  disabled = false,
  onPress,
}) {
  const tag = 'ButtonHasBorder';
  //const theme = useThemeName();
  const colors = AppColors;

  const [bgColor, setBgColor] = useState(colors.background);

  return (
    <TouchableOpacity
      onPressIn={() => setBgColor(colors.backgroundPrimary)}
      onPressOut={() => setBgColor(colors.background)}
      disabled={disabled}
      style={[
        {
          borderRadius: Const.space_22,
          height: height ? height : Const.heightButton,
          width: width ? width : Const.widthButton,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: borColor ? borColor : AppColors.borderButton,
          borderWidth: Const.space_1,
          fontWeight: 'bold',
          backgroundColor: bgColor,
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
          {
            color: txtColor ? txtColor : AppColors.titleButton,
            fontSize: FontSize.s_14,
            fontWeight: '600',
            fontFamily: Global.Font.semiBold,
          },
          disabled ? {color: AppColors.white} : {},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonHasBorder;
