import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../assets/AppColors';
import Global from '../components/Global';
import { BackgroundImgContainer } from '../components/background/Background';
import navigatorUtils from '../utils/navigator.utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import AppTextInput from '../components/input/AppTextInput';
import AppPasswordInput from '../components/input/AppPasswordInput';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import { useTranslation } from 'react-i18next';
import authApi from '../controllers/api/authApi';
import { useDispatch } from 'react-redux';
import { AccountAction } from '../controllers/slice/AccountSlice';
import GlobalIndicator from '../components/indicator/GlobalIndicator';
import DialogError from '../components/dialog/error/DialogError';

export default LoginScreen = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        GlobalIndicator.show(t('Sending'));
        const res = await authApi.signIn(name, pass);
        console.log('data: ', res);
        if (res?.status === 'error') {
            setShowError(!showError);
            setErrorMessage(res?.error);
        } else {
            dispatch(
                AccountAction.updateState({
                    account: res.data?.data?.user,
                    accessToken: res.data?.data?.token,
                    authenticated: res.data?.data?.authenticated,
                }),
            );
            navigatorUtils.navigate('OnBoardingScreen');
        }

        GlobalIndicator.hide();
    };

    return (
        <BackgroundImgContainer
            source={require('../assets/images/bg_auth.jpg')}
            imageStyle={{
                height: Global.Const.fullScreenHeight,
            }}
        >
            {showError && (
                <DialogError
                    setVisible={setShowError}
                    visible={showError}
                    labelCancel={'Cancel'}
                    labelOk={'OK'}
                    title={t('Login failed')}
                    description={errorMessage}
                ></DialogError>
            )}
            <View style={{ position: 'relative' }}>
                <ScrollView>
                    <View
                        style={{
                            // // position: 'absolute',
                            paddingTop: 30,
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                marginTop: 0,
                                // borderRadius: "20px",
                                height: Global.Const.fullScreenHeight - 284,
                                width: '100%',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    overflow: 'scroll',
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        // width: "100%",
                                        marginTop: 20,
                                    }}
                                >
                                    <View style={{ marginRight: 20 }}></View>
                                    <View style={{ width: 'auto' }}>
                                        <Text
                                            style={{
                                                color: AppColors.ghostwhite,
                                                fontSize: 32,
                                                fontWeight: 600,
                                                lineHeight: 46,
                                            }}
                                        >
                                            {t('Login')}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        // width: "100%",
                                        marginTop: 20,
                                    }}
                                >
                                    <View style={{ marginRight: 20 }}></View>
                                    <View style={{ width: 'auto' }}>
                                        <TouchableOpacity
                                            style={{
                                                color: AppColors.ghostwhite,
                                                fontSize: 32,
                                                fontWeight: 600,
                                                lineHeight: 46,
                                            }}
                                            onPress={() => {
                                                console.log('OK 1');
                                            }}
                                        >
                                            <MaterialCommunityIcons name="home-outline" size={35} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginVertical: 24, marginHorizontal: 20 }}>
                                {/*  username */}
                                <View>
                                    <AppTextInput
                                        title={t('Username')}
                                        value={name}
                                        isNumber={false}
                                        placeholder={t('Username')}
                                        onChangeText={(text) => {
                                            // dispatch(AccountActions.setCurrentPhone(text));
                                            setName(text);
                                        }}
                                        // editable={true}

                                        onClear={() => {
                                            setName('');
                                            // dispatch(AccountActions.setCurrentPhone(''));
                                        }}
                                        borColor={AppColors.neutral}
                                        message={''}
                                    />
                                </View>

                                {/* password */}
                                <View style={{ marginTop: 16 }}>
                                    <AppPasswordInput
                                        value={pass}
                                        title={t('Password')}
                                        placeholder={t('Password')}
                                        // message={messRePassword}
                                        type="password"
                                        onChangeText={(text) => {
                                            setPass(text);
                                        }}
                                        borColor={AppColors.neutral}
                                        onClear={() => {
                                            setPass('');
                                        }}
                                    />

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Text
                                            style={{
                                                paddingTop: 8,
                                                color: `${AppColors.ghostwhite}`,
                                                fontWeight: 600,
                                            }}
                                            onPress={() => {}}
                                        >
                                            {t('Forgot password')} ?
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginHorizontal: 20,
                                    marginTop: 30,
                                }}
                            >
                                <ButtonFullBgr
                                    onPress={async () => {
                                        handleLogin();
                                        console.log('handle login');
                                    }}
                                    title={t('Login')}
                                    style={{ width: '85%' }}
                                />
                                <TouchableOpacity
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        console.log('handle login biometric');
                                    }}
                                >
                                    <MaterialCommunityIcons name="face-recognition" size={30} color="#900" />
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    marginHorizontal: 20,
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <Text
                                    onPress={() => {
                                        navigatorUtils.navigate('RegisterScreen');
                                    }}
                                    style={{ color: `${AppColors.ghostwhite}` }}
                                >
                                    {t("Don't have account")} ?
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </BackgroundImgContainer>
    );
};
