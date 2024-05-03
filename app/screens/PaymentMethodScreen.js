import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppColors from '../assets/AppColors';
import { Image } from 'react-native';
import Const from '../components/Const';
import Styles, { shadow } from '../components/Styles';
import navigatorUtils from '../utils/navigator.utils';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ButtonHasBorderSelect from '../components/buttons/custom/ButtonHasBorderSelect';
import AppTextInput from '../components/input/AppTextInput';
import ButtonHasBorderSelectVoucher from '../components/buttons/custom/ButtonHasBorderSelectVoucher';

export default PaymentMethodScreen = () => {
    const { t } = useTranslation();

    const [paymentMethod, setPaymentMethod] = useState('');
    const [voucher, setVoucher] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [selectVoucher, setSelectVoucher] = useState('');
    const [searchVoucher, setSearchVoucher] = useState();

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* header back */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',

                            flexDirection: 'row',
                            // backgroundColor: 'red',
                            width: Const.fullScreenWidth,
                            // marginHorizontal: 100,
                            paddingHorizontal: 40,
                            marginBottom: 20,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F3F8FE',
                                width: 50,
                                height: 50,
                                borderRadius: 20,

                                alignItems: 'center',
                                justifyContent: 'center',
                                ...shadow,
                            }}
                            onPress={() => {
                                navigatorUtils.goBack();
                            }}
                        >
                            <Ionicons name="chevron-back" size={24}></Ionicons>
                        </TouchableOpacity>

                        <Text style={{ alignItems: 'center', fontSize: 25, fontWeight: 700 }}>
                            {t('Payment method')}
                        </Text>
                        <View></View>
                    </View>

                    {/* payment method */}
                    <View
                        style={{
                            width: (Const.fullScreenWidth * 8) / 10,
                            alignItems: 'center',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 20,
                            marginVertical: 10,
                        }}
                    >
                        <Text style={{ left: -80, bottom: 5 }}> {t('Payment method')}</Text>
                        <ButtonHasBorderSelect
                            title="VN Pay"
                            style={{ width: (Const.fullScreenWidth * 3) / 4, marginVertical: 5 }}
                            onPress={() => {
                                setPaymentMethod('VNPAY');
                            }}
                            colorSelect={paymentMethod === 'VNPAY' ? 'red' : null}
                        ></ButtonHasBorderSelect>

                        <ButtonHasBorderSelect
                            title="Transfer"
                            style={{ width: (Const.fullScreenWidth * 3) / 4, marginVertical: 5 }}
                            onPress={() => {
                                setPaymentMethod('TRANSFER');
                            }}
                            colorSelect={paymentMethod === 'TRANSFER' ? 'red' : null}
                        ></ButtonHasBorderSelect>
                    </View>

                    {/* user voucher */}
                    <View
                        style={{
                            width: (Const.fullScreenWidth * 8) / 10,
                            alignItems: 'center',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 20,
                            marginVertical: 10,
                            maxHeight: 300,
                        }}
                    >
                        <Text style={{ left: -80, bottom: 5 }}>{t('Use the voucher')}</Text>
                        <AppTextInput
                            // title={t('Voucher')}
                            value={searchVoucher}
                            isNumber={false}
                            placeholder={t('Voucher')}
                            onChangeText={(text) => {
                                setSearchVoucher(text);
                                console.log(searchVoucher);
                            }}
                            // editable={true}

                            onClear={() => {
                                setSearchVoucher('');
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>
                        <ScrollView
                            style={{
                                marginVertical: 5,
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            {voucher.map((voucher) => {
                                return (
                                    <ButtonHasBorderSelectVoucher
                                        title="Transfer"
                                        style={{
                                            width: (Const.fullScreenWidth * 7) / 10 - 10,
                                            marginVertical: 5,
                                            left: 0,
                                        }}
                                        onPress={() => {
                                            setSelectVoucher('1');
                                        }}
                                        leftImg={require('../assets/icons/voucher.png')}
                                    ></ButtonHasBorderSelectVoucher>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        // paddingHorizontal: 10,
        // marginBottom: 20,
        // paddingBottom: 50,
        backgroundColor: AppColors.backgroundGradient,
        marginVertical: 40,
        alignItems: 'center',
    },
    iconBanner: {
        padding: 5,
        color: 'red',
        alignItems: 'center',
    },
    txtIconUnity: { color: AppColors.darkgray },
});
