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

export default ProfileScreen = () => {
    const { t } = useTranslation();
    const handleSetting = () => {
        console.log('handle setting');
    };
    const handleMyTour = () => {
        console.log('handle my tour');
    };
    const handleFaq = () => {
        console.log('handle faq');
    };
    const handleLogOut = () => {
        console.log('handle log out');
    };
    return (
        <View style={{}}>
            <CardProfile
                onPress={() => {
                    console.log('avc');
                }}
            ></CardProfile>
            <View style={{ backgroundColor: 'red' }}>
                <TouchableOpacity
                    onPress={() => {
                        handleFaq();
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
                            top: 150,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>anc def</Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleFaq();
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
                            top: 150,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>anc def</Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleFaq();
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
                            top: 150,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Ionicons name="settings-outline" size={26}></Ionicons>

                        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: 'center' }}>anc def</Text>
                        <MaterialIcons name="keyboard-double-arrow-right" size={26}></MaterialIcons>
                    </View>
                </TouchableOpacity>

                {/* 
                <CardRowNavigate
                    title={t('Setting')}
                    leftIcon={<Ionicons name="settings-outline" size={26}></Ionicons>}
                    onPress={() => {
                        handleSetting();
                    }}
                ></CardRowNavigate>

                <CardRowNavigate
                    title={t('FAQs')}
                    leftIcon={<Ionicons name="information-circle-outline" size={26}></Ionicons>}
                    onPress={() => {
                        handleFaq();
                    }}
                ></CardRowNavigate>

                <CardRowNavigate
                    title={t('Logout')}
                    leftIcon={<MaterialIcons name="logout" size={26}></MaterialIcons>}
                    rightIcon={<View style={{ width: 26, height: 26 }}></View>}
                    onPress={() => {
                        handleLogOut();
                    }}
                ></CardRowNavigate>

                <CardRowNavigate
                    title={t('My Tour')}
                    leftIcon={<Ionicons name="receipt-outline" size={26}></Ionicons>}
                    onPress={() => {
                        handleMyTour();
                    }}
                ></CardRowNavigate> */}
            </View>
        </View>
    );
};
