import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/AppColors';
import navigatorUtils from '../../utils/navigator.utils';
import { useTranslation } from 'react-i18next';

export default PlaceCard = ({ place }) => {
    const { t } = useTranslation();
    const handleNavigateTourDetail = () => {
        //  console.log('detail place');
        navigatorUtils.navigate('PlaceDetailScreen', { place: place });
    };
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                handleNavigateTourDetail();
            }}
        >
            {place?.images[0]?.url ? (
                <Image source={{ uri: place?.images[0]?.url }} style={styles.image}></Image>
            ) : (
                <Image style={styles.image} source={require('../../assets/images/imgTourDefault.jpg')}></Image>
            )}
            <View style={{ marginHorizontal: 10, width: '70%', marginVertical: 5 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                    }}
                >
                    {place?.name ?? 'Place'}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {place?.description ?? t('Description')}
                </Text>
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
});
