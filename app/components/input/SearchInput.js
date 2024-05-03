import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { FontSize } from '../Styles';
import AppColors from '../../assets/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Const from '../Const';

/**
 * @param {style} other style (options)
 * @param {txtPlaceHolder} txtPlaceHolder (option)
 * @param {heightInput} heightInput chiều cao (option)
 * @param {value} giá trị (required)
 * @callback onChangeText gọi khi thay đổi textinput (required)
 * @callback onFocus gọi khi  vào textinput (required)
 * @callback onSearch gọi khi nhập xong dữ liệu (required)
 * @callback onClearData gọi khi xoá dữ liệu (required)
 * @constructor
 */

function SearchInput({
    style,
    txtPlaceHolder,
    heightInput,
    value,
    onChangeText,
    onSearch,
    onFocus,
    onClearData,
    refInput,
}) {
    // const [borderColor, setBorderColor] = useState(colors.border);
    return (
        <View
            style={[
                {
                    borderWidth: 1,
                    borderRadius: Const.space_12,
                    height: heightInput ? heightInput : Const.space_40,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    // margin: Const.space_20,
                    // marginTop: Const.space_20,
                    // marginBottom: 20,
                    backgroundColor: AppColors.whiteSmoke,
                    borderColor: value !== '' ? AppColors.colorOnFocusInput : AppColors.colorNoFocusInput,
                },
                style,
            ]}
        >
            <Ionicons
                name="search-circle-outline"
                size={30}
                style={{
                    alignSelf: 'center',
                    marginHorizontal: Const.space_10,
                    width: Const.space_30,
                    height: Const.space_30,
                }}
            />
            <TextInput
                value={value}
                style={{
                    flex: 1,
                    fontSize: FontSize.s_14,
                    fontWeight: '400',
                    height: heightInput ? heightInput : Const.space_40,
                    width: '100%',
                }}
                onChangeText={(e) => {
                    onChangeText(e);
                }}
                placeholderTextColor={AppColors.placeholder}
                placeholder={txtPlaceHolder}
                onSubmitEditing={(text) => {
                    onSearch(text);
                    // setBorderColor(colors.border);
                }}
                onFocus={() => {
                    onFocus();
                    // setBorderColor(colors.primary);
                }}
                ref={refInput}
            />
            {value !== '' ? (
                <TouchableOpacity
                    style={{
                        alignSelf: 'center',
                        // marginHorizontal: Const.space_10,
                    }}
                    onPress={() => {
                        onChangeText('');
                        onClearData();
                    }}
                >
                    <Ionicons
                        name="close"
                        size={24}
                        style={{
                            alignSelf: 'center',
                            // marginHorizontal: Const.space_10,
                            width: Const.space_30,
                            height: Const.space_30,
                        }}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

export default SearchInput;
