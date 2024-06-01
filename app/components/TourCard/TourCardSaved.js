import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/AppColors';
import navigatorUtils from '../../utils/navigator.utils';
import { useTranslation } from 'react-i18next';

export default TourCardSaved = ({
    image,
    name,
    description,
    tour,
    taskStatus,
    status,
    taskDeadline,
    total,
    bookingDate,
    tourName,
    booking,
}) => {
    const { t } = useTranslation();
    const handleNavigateTourDetail = () => {
        // console.log('detail tour');
        navigatorUtils.navigate('DetailTourBookingScreen', { tour: tour, booking });
    };
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                handleNavigateTourDetail();
            }}
        >
            {image ? (
                <Image source={{ uri: image }} style={styles.image}></Image>
            ) : (
                <Image style={styles.image} source={require('../../assets/images/imgTourDefault.jpg')}></Image>
            )}
            <View style={{ marginHorizontal: 10, width: '70%', marginVertical: 5 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        textShadowColor: '#fff',
                        textShadowRadius: 10,
                        color: AppColors.backgroundHeader,
                    }}
                >
                    {tourName ? (tourName.length > 15 ? tourName.slice(0, 15) : tourName) : t('Tour card')}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text style={styles.titleDetail}>{t('Note')}</Text>
                    <Text
                        style={{
                            marginHorizontal: 10,
                            width: 'auto',
                            color: AppColors.ghostwhite,
                            fontWeight: 400,
                        }}
                    >
                        {description
                            ? description.length > 190
                                ? `${description.slice(0, 20)}...`
                                : description
                            : t('Description')}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text style={styles.titleDetail}>{t('Status')}</Text>
                    <Text
                        style={{
                            marginHorizontal: 10,
                            width: 'auto',
                            color: AppColors.ghostwhite,
                            fontWeight: 400,
                        }}
                    >
                        {status}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text style={styles.titleDetail}>{t('Deadline')}</Text>
                    <Text
                        style={{
                            marginHorizontal: 10,
                            width: 'auto',
                            color: AppColors.ghostwhite,
                            fontWeight: 400,
                        }}
                    >
                        {taskDeadline}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text style={styles.titleDetail}>{t('Date')}</Text>
                    <Text
                        style={{
                            marginHorizontal: 10,
                            width: 'auto',
                            color: AppColors.ghostwhite,
                            fontWeight: 400,
                        }}
                    >
                        {bookingDate}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text style={styles.titleDetail}>{t('Total')}</Text>
                    <Text
                        style={{
                            marginHorizontal: 10,
                            width: 'auto',
                            color: AppColors.ghostwhite,
                            fontWeight: 400,
                        }}
                    >
                        {total}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '30%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    container: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        backgroundColor: AppColors.blueBackGround,
        flexDirection: 'row',
        marginVertical: 10,
        padding: 5,
        // marginHorizontal: 10,
        // shadowColor: "black",
        // shadowRadius: 10,
        // shadowOpacity: 10,
        // shadowOffset: 10,
    },
    titleDetail: {
        marginHorizontal: 10,
        width: '25%',
        color: AppColors.ghostwhite,
        // fontWeight: 400,
    },
});
