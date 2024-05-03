import { Platform } from 'react-native';
import Const from './Const';
import Assets from '../assets/Assets';
import AppColors from '../assets/AppColors';

export const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
};

export const FontSize = {
    s_5: 5,
    s_6: 6,
    s_7: 7,
    s_8: 8,
    s_9: 9,
    s_10: 10,
    s_11: 11,
    s_12: 12,
    s_13: 13,
    s_14: 14,
    s_15: 15,
    s_16: 16,
    s_17: 17,
    s_18: 18,
    s_19: 19,
    s_20: 20,
    s_22: 22,
    s_23: 23,
    s_24: 24,
    s_32: 32,
};

export const Font = {
    light: 'BeVietnamPro-Light',
    regular: 'BeVietnamPro-Regular',
    medium: 'BeVietnamPro-Medium',
    semiBold: 'BeVietnamPro-SemiBold',
    bold: 'BeVietnamPro-Bold',
};

export default {
    Text: {
        title: {
            color: Assets.Colors.primaryText,
            fontSize: FontSize.s_16,
            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
            fontFamily: Font.semiBold,
        },
        titleS14: {
            color: Assets.Colors.primaryText,
            fontSize: FontSize.s_14,
            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
            fontFamily: Font.semiBold,
        },
        titleS24: {
            color: Assets.Colors.primaryText,
            fontSize: FontSize.s_24,
            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
            fontFamily: Font.semiBold,
        },
        dayName: {
            color: Assets.Colors.secondaryText,
            fontSize: FontSize.s_14,
            fontWeight: Platform.OS == 'ios' ? '700' : 'bold',
            fontFamily: Font.bold,
        },
        titleS18: {
            color: Assets.Colors.primaryText,
            fontSize: FontSize.s_18,
            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
            fontFamily: Font.semiBold,
        },
        titleS20: {
            color: Assets.Colors.primaryText,
            fontSize: FontSize.s_20,
            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
            fontFamily: Font.semiBold,
        },
        titleW500: {
            color: Assets.Colors.primaryText,
            fontWeight: '500',
        },
        primary: {
            color: Assets.Colors.primaryText,
            // fontFamily: Font.regular,
            fontSize: FontSize.s_14,
            fontWeight: '400',
        },
        primaryS12: {
            color: Assets.Colors.primaryText,
            // fontFamily: Font.regular,
            fontSize: FontSize.s_12,
            fontWeight: '400',
        },
        secondary: {
            color: Assets.Colors.secondaryText,
            fontSize: FontSize.s_12,
            // fontFamily: Font.regular,
            lineHeight: 14,
        },
        error: (themeName) => {
            return {
                color: Assets.Colors.error,
                //fontFamily: Font.bold,
                // fontFamily: Font.regular,
                fontSize: FontSize.s_14,
                lineHeight: 16,
            };
        },
        placeholder: (themeName) => {
            return {
                color: Assets.Colors.placeholder,
                fontSize: FontSize.s_12,
                // fontFamily: Font.regular,
                lineHeight: 14,
            };
        },
        placeholderS14: (themeName) => {
            return {
                color: Assets.Colors.placeholder,
                fontSize: FontSize.s_14,
                // fontFamily: Font.regular,
                lineHeight: 14,
            };
        },
        disableEdit: (themeName) => {
            return {
                color: Assets.Colors.secondaryText,
                // fontFamily: Font.regular,
                fontSize: FontSize.s_14,
                fontWeight: '400',
            };
        },
        titleNavbar: (themeName) => {
            return {
                color: Assets.Colors.primaryText,
                fontSize: FontSize.s_18,
                fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
                fontFamily: Font.semiBold,
            };
        },
        titleInput: (themeName) => {
            return {
                color: Assets.Colors.primaryText,
                fontSize: FontSize.s_16,
                fontFamily: Font.semiBold,
            };
        },
        titleButtonOnboarding: (themeName) => {
            return {
                color: Assets.Colors.titleOnboarding,
                fontSize: FontSize.s_20,
                // fontFamily: Font.regular,
                fontWeight: Platform.OS == 'ios' ? '700' : 'bold',
            };
        },
        titlePackage: (themeName) => {
            return {
                color: Assets.Colors.primary,
                fontSize: FontSize.s_20,
                // fontFamily: Font.regular,
                fontWeight: Platform.OS == 'ios' ? '700' : 'bold',
            };
        },
    },
    Layout: {
        container: {
            paddingLeft: Const.space_16,
            paddingRight: Const.space_16,
            paddingTop: Const.space_8,
            paddingBottom: Const.space_8,
        },
        row: {
            flexDirection: 'row',
        },
        rowFlatlist: {
            flexDirection: 'row',
            paddingHorizontal: Const.space_16,
            paddingVertical: Const.space_8,
        },
        column: {
            flexDirection: 'column',
        },
        rowCenter: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        rowCenterVertical: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        columnCenter: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        columnCenterHorizontal: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        // hoang: add layout for textSpace
        rowSpaceBtwHorizontal: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        shadow: {
            elevation: 3.5,
            shadowColor: Const.os === 'android' ? '#00000040' : '#000000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.04,
            shadowRadius: 4.65,
        },
        shadow1: {
            elevation: 3.5,
            shadowColor: Const.os === 'android' ? '#00000040' : '#000000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.08,
            shadowRadius: 4.65,
        },
        bgrBorder: {
            backgroundColor: Assets.Colors.white,
            borderTopLeftRadius: Const.space_20,
            borderTopRightRadius: Const.space_20,
            flex: 1,
        },
        shadowReverse: {
            elevation: 15,
            shadowColor: Const.os === 'android' ? '#000000' : '#000000',
            shadowOffset: {
                width: -12,
                height: -12,
            },
            shadowOpacity: 0.04,
            shadowRadius: 4.65,
        },
    },
    Other: {
        cardViewEmpty: {
            borderRadius: Const.space_12,
            backgroundColor: AppColors.white,
            shadowColor: 'rgba(0,0,0,0.06)',
            shadowOffset: { height: 12, width: 12 },
            shadowOpacity: 1,
            shadowRadius: 30,
            elevation: 20,
            paddingVertical: Const.space_12,
            paddingHorizontal: Const.space_12,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            zIndex: 1,
        },
    },
};

export const AppDimensions = {
    NavigationBar: {
        titleSize: 16,
        height: 44,
    },
    heightHeader: 60,
    mainPadding: 20,
    verticalPadding: 24,
};
