import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Styles, { FontSize } from '../Styles';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../assets/AppColors';
import Const from '../Const';

AppTextInput.propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    type: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    widthInput: PropTypes.any,
    heightInput: PropTypes.any,
    backgroundColor: PropTypes.string,
    message: PropTypes.string,
    isNumber: PropTypes.bool,
    require: PropTypes.bool,
    borColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    editable: PropTypes.bool,
    titleStyles: PropTypes.object,
    hiddenClear: PropTypes.bool,
    onClear: PropTypes.func,
    refInput: PropTypes.object,
};

AppTextInput.defaultProps = {
    value: '',
    onChangeText: () => { },
    type: '',
    title: '',
    placeholder: '',
    widthInput: '100%',
    heightInput: 45,
    backgroundColor: 'transparent',
    message: '',
    isNumber: false,
    require: false,
    borColor: null,
    placeholderColor: null,
    editable: true,
    titleStyles: {},
    hiddenClear: false,
    onClear: () => { },
    textStyle: undefined,
};

/**
 * @document
 * @param
 * @returns {JS.Element}
 * @constructor
 * @param {string} type password|QRCode default textinput
 * @param {string} value giá trị
 * @param {string} title tiêu đề
 * @param {string} placeholder
 * @param {string} borColor màu của viền ô nhập
 * @param {string} txtColor màu của chữ
 * @param {number} widthInput chiều rộng
 * @param {number} heightInput chiều cao
 * @param {string} backgroundColor màu nền
 * @param {string} message tin thông báo lỗi
 * @param {boolean} isNumber ô nhập dạng số
 * @param {boolean} require bắt buộc
 * @param {boolean} editable trạng thái ô nhập
 * @param {object} styles styles của cả component
 * @param refInput
 * @callback onChangeText trả về giá trị ô nhập
 * @callback onClear clear giá trị ô nhập
 * @returns {JSX.Element}
 */

function AppTextInput({
    value,
    refInput,
    onChangeText,
    type,
    title,
    placeholder,
    widthInput,
    heightInput,
    backgroundColor,
    message,
    isNumber,
    require,
    borColor,
    placeholderColor,
    editable,
    titleStyles,
    onClear,
    hiddenClear,
    textColor,
}) {
    const tag = '[AppTextInput]';
    const [borderColor, setBorderColor] = useState(borColor);
    const [isFocus, setFocus] = useState(false);
    useEffect(() => {
        setBorderColor((curr) => borColor ?? curr);
    }, [borColor]);
    return (
        <View
            style={{
                width: widthInput,
                justifyContent: 'center',
            }}
        >
            {require && !value && <Text style={{ color: 'red', fontSize: 12 }}>Required*</Text>}
            <View>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: message?.length > 0 ? AppColors.error : editable ? borderColor : AppColors.neutral,
                        paddingRight: 10,
                        flexDirection: 'row',
                        backgroundColor: editable ? backgroundColor : AppColors.disable,
                        borderRadius: 12,
                    }}
                >
                    <TextInput
                        selectionColor={AppColors.black}
                        cursorColor={AppColors.black}
                        keyboardType={isNumber ? 'number-pad' : 'default'}
                        editable={editable}
                        value={value}
                        ref={refInput}
                        style={[
                            editable
                                ? {
                                    flex: 1,
                                    height: heightInput,
                                    paddingLeft: 15,
                                    color: textColor ?? AppColors.ghostwhite,
                                }
                                : {
                                    ...Styles.Text.disableEdit(),
                                    paddingLeft: 15,
                                    flex: 1,
                                    height: heightInput,
                                    color: textColor ?? AppColors.ghostwhite,
                                },
                        ]}
                        onFocus={() => {
                            setBorderColor(AppColors.inputFocus);
                            setFocus(true);
                        }}
                        onBlur={() => {
                            setBorderColor(borColor);
                            setFocus(false);
                        }}
                        placeholderTextColor={textColor ?? AppColors.ghostwhite}
                        placeholder={placeholder}
                        onChangeText={(e) => {
                            onChangeText(e);
                        }}
                    />
                    {editable && isFocus && !hiddenClear && value && value.length > 0 && (
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                // backgroundColor: 'red',
                            }}
                            onPress={() => {
                                onClear();
                            }}
                        >
                            <Icon name="close" size={20} style={{ color: AppColors.pointPackage }} />
                        </TouchableOpacity>
                    )}

                </View>
            </View>

            {message?.length > 0 && (
                <View
                    style={{
                        width: '100%',
                        marginTop: 6,
                    }}
                >
                    <Text
                        style={{
                            ...Styles.Text.error(),
                            fontSize: FontSize.s_10,
                        }}
                    >
                        {message}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default AppTextInput;
