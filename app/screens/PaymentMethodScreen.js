import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
import bookingApi from '../controllers/api/bookingApi';
import moment from 'moment';
import SelectInput from '../components/input/SelectInput';
import DialogError from '../components/dialog/error/DialogError';
import GlobalIndicator from '../components/indicator/GlobalIndicator';
import UserHelper from '../utils/user.helper';
import { useAccount, useAuth } from '../controllers/hook/AccountHook';

export default PaymentMethodScreen = (params) => {
    const user = useAccount();
    const accessToken = useAuth();

    const { t } = useTranslation();
    const tour = params?.route?.params?.tour;

    const [paymentMethod, setPaymentMethod] = useState('');
    const [voucher, setVoucher] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [selectVoucher, setSelectVoucher] = useState('');
    const [searchVoucher, setSearchVoucher] = useState();
    const [qr, setQr] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [numberOfAdults, setNumberOfAdults] = useState("");
    const [numberOfChildren, setNumberOfChildren] = useState("");
    const [numberOfBabies, setNumberOfBabies] = useState("");
    const [note, setNote] = useState('');
    const [selectDepartureTime, setSelectDepartureTime] = useState();
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const handleBooking = async () => {
        GlobalIndicator.show(t('Sending'));

        // const isLogged = await UserHelper.checkAccessTokenValid()


        const data = await bookingApi.create(accessToken, {
            tourId: tour.tourId,
            userId: user?.userId,
            email: email,
            phone: phone,
            numberOfAdults: numberOfAdults,
            numberOfChildren: numberOfChildren,
            numberOfBabies: numberOfBabies,
            note: note,
            startDate: selectDepartureTime.title,
        });

        // console.log("data payment:", data);

        if (data?.status === 'error') {
            setShowError(!showError);
            setMessageError(data?.error);
            // console.log('error123123: ', data?.status);
        } else {
            navigatorUtils.navigate('SavedScreen');
        }

        GlobalIndicator.hide();
    };

    console.log('departureTimes: ', tour?.departureTimes);

    return (
        <View>
            <DialogError
                setVisible={setShowError}
                visible={showError}
                labelCancel={'Cancel'}
                labelOk={'OK'}
                title={t('Create booking failed')}
                description={messageError}
            ></DialogError>
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

                    {/* Price */}
                    <View
                        style={{
                            width: (Const.fullScreenWidth * 8) / 10,
                            alignItems: 'center',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 15,
                            marginVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{}}>{t('Price')}</Text>
                            <FontAwesome5 name="coins" size={20} style={{ color: '#FF0000' }}></FontAwesome5>
                        </View>
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
                    {/* <View
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
                    </View> */}

                    {/* Use coin */}
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
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}
                        >
                            <Text style={{ bottom: 5 }}>{t('Use coin')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
                                <Text style={{ color: 'red' }}>500</Text>
                                <FontAwesome5 name="coins" size={20} style={{ color: '#FF0000' }}></FontAwesome5>
                            </View>
                        </View>

                        <AppTextInput
                            // title={t('Voucher')}
                            value={searchVoucher}
                            isNumber={true}
                            placeholder={t('Coin')}
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
                    </View>

                    {/*  info user */}
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
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}
                        >
                            <Text style={{ bottom: 5 }}>{t('Information')}</Text>
                        </View>
                        {/* phone */}
                        <AppTextInput
                            // title={t('Voucher')}
                            value={phone}
                            isNumber={true}
                            placeholder={t('Phone')}
                            onChangeText={(text) => {
                                setPhone(text);
                            }}
                            // editable={true}

                            onClear={() => {
                                setPhone('');
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>
                        <View style={{ height: 10 }}></View>
                        {/* email */}
                        <AppTextInput
                            require={true}
                            value={email}
                            // isNumber={true}
                            placeholder={t('Email')}
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                            // editable={true}

                            onClear={() => {
                                setEmail('');
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>
                        <View style={{ height: 10 }}></View>
                        {/* note */}
                        <AppTextInput
                            // title={t('Voucher')}
                            value={note}
                            // isNumber={true}
                            placeholder={t('Note')}
                            onChangeText={(text) => {
                                setNote(text);
                            }}
                            // editable={true}

                            onClear={() => {
                                setNote('');
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>
                        {/* adults */}
                        <View style={{ height: 10 }}></View>
                        <AppTextInput
                            // title={t('Voucher')}
                            value={numberOfAdults}
                            isNumber={true}
                            placeholder={t('Number adults')}
                            onChangeText={(text) => {
                                setNumberOfAdults(text);
                            }}
                            // editable={true}

                            onClear={() => {
                                setNumberOfAdults('');
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>
                        {/* childr4en */}
                        <View style={{ height: 10 }}></View>
                        <AppTextInput
                            value={numberOfChildren}
                            isNumber={true}
                            placeholder={t('Number children')}
                            onChangeText={(text) => {
                                setNumberOfChildren(text);
                            }}
                            // editable={true}

                            onClear={() => {
                                setNumberOfChildren("");
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>
                        {/* baby */}
                        <View style={{ height: 10 }}></View>
                        <AppTextInput
                            // title={t('Voucher')}
                            value={numberOfBabies}
                            isNumber={true}
                            placeholder={t('Number babies')}
                            onChangeText={(text) => {
                                setNumberOfBabies(text);
                            }}
                            // editable={true}

                            onClear={() => {
                                setNumberOfBabies('');
                            }}
                            // borColor={AppColors.neutral}
                            // message={''}
                            // backgroundColor={'red'}
                            textColor={'#1EDCDC'}
                        ></AppTextInput>

                        <View style={{ height: 10 }}></View>
                        {tour?.departureTimes?.length > 0 && (
                            <SelectInput
                                data={tour?.departureTimes.map((time) => {
                                    return {
                                        title: time?.startDate,
                                    };
                                })}
                                setFilterType={setSelectDepartureTime}
                                borderWidthContainer={1}
                            ></SelectInput>
                        )}
                    </View>

                    {/* QR */}
                    {/* <View
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
                        <Text>Scan our QR</Text>
                        <Image
                            source={qr ? qr : require('../assets/images/imgDefaultQR.png')}
                            style={{
                                objectFit: 'fill',
                                width: (Const.fullScreenWidth * 8) / 10 - 10,
                                height: (Const.fullScreenWidth * 8) / 10 + 10,
                                borderRadius: 20,
                                marginTop: 10,
                            }}
                        ></Image>
                    </View> */}

                    <TouchableOpacity
                        style={{
                            width: (Const.fullScreenWidth * 8) / 10,
                            alignItems: 'center',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 10,
                            marginVertical: 10,
                        }}
                        onPress={() => {
                            handleBooking();
                            console.log('complete');
                        }}
                    >
                        <Text style={{ fontWeight: 700, fontSize: 20 }}>{t('Complete')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </View >
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
