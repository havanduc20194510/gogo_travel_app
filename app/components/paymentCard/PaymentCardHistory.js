import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/AppColors';
import navigatorUtils from '../../utils/navigator.utils';
import { useTranslation } from 'react-i18next';

export default PaymentHistoryCard = ({ image, paymentHistory }) => {
    const { t } = useTranslation();

    console.log("paymentHistory: ", paymentHistory);
    const handleNavigateTourDetail = () => {
        console.log('detail tour');
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
                    {paymentHistory.tourName ? (paymentHistory.tourName.length > 15 ? `${paymentHistory.tourName.slice(0, 15)}...` : paymentHistory.tourName) : t('Tour card')}
                </Text>

                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {t("Amount")}: {paymentHistory?.amount}
                </Text>

                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {t("Payment method")}: {paymentHistory?.paymentMethod}
                </Text>

                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {t("Phone")}: {paymentHistory?.phone}
                </Text>

                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {t(".No")}: {paymentHistory?.transactionNo}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {t("Status")}: {paymentHistory?.paymentStatus}
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
