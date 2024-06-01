import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Global from '../Global';
import navigatorUtils from '../../utils/navigator.utils';
import SearchInput from '../input/SearchInput';
import { useTranslation } from 'react-i18next';
import Const from '../Const';
import AppColors from '../../assets/AppColors';

/**
 *
 * @param title
 * @param icon
 * @param style
 * @param onIconPress
 * @param navigation
 * @param unsafe
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchHeader({ title, icon, style, onIconPress, navigation, unsafe }) {
    const [txtSearch, setTxtSearch] = useState('');
    const { t } = useTranslation();

    const handleChatBot = () => {
        navigatorUtils.navigate('ChatBotScreen');
    };
    return (
        <View style={{ width: '100%', backgroundColor: AppColors.backgroundHeader, paddingBottom: 20 }}>
            {!!unsafe || <View style={{ height: Global.Const.statusBarHeight }} />}
            <View
                style={[
                    {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: Global.Const.space_16,
                        // paddingVertical: Global.Const.space_10,
                    },
                ]}
            >
                <View style={{ width: '80%' }}>
                    <SearchInput
                        txtPlaceHolder={t('Search...')}
                        onChangeText={(txt) => {
                            setTxtSearch(txt);
                        }}
                        value={txtSearch}
                        style={{}}
                        onSearch={() => {
                            console.log('On search');
                        }}
                        onFocus={() => {}}
                        onClearData={() => {
                            setTxtSearch('');
                        }}
                    ></SearchInput>
                </View>
                <View
                    style={{
                        width: '20%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons
                            name="notifications-outline"
                            size={30}
                            style={{
                                alignSelf: 'center',
                                marginHorizontal: Const.space_10,
                                width: Const.space_30,
                                height: Const.space_30,
                                color: AppColors.whiteSmoke,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handleChatBot();
                        }}
                    >
                        <Fontisto
                            name="lightbulb"
                            size={30}
                            style={{
                                alignSelf: 'center',
                                // marginHorizontal: Const.space_10,
                                width: Const.space_30,
                                height: Const.space_30,
                                color: AppColors.whiteSmoke,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

SearchHeader.propTypes = {
    icon: PropTypes.number,
    navigation: PropTypes.object,
    onIconPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    title: PropTypes.string.isRequired,
    unsafe: PropTypes.bool,
};

const styles = StyleSheet.create({
    rightIcon: {
        width: 40,
        height: 40,
        color: '#483d8b',
    },
});
