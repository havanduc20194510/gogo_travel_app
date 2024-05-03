import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import Ionicons from "react-native-vector-icons/Ionicons";
import Const from '../Const';
import AppColors from '../../assets/AppColors';
import { Text } from 'react-native';

const data = [
    { label: 'Item 1          g', value: '1' },
    { label: 'Item 2 sfdfdfsdf', value: '2' },
    { label: 'Item 3sadfffffffffff', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7fffffffffff', value: '7' },
    { label: 'Item 8', value: '8' },
];

const MultiSelectComponent = () => {
    const [selected, setSelected] = useState([]);

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Activity"
                searchPlaceholder="Search..."
                value={selected}
                onChange={item => {
                    setSelected(item);
                }}
                // renderLeftIcon={() => (
                //     <Ionicons name='repo-deleted' size={40}></Ionicons>
                // )}
                selectedStyle={{ display: 'none' }}
                itemContainerStyle={{ backgroundColor: AppColors.aliceblue, borderRadius: 8, marginHorizontal: 10, marginVertical: 5, padding: 0 }}
                containerStyle={{ backgroundColor: AppColors.backgroundDropdown, borderRadius: 10 }}

            />
        </View>
    );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
    container: { padding: 16, width: Const.fullScreenWidth - 110, marginHorizontal: 10, borderRadius: 8 },
    dropdown: {
        height: 50,
        // backgroundColor: '#FFFBF6',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 16
    },
    placeholderStyle: {
        fontSize: 16,
        marginHorizontal: 20
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
        padding: 2,
        marginVertical: 5
        // maxWidth: 40, maxHeight: 40
    },
});