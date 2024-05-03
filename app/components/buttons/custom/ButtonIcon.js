import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Styles, { FontSize } from '../../Styles';
import AppColors from '../../../assets/AppColors';
import Const from '../../Const';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 *
 * @param {title} title: tiêu đề của nút (required)
 * @param {width} width:chiều rộng của nút (option)
 * @param {height} height:chiều cao của nút (option)
 * @param {bgrColor} bgrColor:màu nền của nút (option)
 * @param {txtColor} txtColor:màu chữ (option)
 * @param {disabled} disabled: enable/disable click button (option)
 * @param {style} style (option)
 * @callback onPress gọi khi nút đc bấm
 * @constructor
 */

function ButtonIcon({
    title,
    width = '100%',
    height,
    bgrColor = null,
    txtColor = null,
    style,
    disabled = false,
    onPress,
    fontSize,
    iconColor,
    icon,
}) {
    const tag = 'ButtonIcon';
    if (!height) {
        height = Const.heightButton;
    }
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                {
                    borderRadius: 16,
                    height: height ? height : Const.heightButton,
                    width: width ? width : Const.widthButton,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#176FF2',
                    fontWeight: 'bold',
                    flexDirection: 'row',
                },
                disabled && {
                    backgroundColor: AppColors.disable,
                },
                style,
            ]}
            onPress={() => {
                onPress();
            }}
        >
            <Text
                style={[
                    Styles.Text.primary,
                    {
                        color: txtColor ? txtColor : AppColors.white,
                        fontSize: fontSize ?? FontSize.s_14,
                        fontWeight: 500,
                        marginHorizontal: 20,
                    },
                ]}
            >
                {title}
            </Text>
            {icon ? (
                icon
            ) : (
                <Ionicons
                    name="arrow-forward-outline"
                    size={30}
                    color={iconColor ? iconColor : AppColors.white}
                ></Ionicons>
            )}
        </TouchableOpacity>
    );
}

export default ButtonIcon;
