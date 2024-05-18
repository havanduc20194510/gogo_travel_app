import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../assets/AppColors';

const SelectInput = ({ data, setFilterType, borderWidthContainer }) => {
    return (
        <View
            style={[
                styles.container,
                {
                    borderWidth: borderWidthContainer ?? 0,
                },
            ]}
        >
            {/* <View style={styles.header}>
                <Text style={styles.headerTxt}>SelectInput</Text>
            </View> */}
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index);
                    setFilterType(selectedItem);
                }}
                renderButton={(selectedItem, isOpen) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                            {/* {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />} */}
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.title) || 'Select'}
                            </Text>
                            <Icon
                                name={isOpen ? 'chevron-up' : 'chevron-down'}
                                style={styles.dropdownButtonArrowStyle}
                            />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View
                            style={{
                                ...styles.dropdownItemStyle,
                                ...(isSelected && { backgroundColor: '#D2D9DF' }),
                            }}
                        >
                            {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
        </View>
    );
};

export default SelectInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingVertical: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // paddingTop: 90,
        width: '100%',
        // borderColor: AppColors.neutral,
        borderRadius: 12,
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 90,
        backgroundColor: '#E9ECEF',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 16,
    },
    headerTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: '#151E26',
    },
    dropdownButtonStyle: {
        // width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});
