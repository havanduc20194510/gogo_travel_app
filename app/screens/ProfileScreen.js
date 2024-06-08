import { Text, TouchableOpacity, View } from 'react-native';
import CardProfile from '../components/card/cardProfile';
import Styles from '../components/Styles';
import CardRowNavigate from '../components/card/cardRowNavigate';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../assets/AppColors';
import Const from '../components/Const';
import UserHelper from '../utils/user.helper';
import navigatorUtils from '../utils/navigator.utils';
import { useAccount } from '../controllers/hook/AccountHook';

export default ProfileScreen = () => {
    const { t } = useTranslation();
    const user = useAccount();
    console.log('user: ', user);
    const handleSetting = () => {
        console.log('handle setting');
    };
    const handleMyTour = () => {
        navigatorUtils.navigate('SavedScreen');
        // console.log('handle my tour');
    };
    const handleTasks = () => {
        console.log('handle faq');
        navigatorUtils.navigate('TaskScreen');
    };
    const handlePaymentHistory = () => {
        navigatorUtils.navigate('PaymentHistoryScreen');
    };
    const handleLogOut = () => {
        console.log('handle log out');
        UserHelper.signOut();
        navigatorUtils.navigate('LoginScreen');
    };
    return (
        <View style={{}}>
            <CardProfile
                onPress={() => {
                    console.log('avc');
                }}
                user={user}
            ></CardProfile>
            <View style={{}}>
                {/* payment history */}
                <TouchableOpacity
                    onPress={() => {
                        handlePaymentHistory();
                    }}
                >
                    <View
                        style={{
                            borderRadius: Const.space_12,
                            backgroundColor: AppColors.white,
                            shadowColor: 'rgba(0,0,0,0.06)',
                            shadowOffset: { height: 12, width: 12 },
                            shadowOpacity: 1,
                            shadowRadius: 30,
                            elevation: 20,
                            paddingVertical: Const.space_12,
                            paddingHorizontal: Const.space_12,

                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>
                            {t('Payment history')}
                        </Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>

                {/* booking history */}
                <TouchableOpacity
                    onPress={() => {
                        handleMyTour();
                    }}
                >
                    <View
                        style={{
                            borderRadius: Const.space_12,
                            backgroundColor: AppColors.white,
                            shadowColor: 'rgba(0,0,0,0.06)',
                            shadowOffset: { height: 12, width: 12 },
                            shadowOpacity: 1,
                            shadowRadius: 30,
                            elevation: 20,
                            paddingVertical: Const.space_12,
                            paddingHorizontal: Const.space_12,

                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>
                            {t('Booking history')}
                        </Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleTasks();
                    }}
                >
                    <View
                        style={{
                            borderRadius: Const.space_12,
                            backgroundColor: AppColors.white,
                            shadowColor: 'rgba(0,0,0,0.06)',
                            shadowOffset: { height: 12, width: 12 },
                            shadowOpacity: 1,
                            shadowRadius: 30,
                            elevation: 20,
                            paddingVertical: Const.space_12,
                            paddingHorizontal: Const.space_12,

                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>Tasks</Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleLogOut();
                    }}
                >
                    <View
                        style={{
                            borderRadius: Const.space_12,
                            backgroundColor: AppColors.white,
                            shadowColor: 'rgba(0,0,0,0.06)',
                            shadowOffset: { height: 12, width: 12 },
                            shadowOpacity: 1,
                            shadowRadius: 30,
                            elevation: 20,
                            paddingVertical: Const.space_12,
                            paddingHorizontal: Const.space_12,

                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>{t('Log out')}</Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
