import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/AppColors';
import navigatorUtils from '../../utils/navigator.utils';

export default TourCard = ({ image }) => {
    const handleNavigateTourDetail = () => {
        console.log('detail tour');
        navigatorUtils.navigate('DetailTourScreen');
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
                    }}
                >
                    Tour card
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    Khám phá hành trình đặc biệt trên siêu du thuyền Genting Dream, một kỳ nghỉ xa hoa với không gian
                    nghỉ dưỡng và giải trí đỉnh cao. Với 18 tầng, 1674 phòng cùng hồ bơi, nhà hàng, spa...
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
        // marginHorizontal: 10,
        // shadowColor: "black",
        // shadowRadius: 10,
        // shadowOpacity: 10,
        // shadowOffset: 10,
    },
});
