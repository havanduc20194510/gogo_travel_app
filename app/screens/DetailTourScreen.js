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
import { useState } from 'react';
import SearchHeader from '../components/header/SearchHeader';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import ButtonIcon from '../components/buttons/custom/ButtonIcon';

export default DetailTourScreen = () => {
    const { t } = useTranslation();
    const tour = {
        description:
            'Aspen is as close  as one can get a storybook alpine town in America. The choose-your-own-advenfgddfdfdfffffffffffffffffffffffffffffff \n fffffffture possibilities—skiing, hiking, dining shopping anssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd ....as one can get a storybook alpine town in America. The choose-your-own-advenfgddfdfdfffffffffffffffffffffffffffffff \n fffffffture possibilities—skiing, hiking, dining shopping anssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd ....as one can get a storybook alpine town in America. The choose-your-own-advenfgddfdfdfffffffffffffffffffffffffffffff \n fffffffture possibilities—skiing, hiking, dining shopping anssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd ....as one can get a storybook alpine town in America. The choose-your-own-advenfgddfdfdfffffffffffffffffffffffffffffff \n fffffffture possibilities—skiing, hiking, dining shopping anssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd ....',
    };

    const [desTour, setDesTour] = useState(
        tour.description.length > 15 ? tour.description.substr(0, 150) : tour.description,
    );
    const [readMoreIcon, setReadMoreIcon] = useState(false);

    const handleReadMore = () => {
        if (readMoreIcon) {
            setDesTour(tour.description.length > 15 ? tour.description.substr(0, 150) : tour.description);
        } else {
            setDesTour(tour.description);
        }
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
                    <Image
                        source={require('../assets/images/default_tour.jpg')}
                        style={{
                            width: Const.fullScreenWidth - 20,
                            height: Const.fullScreenWidth + 50,
                            objectFit: 'cover',
                            borderRadius: 50,
                            marginTop: 50,
                        }}
                    ></Image>

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
                {/* place */}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 36,
                            fontWeight: 700,
                            marginTop: 10,
                            width: '60%',
                            maxHeight: 50,
                        }}
                    >
                        HaNoi capital
                    </Text>
                    <TouchableOpacity style={{ marginTop: 10, marginRight: 20 }}>
                        <Text style={{ fontSize: 16, color: AppColors.blueColor, fontWeight: 500 }}>
                            {t('Show map')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* rate */}
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                    <Ionicons name="star" size={24} color={'#DF9652'}></Ionicons>
                    <Text style={{ color: '#606060', marginHorizontal: 20 }}>4.5 (355 Reviews)</Text>
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
                        {t('Read more')}{' '}
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
                        <Text style={{ fontSize: 36, fontWeight: 700 }}>
                            <FontAwesome6 name="hand-holding-dollar" size={30}></FontAwesome6>199
                        </Text>
                    </View>
                    <ButtonIcon
                        title={t('Book now')}
                        fontSize={24}
                        icon={<Ionicons name="arrow-forward-outline" color={AppColors.white} size={36}></Ionicons>}
                        width={'70%'}
                        height={60}
                        onPress={() => {
                            // console.log('book');
                            navigatorUtils.navigate('PaymentMethodScreen');
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
});
