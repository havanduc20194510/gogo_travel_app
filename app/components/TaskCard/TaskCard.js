import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppColors from '../../assets/AppColors';
import navigatorUtils from '../../utils/navigator.utils';
import { useTranslation } from 'react-i18next';

export default TaskCard = ({
    task = {
        id: 1,
        name: 'ghé thăm quá cà phê abc ở thành phố Hạ Long',
        description: '',
        coin: 100,
        reward: 'xu hoặc hiện vật',
        taskType: {
            id: 2,
            name: 'thăm quan',
        },
    },
}) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                console.log('abc task');
            }}
        >
            <View style={{ marginHorizontal: 10, width: '100%', marginVertical: 5 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                    }}
                >
                    {task?.tourName.length > 25 ? task?.tourName.substr(0, 25) : task?.tourName ?? 'Task'}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {task?.email ?? t('Email')}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {task?.phone ?? t('Phone')}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {task?.taskDeadline ?? t('Task deadline')}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 10,
                        width: 'auto',
                        color: AppColors.ghostwhite,
                        fontWeight: 400,
                    }}
                >
                    {task?.taskStatus ?? t('Status')}
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
