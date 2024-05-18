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
import _ from 'lodash';
const screenWidth = Const.fullScreenWidth;
const heightWidth = Const.fullScreenHeight;

export default PlaceDetailScreen = (params) => {
    const { t } = useTranslation();

    const [place, setPlace] = useState(params?.route?.params?.place ?? env.dev.defaultImagePlace);

    const [desPlace, setDesPlace] = useState(
        place?.description.length > 15 ? place?.description.substr(0, 150) : place?.description,
    );
    const [readMoreIcon, setReadMoreIcon] = useState(false);

    const handleReadMore = () => {
        if (readMoreIcon) {
            setDesPlace(place?.description.length > 15 ? place?.description.substr(0, 150) : place?.description);
        } else {
            setDesPlace(place?.description);
        }
    };

    const tableTimeOpenClose = {
        tableHead: [t('Time open'), t('Time close')],
        tableData: [[place?.timeOpen, place?.timeClose]],
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
                            data={
                                _.isArray(place?.images)
                                    ? place.images.map((img) => img.url)
                                    : [env.dev.defaultImagePlace]
                            }
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
                            dotsLength={place?.images?.length}
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
                {/* Place */}
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
                        {place?.name ?? t('Place')}
                    </Text>
                </View>
                {/* rate */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Ionicons name="star" size={24} color={'#DF9652'}></Ionicons>
                        <View style={{ color: '#606060', marginHorizontal: 20 }}>
                            <Text style={{}}>4.5 (355 Reviews)</Text>
                            <Text>{place?.totalView ?? 0} Views</Text>
                        </View>
                    </View>
                </View>

                {/* description */}
                <Text style={{ fontSize: 24, fontWeight: 700 }}>{t('Description')}</Text>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>{desPlace}</Text>
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

                {/* Location */}
                <Text style={{ fontSize: 24, fontWeight: 700 }}>{t('Location')}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>{place?.location}</Text>
                    <TouchableOpacity
                        style={{ marginRight: 20 }}
                        onPress={() => {
                            console.log('Show map');
                        }}
                    >
                        <Text style={{ fontSize: 16, color: AppColors.blueColor, fontWeight: 500 }}>
                            {t('Show map')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Note */}
                <Text style={{ fontSize: 24, fontWeight: 700 }}>{t('Note')}</Text>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>{place?.note}</Text>

                {/* Activities */}
                <Text style={{ fontSize: 24, fontWeight: 700 }}>{t('Activities')}</Text>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>{place?.activities}</Text>

                {/* time  */}
                <Text style={{ fontSize: 24, fontWeight: 700 }}>{t('Time')}</Text>
                <View style={styles.containerTable}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row
                            data={tableTimeOpenClose.tableHead}
                            style={styles.headTable}
                            textStyle={styles.textTable}
                        />
                        <Rows data={tableTimeOpenClose.tableData} textStyle={styles.textTable} />
                    </Table>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        paddingBottom: 50,
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
