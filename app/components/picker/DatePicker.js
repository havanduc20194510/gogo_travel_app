import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import moment from "moment";

export default DatePicker = () => {
    const [date, setDate] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(moment(currentDate).format("DD-MM-YYYY"));
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date ? new Date(date) : new Date(),
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <TouchableOpacity style={{
            width: "75%",
            // backgroundColor: "#FFFBF6",
            marginHorizontal: 35,
            height: 45,
            paddingHorizontal: 10,
            borderColor: "red",
            borderBottomWidth: 0.5,
            justifyContent: "center",
            // alignItems: "

        }} onPress={() => {
            showDatepicker()
        }}>

            <Text style={{ fontSize: 16 }}>{date ? date.toString() : "Date"}</Text>
        </TouchableOpacity>
    );
};