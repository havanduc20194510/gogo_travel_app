import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import navigatorUtils from '../utils/navigator.utils';
import Styles, { shadow } from '../components/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppColors from '../assets/AppColors';
import Const from '../components/Const';
import { Image } from 'react-native';
import TourCard from '../components/TourCard/TourCard';

export default SavedScreen = () => {
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
                <View>
                    <Image
                        source={require('../assets/images/imgDefaultBackgroundSaved.jpg')}
                        style={{
                            objectFit: 'cover',
                            width: Const.fullScreenWidth,
                            height: (Const.fullScreenHeight * 3) / 10,
                        }}
                    ></Image>

                    <View
                        style={{
                            position: 'relative',
                            zIndex: 3,
                            top: -120,
                            marginHorizontal: 20,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Collection</Text>
                    </View>

                    {/* avatar */}
                    <View
                        style={{
                            position: 'relative',
                            zIndex: 3,
                            top: -100,
                            marginHorizontal: 20,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{ width: 50, height: 50, ...shadow, flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => {
                                // navigatorUtils.goBack();
                            }}
                        >
                            <Image
                                source={require('../assets/images/imgDefaultAvatar.jpg')}
                                style={{ width: 50, height: 50, borderRadius: 20 }}
                            ></Image>

                            <Text
                                style={{
                                    marginLeft: 20,
                                    width: (Const.fullScreenWidth * 3) / 10,
                                    fontWeight: 600,
                                    color: '#FFFCF2',
                                }}
                            >
                                Ha VN
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: '#8D0000',
                                borderRadius: 10,
                                backgroundColor: '#F0D2CA',
                            }}
                            onPress={() => {
                                // navigatorUtils.goBack();
                            }}
                        >
                            <Ionicons name="camera-outline" size={25}></Ionicons>
                        </TouchableOpacity>
                    </View>

                    <View style={{ top: -70, marginHorizontal: 10 }}>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                        <TourCard></TourCard>
                    </View>
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
