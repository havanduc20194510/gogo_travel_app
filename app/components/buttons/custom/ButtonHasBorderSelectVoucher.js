import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../../assets/AppColors';
import Const from '../../Const';
import { FontSize } from '../../Styles';
import Global from '../../Global';
import { Image } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

function ButtonHasBorderSelectVoucher({
    title,
    width = '100%',
    height = Const.heightButton,
    borColor,
    txtColor,
    style,
    disabled = false,
    onPress,
    leftImg,
    colorSelect,
}) {
    const tag = 'ButtonHasBorderSelectVoucher';
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
                    borderRadius: 10,
                    height: height ? height : Const.heightButton,
                    width: width ? width : Const.widthButton,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: borColor ? borColor : AppColors.borderButton,
                    borderWidth: Const.space_1,
                    fontWeight: 'bold',
                    backgroundColor: bgColor,
                    flexDirection: 'row',
                },
                disabled && {
                    backgroundColor: AppColors.gray,
                },
                style,
            ]}
            onPress={() => {
                onPress();
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                {/* <Image
                    style={{ width: 40, height: 40 }}
                    source={leftImg ? leftImg : require('../../../assets/icons/vnpay.png')}
                ></Image> */}

                <Ionicons name="pricetags-outline" size={26} style={{ marginRight: 10 }}></Ionicons>
                <Text
                    style={[
                        {
                            color: txtColor ? txtColor : AppColors.titleButton,
                            fontSize: FontSize.s_14,
                            fontWeight: '600',
                            fontFamily: Global.Font.semiBold,
                            alignItems: 'center',
                        },
                        disabled ? { color: AppColors.white } : {},
                    ]}
                >
                    {title}
                </Text>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <Octicons name="dot" size={40} color={colorSelect ?? '#B8B8B8'}></Octicons>
            </View>
        </TouchableOpacity>
    );
}

export default ButtonHasBorderSelectVoucher;
