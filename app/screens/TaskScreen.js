import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TourCard from '../components/TourCard/TourCard';
import { ScrollView } from 'react-native-gesture-handler';
import HideSearchInput from '../components/input/HideSearchInput';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Selector from '../components/input/Selector';
import DatePicker from '../components/picker/DatePicker';
import ButtonFullBgr from '../components/buttons/custom/ButtonFullBgr';
import tourApi from '../controllers/api/tourApi';
import _ from 'lodash';
import Const from '../components/Const';
import MultiSliderRangeNumber from '../components/multi-slider/MultiSliderRangeNumber';
import AppColors from '../assets/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectInput from '../components/input/SelectInput';
import DialogError from '../components/dialog/error/DialogError';
import { useAccount, useAuth } from '../controllers/hook/AccountHook';
import SearchHeader from '../components/header/SearchHeader';
import TaskCard from '../components/TaskCard/TaskCard';
import taskApi from '../controllers/api/taskApi';

export default TaskScreen = () => {
    const accessToken = useAuth();
    const { t } = useTranslation();
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        const result = await taskApi.listTask(accessToken);
        if (_.isArray(result?.data?.data)) {
            setTasks(result?.data?.data);
            console.log('result: ', JSON.stringify(tasks));
        }
    };

    useEffect(() => {
        getTasks();
    }, []);
    return (
        // container
        <View>
            {/* <DialogError></DialogError> */}
            <SearchHeader></SearchHeader>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {tasks.map((task) => {
                    return <TaskCard task={task}></TaskCard>;
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20,
        height: Const.fullWindowHeight - 80,
        // backgroundColor: 'red',
    },
    txtTitleSearchField: {
        fontSize: 16,
        width: Const.fullScreenWidth / 4,
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
    },
    boxSearchField: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 30,
        width: Const.fullScreenWidth - 40,
    },
    inputSearchField: {
        width: '75%',
        // backgroundColor: "#FFFBF6",
        // marginHorizontal: 35,
        height: 45,
        paddingHorizontal: 10,
        borderColor: 'red',
        borderBottomWidth: 0.5,
    },
});
