import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TourCard from '../components/TourCard/TourCard';
import { ScrollView } from 'react-native-gesture-handler';
import HideSearchInput from '../components/input/HideSearchInput';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Selector from '../components/input/Selector';
import DatePicker from '../components/picker/DatePicker';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import placeApi from '../controllers/api/placceApi';
import _ from 'lodash';
import AppColors from '../assets/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const accessToken = '';

export default PlaceScreen = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(10);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [activities, setActivities] = useState('');

    const [places, setPlaces] = useState([]);
    const getPlace = async () => {
        const data = await placeApi.search(accessToken, name, address, activities, 1, pageSize);
        // console.log('place: ', data?.data?.data?.content);
        if (_.isArray(data?.data?.data?.content)) {
            setPlaces(data?.data?.data?.content);
        }

        // console.log('place: ', places);
    };

    const handleLoadMore = () => {
        setPageSize(pageSize + 10);
    };

    useEffect(() => {
        getPlace();
    }, [name, address, activities, pageSize]);

    // console.log('place: ', places);

    return (
        // container
        <View style={{ alignItems: 'center' }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* search */}
                <View style={{ alignItems: 'center' }}>
                    {/* search field name */}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Name')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('Type your mind')}
                            value={name}
                            onChangeText={(e) => {
                                setName(e);
                            }}
                            onClearData={() => {
                                setName('');
                            }}
                            style={styles.inputSearchField}
                            onSearch={() => {}}
                        ></HideSearchInput>
                    </View>

                    {/* search field address*/}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Address')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('Type your mind')}
                            value={address}
                            onChangeText={(e) => {
                                setAddress(e);
                            }}
                            onClearData={() => {
                                setAddress('');
                            }}
                            style={styles.inputSearchField}
                            onSearch={() => {}}
                        ></HideSearchInput>
                    </View>

                    {/* search field activities*/}
                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Activities')}</Text>
                        <HideSearchInput
                            onFocus={() => {
                                console.log('on forcus');
                            }}
                            txtPlaceHolder={t('Type your mind')}
                            value={activities}
                            onChangeText={(e) => {
                                setActivities(e);
                            }}
                            onClearData={() => {
                                setActivities('');
                            }}
                            style={styles.inputSearchField}
                            onSearch={() => {}}
                        ></HideSearchInput>
                    </View>

                    {/* <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Date')}</Text>
                        <DatePicker></DatePicker>
                    </View>

                    <View style={styles.boxSearchField}>
                        <Text style={styles.txtTitleSearchField}>{t('Activity')}</Text>
                        <Selector></Selector>
                    </View> */}

                    {/* <ButtonFullBgr
                        title={t('Search')}
                        fontSize={20}
                        style={{ width: '60%' }}
                        onPress={() => {
                            // console.log('Search 123');
                            getPlace();
                        }}
                    ></ButtonFullBgr> */}
                </View>

                {places.map((place) => {
                    return <PlaceCard place={place}></PlaceCard>;
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
        width: '20%',
        // marginHorizontal: 30
    },
    boxSearchField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    inputSearchField: {
        width: '75%',
        // backgroundColor: "#FFFBF6",
        marginHorizontal: 35,
        height: 45,
        paddingHorizontal: 10,
        borderColor: 'red',
        borderBottomWidth: 0.5,
    },
});
