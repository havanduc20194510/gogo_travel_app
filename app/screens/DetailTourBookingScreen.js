import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AppColors from '../assets/AppColors';
import { Image } from 'react-native';
import Const from '../components/Const';
import Styles, { shadow } from '../components/Styles';
import navigatorUtils from '../utils/navigator.utils';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import SearchHeader from '../components/header/SearchHeader';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import ButtonIcon from '../components/buttons/custom/ButtonIcon';

import { Table, Row, Rows, Col, TableWrapper } from 'react-native-table-component';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import env from '../../env.json';

const screenWidth = Const.fullScreenWidth;
const heightWidth = Const.fullScreenHeight;

export default DetailTourBookingScreen = (params) => {
    const { t } = useTranslation();
    const tour = params?.route?.params?.tour;

    // console.log('tour: ', tour

    const [desTour, setDesTour] = useState(
        tour?.description?.length > 15 ? tour?.description?.substr(0, 150) : tour?.description,
    );
    const [readMoreIcon, setReadMoreIcon] = useState(false);

    const handleReadMore = () => {
        if (readMoreIcon) {
            setDesTour(tour.description.length > 15 ? tour.description.substr(0, 150) : tour.description);
        } else {
            setDesTour(tour.description);
        }
    };

    const [tableData, setTableData] = useState(
        tour?.schedules.map((schedule) => {
            return schedule?.scheduleDetail.map((sd) => {
                return [sd.timeLine, sd.place, sd.activity];
            });
        }),
    );

    const state = {
        tableHead: [t('Time line'), t('Place'), t('Activity')],
        tableData: tableData[0],
    };

    const carouselRef = useRef(null);
    const renderItem = ({ item, index }, parallaxProps) => {
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
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
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
                </View>

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

                <View
                    style={{
                        flexDirection: 'row',
                        borderRadius: Const.space_12,
                        justifyContent: 'space-between',
                        marginHorizontal: 10,
                        zIndex: 1,
                    }}
                >
                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="wifi" size={40} color={AppColors.blueIcon}></Ionicons>
                        <Text style={styles.txtIconUnity}>{t('Wifi')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="restaurant-outline" size={40} color={AppColors.blueIcon}></Ionicons>
                        <Text style={styles.txtIconUnity}>{t('Restaurant')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="boat" size={40} color={AppColors.blueIcon}></Ionicons>
                        <Text style={styles.txtIconUnity}>{t('Boat')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="barbell-outline" size={40} color={AppColors.blueIcon}></Ionicons>
                        <Text style={styles.txtIconUnity}>{t('Barbell')}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{ fontSize: 24, fontWeight: 600 }}>{t('Chương trình tour')}</Text>

                    {tour?.schedules?.map((schedule) => {
                        return (
                            <View style={{ marginVertical: 5 }}>
                                <Text style={styles.titleSchedule}>
                                    <Text style={styles.txtSchedule}>
                                        {' '}
                                        {schedule?.timeInDays?.toUpperCase()}: {schedule?.title}
                                    </Text>
                                </Text>
                                {schedule?.scheduleDetail?.length > 0 && (
                                    <View>
                                        <View style={styles.containerTable}>
                                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                                <Row
                                                    data={state.tableHead}
                                                    style={styles.headTable}
                                                    textStyle={styles.textTable}
                                                />
                                                <Rows data={state.tableData} textStyle={styles.textTable} />
                                            </Table>
                                        </View>
                                    </View>
                                )}

                                {schedule?.task && (
                                    <View style={styles.containerTableCol}>
                                        <Text style={[styles.titleLeftSchedule, { color: '#204D7D', fontWeight: 600 }]}>
                                            {' '}
                                            {t('Detail')}:
                                        </Text>
                                        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff', marginTop: 10 }}>
                                            <TableWrapper style={styles.wrapperTableCol}>
                                                <Col
                                                    data={[
                                                        t('Task'),
                                                        t('Description'),
                                                        t('Coin'),
                                                        t('Reward'),
                                                        t('Deadline'),
                                                        t('Status'),
                                                    ]}
                                                    style={styles.titleTableCol}
                                                    heightArr={[28, 28]}
                                                    textStyle={styles.textTableCol}
                                                />
                                                <Rows
                                                    data={[
                                                        [schedule?.task?.name],
                                                        [schedule?.task?.description],
                                                        [schedule?.task?.coin],
                                                        [schedule?.task?.reward],
                                                        [schedule?.task?.deadline],
                                                        [schedule?.task?.status],
                                                    ]}
                                                    flexArr={[1, 2]}
                                                    style={styles.rowTableCol}
                                                    textStyle={styles.textTableCol}
                                                />
                                            </TableWrapper>
                                        </Table>
                                    </View>
                                )}

                                {/* {schedule?.task?.name && (
                                    <Text style={styles.titleSchedule}>
                                        <Text style={styles.titleLeftSchedule}> {t('Task')}: </Text>
                                        <Text style={styles.txtSchedule}> {schedule?.task?.name}</Text>
                                    </Text>
                                )}
                                {schedule?.task?.description && (
                                    <Text style={styles.titleSchedule}>
                                        <Text style={styles.titleLeftSchedule}> {t('Description')}: </Text>
                                        <Text style={styles.txtSchedule}> {schedule?.task?.description}</Text>
                                    </Text>
                                )}

                                {schedule?.task?.coin && (
                                    <Text style={styles.titleSchedule}>
                                        <Text style={styles.titleLeftSchedule}> {t('Coin')}: </Text>
                                        <Text style={styles.txtSchedule}> {schedule?.task?.coin}</Text>
                                    </Text>
                                )}

                                {schedule?.task?.reward && (
                                    <Text style={styles.titleSchedule}>
                                        <Text style={styles.titleLeftSchedule}> {t('Reward')}: </Text>
                                        <Text style={styles.txtSchedule}> {schedule?.task?.reward}</Text>
                                    </Text>
                                )}

                                {schedule?.task?.deadline && (
                                    <Text style={styles.titleSchedule}>
                                        <Text style={styles.titleLeftSchedule}> {t('Deadline')}: </Text>{' '}
                                        <Text style={styles.txtSchedule}> {schedule?.task?.deadline}</Text>
                                    </Text>
                                )}

                                {schedule?.task?.status && (
                                    <Text style={styles.titleSchedule}>
                                        <Text style={styles.titleLeftSchedule}> {t('Status')}:</Text>
                                        <Text style={styles.txtSchedule}> {schedule?.task?.status}</Text>
                                    </Text>
                                )} */}
                            </View>
                        );
                    })}

                    <Text style={styles.titleSchedule}>{t('Price')}:</Text>

                    <View style={styles.containerTable}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row
                                data={[t('Adult price'), t('Child price'), t('Baby price')]}
                                style={styles.headTable}
                                textStyle={styles.textTable}
                            />
                            <Rows
                                data={[[tour?.adultPrice, tour?.childPrice, tour?.babyPrice]]}
                                textStyle={styles.textTable}
                            />
                        </Table>
                    </View>

                    <Text style={styles.titleSchedule}>{t('Departure time')}:</Text>
                    {tour?.departureTimes?.length > 0 && (
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 10,
                                justifyContent: 'space-between',
                                paddingHorizontal: 40,
                            }}
                        >
                            <Text>{t('Start date')}</Text>

                            <Text>{t('End date')}</Text>
                        </View>
                    )}
                    {tour?.departureTimes?.map((time) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    backgroundColor: AppColors.backgroundPrimary,
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 40,
                                    paddingVertical: 5,
                                    borderColor: '#C4C4C4',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    marginBottom: 2,
                                }}
                            >
                                <Text style={styles.txtSchedule}>{time?.startDate}</Text>
                            </View>
                        );
                    })}
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
        marginBottom: 10,
        paddingBottom: 10,
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
    containerTable: { flex: 1, padding: 16, backgroundColor: '#fff' },
    headTable: { height: 40, backgroundColor: '#f1f8ff' },
    textTable: { margin: 6 },

    containerTableCol: { flex: 1, padding: 16, backgroundColor: '#fff' },
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
