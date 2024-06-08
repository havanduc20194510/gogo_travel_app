import { Linking, StyleSheet, Text, View } from 'react-native';
import { ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../assets/AppColors';
import { Image } from 'react-native';
import Const from '../components/Const';
import Styles, { shadow } from '../components/Styles';
import navigatorUtils from '../utils/navigator.utils';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import SearchHeader from '../components/header/SearchHeader';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import ButtonIcon from '../components/buttons/custom/ButtonIcon';

import { Table, Row, Rows, Col, TableWrapper } from 'react-native-table-component';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import env from '../../env.json';
import moment from 'moment';
import { formatCurrency } from '../utils/util';
import bookingApi from '../controllers/api/bookingApi';
import GlobalIndicator from '../components/indicator/GlobalIndicator';
import DialogError from '../components/dialog/error/DialogError';
import { useAccount, useAuth } from '../controllers/hook/AccountHook';
import AppTextInput from '../components/input/AppTextInput';

const screenWidth = Const.fullScreenWidth;
const heightWidth = Const.fullScreenHeight;

export default DetailTourBookingScreen = (params) => {
    const { t } = useTranslation();
    const accessToken = useAuth();
    const booking = params?.route?.params?.booking;
    const tour = booking?.tour;

    const [desTour, setDesTour] = useState(
        tour?.description?.length > 15 ? tour?.description.substr(0, 150) : tour?.description,
    );
    const [readMoreIcon, setReadMoreIcon] = useState(false);

    const handleReadMore = () => {
        if (readMoreIcon) {
            setDesTour(tour?.description?.length > 15 ? tour?.description.substr(0, 150) : tour?.description);
        } else {
            setDesTour(tour?.description);
        }
    };

    const [tableData, setTableData] = useState([
        [t('email'), booking?.email],
        [t('Phone'), booking?.phone],
        [t('Start date'), moment(booking?.startDate).format('DD-MM-YYYY')],
        [t('Adults'), booking?.numberOfAdults],
        [t('Children'), booking?.numberOfChildren],
        [t('Babies'), booking?.numberOfBabies],
        [t('Note'), booking?.note],
        [t('Booking date'), moment(booking?.bookingDate).format('HH:MM DD-MM-YYYY')],
        [t('Total'), formatCurrency(booking?.total)],
        [t('Status'), booking?.status],
    ]);

    const state = {
        // tableHead: [t('Time line'), t('Place'), t('Activity')],
        tableData: tableData,
    };

    const carouselRef = useRef(null);
    const renderItem = ({ item, index }, parallaxProps) => {
        // console.log('item: ', item);
        return (
            <TouchableOpacity
                onPress={() => {
                    // handle to screen detail
                    console.log('abc 123');
                }}
                style={styles.item}
            >
                <ParallaxImage
                    source={{
                        uri: item?.url ?? env.dev.defaultImagePlace,
                    }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                {/* <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text> */}
            </TouchableOpacity>
        );
    };

    const [activeSlide, setActiveSlide] = useState(0);

    const [paymentData, setPaymentData] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [useCoin, setUseCoin] = useState(false);

    useEffect(() => {
        setPaymentData({
            bookingId: booking?.id,
            bankCode: 'NCB',
            total: booking?.total,
            language: 'vn',
            returnUrl: env.dev.returnUrl,
            coin: false,
        });
    }, []);

    const handlePayment = async () => {
        setPaymentData({
            bookingId: booking?.id,
            bankCode: 'NCB',
            total: booking?.total ?? 0,
            language: 'vn',
            returnUrl: env.dev.returnUrl,
            coin: useCoin,
        });
        GlobalIndicator.show(t('Sending'));
        const res = await bookingApi.paymentBooking(accessToken, paymentData);

        if (res?.status === 'error') {
            setShowError(!showError);
            setErrorMessage(res?.error);
        } else {
            console.log('response: ', JSON.stringify(res));
            // navigatorUtils.goBack();
            const paymentUrl = res?.data?.data?.paymentUrl;
            Linking.openURL(paymentUrl);
            // Linking.canOpenURL(paymentUrl).then((supported) => {
            //     if (supported) {
            //         Linking.openURL(paymentUrl);
            //     } else {
            //         console.log("Don't know how to open URI: " + paymentUrl);
            //     }
            // });
        }
        GlobalIndicator.hide();
    };

    return (
        <View>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // margin: 20
                    backgroundColor: '#F3F8FE',
                    width: 50,
                    height: 50,
                    borderRadius: 20,
                    top: 40,
                    left: 40,
                    position: 'absolute',
                    zIndex: 1,
                    ...shadow,
                }}
            >
                <TouchableOpacity
                    style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        navigatorUtils.goBack();
                    }}
                >
                    <Ionicons name="chevron-back" size={24}></Ionicons>
                </TouchableOpacity>
            </View>
            {showError && (
                <DialogError
                    setVisible={setShowError}
                    visible={showError}
                    labelCancel={'Cancel'}
                    labelOk={'OK'}
                    title={t('Payment failed')}
                    description={errorMessage}
                ></DialogError>
            )}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* <SearchHeader></SearchHeader> */}
                {/* Image */}

                <View
                    style={{
                        // paddingHorizontal: 20,
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    {/* <Image
                        source={{ uri: tour?.images[0].url }}
                        style={{
                            width: Const.fullScreenWidth - 20,
                            height: Const.fullScreenWidth + 50,
                            objectFit: 'cover',
                            borderRadius: 50,
                            marginTop: 50,
                        }}
                    ></Image> */}

                    <View
                        style={{
                            width: Const.fullScreenWidth,
                            height: Const.fullScreenWidth + 50,
                            objectFit: 'cover',
                            borderRadius: 50,
                            // marginTop: 50,
                            position: 'relative',
                            alignItems: 'center',
                        }}
                    >
                        <Carousel
                            ref={carouselRef}
                            sliderWidth={screenWidth}
                            // sliderHeight={Const.fullScreenHeight}
                            // itemHeight={Const.fullScreenHeight}
                            itemWidth={screenWidth}
                            data={tour?.images}
                            renderItem={renderItem}
                            hasParallaxImages={true}
                            inactiveSlideScale={1}
                            autoplay={true}
                            loop={true}
                            // lockScrollTimeoutDuration={10}
                            layout="default"
                            onSnapToItem={(index) => setActiveSlide(index)}
                        />
                        <Pagination
                            dotsLength={tour?.images?.length}
                            activeDotIndex={activeSlide}
                            containerStyle={{ position: 'absolute', bottom: 0 }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                // marginHorizontal: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                            }}
                            inactiveDotStyle={
                                {
                                    // Define styles for inactive dots here
                                }
                            }
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>

                    <View
                        style={[
                            {
                                alignItems: 'center',
                                justifyContent: 'center',
                                // margin: 20
                                backgroundColor: '#F3F8FE',
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                                right: 30,
                                bottom: -20,
                                position: 'absolute',
                                zIndex: 1,
                                ...shadow,
                            },
                            ,
                        ]}
                    >
                        <TouchableOpacity
                            style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="heart" size={35} color={'#EC5655'}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Tour */}

                <TouchableOpacity
                    onPress={() => {
                        navigatorUtils.navigate('DetailTourScreen', { tour: tour });
                    }}
                    style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}
                >
                    <Text
                        style={{
                            fontSize: 36,
                            fontWeight: 700,
                            marginTop: 10,
                            width: '100%',
                            // maxHeight: 50,
                        }}
                    >
                        {tour?.name ?? 'Tour'}
                    </Text>
                </TouchableOpacity>

                {/* rate */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Ionicons name="star" size={24} color={'#DF9652'}></Ionicons>
                        <Text style={{ color: '#606060', marginHorizontal: 20 }}>4.5 (355 Reviews)</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 20 }}>
                        <Text style={{ fontSize: 16, color: AppColors.blueColor, fontWeight: 500 }}>
                            {t('Show map')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* description */}
                <Text style={{ fontSize: 14, fontWeight: 500 }}>{desTour}</Text>
                <TouchableOpacity
                    style={{ margin: 10, color: AppColors.blueColor }}
                    onPress={() => {
                        handleReadMore();
                        setReadMoreIcon(!readMoreIcon);
                    }}
                >
                    <Text style={{ fontSize: 16, color: '#2f4f4f', fontWeight: 600 }}>
                        {t('Read more')}
                        <Ionicons
                            name={readMoreIcon ? 'chevron-up-outline' : 'chevron-down-outline'}
                            size={16}
                        ></Ionicons>
                    </Text>
                </TouchableOpacity>

                <View style={styles.containerTable}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        {/* <Row data={state.tableHead} style={styles.headTable} textStyle={styles.textTable} /> */}
                        <Rows data={state.tableData} textStyle={styles.textTable} />
                    </Table>
                </View>

                <View style={styles.containerTable}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: 5,
                        }}
                    >
                        <View style={{ bottom: 5 }}>
                            <Text style={{ fontWeight: 700 }}>{t('Use coin')} </Text>
                            <Text>{t('(1 coin = 1000 vnd)')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5 }}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={useCoin ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    setUseCoin(!useCoin);
                                }}
                                value={useCoin}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 20,
                    }}
                >
                    <View>
                        <Text style={{ color: AppColors.black, fontWeight: 700 }}>{t('Price')}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>
                            {/* <FontAwesome6 name="hand-holding-dollar" size={30}></FontAwesome6> {tour?.adultPrice ?? 199} */}
                            {formatCurrency(booking?.total) ?? 0}
                        </Text>
                    </View>
                    <ButtonIcon
                        title={t('Payment')}
                        fontSize={24}
                        icon={<Ionicons name="arrow-forward-outline" color={AppColors.white} size={36}></Ionicons>}
                        width={'60%'}
                        height={60}
                        onPress={() => {
                            console.log('payment');
                            handlePayment();
                            // navigatorUtils.navigate('PaymentMethodScreen', { tour: tour });
                        }}
                    ></ButtonIcon>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingHorizontal: 10,
        // marginBottom: 20,
        // paddingBottom: 50,
        backgroundColor: AppColors.backgroundGradient,
        top: 0,
        height: 'auto',
        position: 'relative',
    },
    iconBanner: {
        padding: 5,
        color: 'red',
        alignItems: 'center',
    },
    txtIconUnity: { color: AppColors.darkgray },
    titleSchedule: {
        fontSize: 16,
        color: '#000',
    },
    txtSchedule: {
        fontSize: 14,
        color: AppColors.backgroundHeader,
    },
    titleLeftSchedule: {
        // width: (Const.fullScreenWidth * 9) / 10,
        // backgroundColor: 'red',
    },
    containerTable: { flex: 1, padding: 16 },
    headTable: { height: 40, backgroundColor: '#f1f8ff' },
    textTable: { margin: 6 },

    containerTableCol: { flex: 1, padding: 16 },
    headTableCol: { height: 40, backgroundColor: '#f1f8ff' },
    wrapperTableCol: { flexDirection: 'row' },
    titleTableCol: { flex: 1, backgroundColor: '#f6f8fa' },
    rowTableCol: { height: 28 },
    textTableCol: { textAlign: 'center' },

    item: {
        // width: screenWidth,
        // // height: screenWidth - 60,
        // height: Const.fullScreenHeight,
        // backgroundColor: 'red',
        // margin: 10,
        // // zIndex: 4
        width: Const.fullScreenWidth,
        height: Const.fullScreenHeight,
    },
    imageContainer: {
        height: '100%',
    },
    image: {
        // // ...StyleSheet.absoluteFillObject,
        objectFit: 'cover',
        // aspectRatio: 1.5,
        // width: screenWidth,
        // // height: screenWidth,
        // left: 0,
        // right: 0,
    },
});
