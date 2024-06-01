import { Linking, StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/AppColors';
import navigatorUtils from '../../utils/navigator.utils';
import { useTranslation } from 'react-i18next';

export default PlaceSuggestionByChatBot = ({ image, name, description, tour }) => {
    const { t } = useTranslation();
    const handleNavigateTourDetail = () => {
        // console.log('detail tour');
        // navigatorUtils.navigate('DetailTourScreen', { tour: tour });
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=Hanoi');
        // const latitude = '40.7127753';
        // const longitude = '-74.0059728';
        // const label = 'New York, NY, USA';

        // const url = Platform.select({
        //     ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
        //     android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
        // });

        // Linking.canOpenURL(url).then((supported) => {
        //     if (supported) {
        //         return Linking.openURL(url);
        //     } else {
        //         const browser_url = 'https://www.google.de/maps/@' + latitude + ',' + longitude + '?q=' + label;
        //         console.log('browser_url: ', browser_url);
        //         return Linking.openURL(browser_url);
        //     }
        // });
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
                    {name ? (name.length > 15 ? name.slice(0, 15) : name) : t('Tour card')}
                </Text>
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
                            ? `${description.slice(0, 190)}...`
                            : description
                        : t('Description')}
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
