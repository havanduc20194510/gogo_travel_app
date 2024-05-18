import { Image, ScrollView, Text, View } from 'react-native';
import Const from '../components/Const';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import navigatorUtils from '../utils/navigator.utils';

export default ExploreScreen = () => {
    return (
        <ScrollView
            style={{
                position: 'relative',
                width: Const.fullScreenWidth,
            }}
        >
            <Image
                source={require('../assets/images/explore.jpg')}
                style={{
                    objectFit: 'fill',
                    width: Const.fullScreenWidth,
                    height: Const.fullScreenHeight,
                    // paddingVertical: 20,
                }}
            ></Image>
            <View
                style={{
                    position: 'absolute',
                    top: Const.fullScreenHeight / 4,
                    right: Const.fullScreenWidth / 2 - 100,
                    width: 200,
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'BeVietnamPro-ExtraBold',
                        fontSize: 50,
                        color: 'white',
                        // borderColor: "red",
                        // borderWidth: 10
                    }}
                >
                    Explore
                </Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 160,
                    left: 20,
                    alignItems: 'flex-start',
                    width: Const.fullScreenWidth,
                    marginLeft: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: 'BeVietnamPro-ExtraBold',
                        fontSize: 26,
                        color: 'white',
                        fontWeight: 300,
                        fontFamily: 'BeVietnamPro-Bold',
                        // borderColor: "red",
                        // borderWidth: 10
                    }}
                >
                    Plan your
                </Text>

                <Text
                    style={{
                        fontFamily: 'BeVietnamPro-Bold',
                        fontSize: 36,
                        color: 'white',
                        fontWeight: 500,
                        // borderColor: "red",
                        // borderWidth: 10
                    }}
                >
                    Luxurious
                </Text>

                <Text
                    style={{
                        fontFamily: 'BeVietnamPro-Bold',
                        fontSize: 36,
                        color: 'white',
                        fontWeight: 500,
                        // borderColor: "red",
                        // borderWidth: 10
                    }}
                >
                    Vacation
                </Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 80,
                    alignItems: 'center',
                    width: Const.fullScreenWidth,
                }}
            >
                <ButtonFullBgr
                    title="Explore"
                    width={311}
                    height={52}
                    style={{ borderRadius: 16, marginTop: 40 }}
                    fontSize={20}
                    bgrColor={'#196EEE'}
                    onPress={() => {
                        console.log('Explore');
                        navigatorUtils.navigate('LoginScreen');
                    }}
                ></ButtonFullBgr>
            </View>
        </ScrollView>
    );
};
