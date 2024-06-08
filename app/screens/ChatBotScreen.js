import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TourCard from '../components/TourCard/TourCard';
import { ScrollView } from 'react-native-gesture-handler';
import HideSearchInput from '../components/input/HideSearchInput';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Selector from '../components/input/Selector';
import DatePicker from '../components/picker/DatePicker';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import tourApi from '../controllers/api/tourApi';
import _ from 'lodash';
import Const from '../components/Const';
import MultiSliderRangeNumber from '../components/multi-slider/MultiSliderRangeNumber';
import AppColors from '../assets/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectInput from '../components/input/SelectInput';
import DialogError from '../components/dialog/error/DialogError';
import Styles from '../components/Styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import navigatorUtils from '../utils/navigator.utils';
import PlaceSuggestionByChatBot from '../components/PlaceCard/PlaceSuggestionByChatBot';
import placeApi from '../controllers/api/placceApi';
import GlobalIndicator from '../components/indicator/GlobalIndicator';

const accessToken = '';

export default ChatBotScreen = () => {
    let image =
        'https://png.pngtree.com/background/20210710/original/pngtree-universal-world-travel-self-driving-tour-cartoon-background-picture-image_1053651.jpg';

    const [destination, setDestination] = useState('');
    const [time, setTime] = useState('');
    const [activities, setActivities] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { t } = useTranslation();

    const [tours, setTours] = useState([]);

    const handleLoadMore = () => {
        setPageSize(pageSize + 10);
    };

    const getPlaces = async () => {
        GlobalIndicator.show(t('Searching'), 'circle');
        let data = await placeApi.suggestion(accessToken, {
            location: destination,
            time: time,
            activity: activities,
            pageSize: pageSize,
        });
        console.log('  data: ', JSON.stringify(data));
        if (data?.status === 'error') {
            setShowError(!showError);
            setErrorMessage(data?.error);
        } else {
            data = data?.data?.data ?? data?.data ?? data;
            setTours(data ?? []);
        }

        GlobalIndicator.hide();
        // console.log('tours: ', tours);
    };

    // useEffect(() => {}, [destination, time, activities]);

    return (
        // container
        <View>
            {/* <DialogError></DialogError> */}
            {/* header */}
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // margin: 20
                    width: Const.fullWindowWidth,
                    top: 30,
                    position: 'absolute',
                    zIndex: 1,
                    flexDirection: 'row',
                }}
            >
                <TouchableOpacity
                    style={styles.iconHeader}
                    onPress={() => {
                        navigatorUtils.goBack();
                    }}
                >
                    <Ionicons name="arrow-back-outline" size={24}></Ionicons>
                </TouchableOpacity>
                <Text style={Styles.Text.titleS24}>{t('GoGoBot')}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.iconHeader}
                        onPress={() => {
                            navigatorUtils.goBack();
                        }}
                    >
                        <FontAwesome5 name="pencil-alt" size={24}></FontAwesome5>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconHeader}
                        onPress={() => {
                            navigatorUtils.goBack();
                        }}
                    >
                        <Ionicons name="share-outline" size={24}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            {showError && (
                <DialogError
                    setVisible={setShowError}
                    visible={showError}
                    labelCancel={'Cancel'}
                    labelOk={'OK'}
                    title={t('Search failed')}
                    description={errorMessage}
                ></DialogError>
            )}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* Destination */}
                <View style={{ alignItems: 'center' }}>
                    {/* search field destination */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Destination')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('Where do you want to go to?')}
                            value={destination}
                            onChangeText={(e) => {
                                setDestination(e);
                                // console.log(destination);
                            }}
                            onClearData={() => {
                                setDestination('');
                            }}
                            style={styles.inputSearchField}
                        ></HideSearchInput>
                    </View>

                    {/* search field time */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Time')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('When do you go travel?')}
                            value={time}
                            onChangeText={(e) => {
                                setTime(e);
                                // console.log(time);
                            }}
                            onClearData={() => {
                                setTime('');
                            }}
                            style={styles.inputSearchField}
                        ></HideSearchInput>
                    </View>

                    {/* search field activities */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Activities')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('What do you want?')}
                            value={activities}
                            onChangeText={(e) => {
                                setActivities(e);
                                // console.log(activities);
                            }}
                            onClearData={() => {
                                setActivities('');
                            }}
                            style={styles.inputSearchField}
                        ></HideSearchInput>
                    </View>

                    <ButtonFullBgr
                        title={t('Search')}
                        fontSize={20}
                        style={{ width: '60%', marginVertical: 20 }}
                        onPress={() => {
                            // console.log('Search');
                            getPlaces();
                        }}
                    ></ButtonFullBgr>
                </View>

                {tours.map((tour) => {
                    return (
                        <PlaceSuggestionByChatBot
                            image={tour?.img ?? image}
                            name={tour?.name ?? null}
                            description={tour.description}
                            tour={tour}
                        ></PlaceSuggestionByChatBot>
                    );
                })}

                {tours?.length > 0 && (
                    <TouchableOpacity
                        style={{
                            margin: 10,
                            color: AppColors.blueColor,
                            alignItems: 'center',
                            marginVertical: 30,
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            handleLoadMore();
                        }}
                    >
                        <Text style={{ fontSize: 16, color: '#2f4f4f', fontWeight: 600 }}>
                            {t('Load more')}
                            <Ionicons name={'chevron-down-outline'} size={16}></Ionicons>
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20,
        top: 70,
        height: Const.fullWindowHeight - 80,
    },
    txtTitleSearchField: {
        fontSize: 16,
        width: Const.fullScreenWidth / 4,
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
    },
    boxSearchField: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 30,
        width: Const.fullScreenWidth - 40,
    },
    inputSearchField: {
        width: '75%',
        // backgroundColor: "#FFFBF6",
        // marginHorizontal: 35,
        height: 45,
        paddingHorizontal: 10,
        borderColor: 'red',
        borderBottomWidth: 0.5,
    },
    iconHeader: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
});
