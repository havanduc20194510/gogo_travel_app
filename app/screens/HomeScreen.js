import {
    Alert,
    Linking,
    PermissionsAndroid,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Banner from '../components/banner/Banner';
import { useTranslation } from 'react-i18next';
import Assets from '../assets/Assets';
import Styles, { Font, FontSize } from '../components/Styles';
import Const from '../components/Const';
import BannerVertical from '../components/banner/bannerVertical';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppIcons from '../assets/AppIcons';
import AppColors from '../assets/AppColors';

export default HomeScreen = () => {
    const { t } = useTranslation();

    useEffect(() => {
        const result = async () => {
            await requestLocationPermission();
        };
        result();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
                title: 'GoGo Travel App Location Permission',
                message: 'GoGo Travel App needs access to your location ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });
            console.log('granted: ', granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation();
                console.log('You can use the location');
            } else {
                console.log('Location permission denied');
            }
            return;
        } catch (error) {
            console.warn(error);
        }
    };

    const [currentLocation, setCurrentLocation] = useState(null);
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                console.log(latitude, longitude);
            },
            (error) => {
                console.log(error);
                alert(error?.message ?? "Don't permission location!");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
        );
    };

    const openMaps = () => {
        const { latitude, longitude } = currentLocation;
        if (latitude && longitude) {
            const url = `https://www.google.com/maps/search/?api=1&latitude=${latitude}&longitude=${longitude}`;
            console.log(url);
            Linking.openURL(url);
        } else {
            alert('Location not available!');
        }
    };

    return (
        <View>
            <ScrollView>
                <View
                    style={{
                        alignItems: 'flex-end',
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            // console.log(currentLocation?.latitude, currentLocation?.longitude);
                        }}
                        style={{ alignItems: 'flex-end', flexDirection: 'row' }}
                    >
                        {currentLocation?.latitude && currentLocation?.longitude ? (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        openMaps();
                                    }}
                                >
                                    <Text style={styles.textLocation}>
                                        {currentLocation?.latitude} {currentLocation?.longitude}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <TouchableOpacity
                                    onPress={async () => {
                                        await requestLocationPermission();
                                    }}
                                >
                                    <Text style={styles.textLocation}>Location</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <Ionicons name="location-outline" size={30}></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={[Styles.Other.cardViewEmpty, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="business-outline" size={40} color={AppColors.blueIcon}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="earth" size={40} color={AppColors.blueIcon}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="ribbon-outline" size={40} color={AppColors.blueIcon}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBanner}>
                        <Ionicons name="bus-outline" size={40} color={AppColors.blueIcon}></Ionicons>
                    </TouchableOpacity>
                </View>

                {/* Popular */}
                <View>
                    <Text
                        style={{
                            color: Assets.Colors.black,
                            fontSize: FontSize.s_24,
                            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
                            fontFamily: Font.light,
                            marginLeft: Const.paddingPage,
                            alignSelf: 'flex-start',
                        }}
                    >
                        {t('Top Tours')}
                    </Text>
                    <View>
                        {/* banner popular */}
                        <BannerVertical></BannerVertical>
                    </View>
                </View>

                {/* Recommended */}
                <View>
                    <Text
                        style={{
                            color: Assets.Colors.black,
                            fontSize: FontSize.s_24,
                            fontWeight: Platform.OS == 'ios' ? '600' : 'bold',
                            fontFamily: Font.light,
                            marginLeft: Const.paddingPage,
                            alignSelf: 'flex-start',
                        }}
                    >
                        {t('Top Places')}
                    </Text>
                    <View>
                        {/* banner Recommended */}
                        <Banner></Banner>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    textLocation: {
        fontSize: 15,
    },
    iconBanner: {
        padding: 5,
        color: 'red',
    },
});
