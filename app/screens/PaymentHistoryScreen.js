import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import navigatorUtils from '../utils/navigator.utils';
import Styles, { shadow } from '../components/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../assets/AppColors';
import Const from '../components/Const';
import { Image } from 'react-native';
import TourCard from '../components/TourCard/TourCard';
import { useAccount, useAuth } from '../controllers/hook/AccountHook';
import bookingApi from '../controllers/api/bookingApi';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { formatCurrencyK } from '../utils/util';
import TourCardSaved from '../components/TourCard/TourCardSaved';
import paymentHistoryApi from '../controllers/api/paymentHistoryApi';
import PaymentCardHistory from '../components/paymentCard/PaymentCardHistory';

export default PaymentHistoryScreen = () => {
    const user = useAccount();
    const accessToken = useAuth();

    const [paymentHistories, setPaymentHistory] = useState([]);
    const getPaymentHistories = async () => {
        const data = await paymentHistoryApi.getPaymentHistoryOfUser(accessToken, user?.id);

        if (_.isArray(data?.data?.data)) {
            setPaymentHistory(data?.data?.data);
        }
    };

    useEffect(() => {
        getPaymentHistories();
    }, []);

    return (
        <View>
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
                <Text style={Styles.Text.titleS24}>Payment history</Text>
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

            <ScrollView>

                <View style={{ marginHorizontal: 10, top: 100, height: Const.fullScreenHeight }}>
                    {paymentHistories.map((paymentHistory) => {
                        return (
                            <PaymentCardHistory paymentHistory={paymentHistory}></PaymentCardHistory>
                        );
                    })}
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
    iconHeader: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
});
