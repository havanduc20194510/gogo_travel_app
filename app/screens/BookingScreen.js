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

const accessToken = '';

export default BookingScreen = () => {
    let image =
        'https://png.pngtree.com/background/20210710/original/pngtree-universal-world-travel-self-driving-tour-cartoon-background-picture-image_1053651.jpg';

    const [txtSearch, setTxtSearch] = useState('');
    const [destination, setDestination] = useState('');
    const [departureLocation, setDepartureLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [numberOfDay, setNumberOfDay] = useState(5);
    const [filterPriceMin, setFilterPriceMin] = useState(0);
    const [filterPriceMax, setFilterPriceMax] = useState(10000);
    const [filterType, setFilterType] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const { t } = useTranslation();

    const [tours, setTours] = useState([]);
    const getTours = async () => {
        const data = await tourApi.search(accessToken, {
            destination,
            departureLocation,
            startDate,
            numberOfDay,
            filterPriceMin: filterPriceMin * 100000,
            filterPriceMax: filterPriceMax * 100000,
            filterType: filterType?.title,
        });

        // console.log('  data: ', data);

        if (_.isArray(data?.data?.data?.content)) {
            setTours(data?.data?.data?.content);
        }

        // console.log('tours: ', tours);
    };
    useEffect(() => {
        getTours();
    }, [destination, departureLocation, startDate, numberOfDay, filterPriceMax, filterPriceMin, filterType]);

    // const [tourType, setTourType] = useState([]);
    const getTourType = async () => {
        const data = await tourApi.tourType(accessToken);

        if (_.isArray(data?.data?.data)) {
            setFilterType(
                data?.data?.data.map((type) => {
                    return {
                        title: type.name,
                    };
                }),
            );
        }
    };
    useEffect(() => {
        getTourType();
    }, []);

    const handleCustomSliderPrice = (value) => {
        setFilterPriceMin(value[0]);
        setFilterPriceMax(value[1]);
    };

    const handleLoadMore = () => {
        setPageSize(pageSize + 10);
    };

    return (
        // container
        <View>
            {/* <DialogError></DialogError> */}
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
                                console.log(destination);
                            }}
                            onClearData={() => {
                                setDestination('');
                            }}
                            style={styles.inputSearchField}
                        ></HideSearchInput>
                    </View>

                    {/* search field departureLocation */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Departure location')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('Departure location')}
                            value={departureLocation}
                            onChangeText={(e) => {
                                setDepartureLocation(e);
                                console.log(departureLocation);
                            }}
                            onClearData={() => {
                                setDepartureLocation('');
                            }}
                            style={styles.inputSearchField}
                        ></HideSearchInput>
                    </View>

                    {/* search field startDate */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Date')}</Text>
                        <DatePicker setStartDate={setStartDate}></DatePicker>
                    </View>

                    {/* search field numberOfDay */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Number of date')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('Number of date')}
                            value={numberOfDay}
                            onChangeText={(e) => {
                                setNumberOfDay(e);
                                console.log(numberOfDay);
                            }}
                            onClearData={() => {
                                setNumberOfDay('');
                            }}
                            style={styles.inputSearchField}
                            keyboardType={'numeric'}
                            onSearch={() => {}}
                        ></HideSearchInput>
                    </View>

                    {/* search field filterType */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Tour type')}</Text>
                        {/* <Selector dataSelect={setFilterType} placeholder={t('Type')}></Selector> */}
                        <View
                            style={{
                                width: '75%',
                                // backgroundColor: "#FFFBF6",
                                // marginHorizontal: 35,
                                height: 45,
                                paddingHorizontal: 10,
                                // borderColor: 'red',
                                // backgroundColor: 'red',
                                alignItems: 'center',
                                marginLeft: 20,
                            }}
                        >
                            <SelectInput data={filterType} setFilterType={setFilterType}></SelectInput>
                        </View>
                    </View>

                    {/* search field price */}
                    <View style={[styles.boxSearchField, {}]}>
                        <Text style={styles.txtTitleSearchField}>{t('Price')}</Text>
                    </View>
                    <View
                        style={{
                            // width: (Const.fullScreenWidth * 1) / 3,
                            // backgroundColor: "#FFFBF6",
                            // marginHorizontal: 35,
                            height: 45,
                            paddingHorizontal: 10,
                        }}
                    >
                        <MultiSliderRangeNumber
                            handleCustomSliderValue={handleCustomSliderPrice}
                            max={10000}
                            min={1}
                        ></MultiSliderRangeNumber>
                    </View>

                    {/* <ButtonFullBgr
                        title={t('Search')}
                        fontSize={20}
                        style={{ width: '60%' }}
                        onPress={() => {
                            console.log('Search');
                            getTours();
                        }}
                    ></ButtonFullBgr> */}
                </View>

                {tours.map((tour) => {
                    return (
                        <TourCard
                            image={tour?.images[0]?.url ?? image}
                            name={tour?.name ?? null}
                            description={tour.description}
                            tour={tour}
                        ></TourCard>
                    );
                })}

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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { borderRadius: 8, paddingHorizontal: 8, marginBottom: 20 },
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
});
