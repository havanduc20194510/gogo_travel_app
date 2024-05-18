import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AppColors from '../../assets/AppColors';
import { formatCurrencyK } from '../../utils/util';

const MultiSliderRangeNumber = ({ max = 100, min = 0, handleCustomSliderValue }) => {
    const [customValue, setCustomValue] = useState([min, max]);

    const handleCustomSliderChange = (value) => {
        setCustomValue(value);
        handleCustomSliderValue(customValue);
    };

    return (
        <View style={styles.container}>
            <MultiSlider
                values={customValue}
                onValuesChange={handleCustomSliderChange}
                sliderLength={300}
                min={min}
                max={max}
                step={1}
                allowOverlap={false}
                snapped={true}
                customMarker={(props) => {
                    return (
                        <View style={styles.customMarker}>
                            <Text style={styles.customMarkerText}>{formatCurrencyK(props.currentValue)}</Text>
                        </View>
                    );
                }}
                customMarkerLeft={(props) => {
                    return (
                        <View style={styles.customMarker}>
                            <Text style={styles.customMarkerText}>{formatCurrencyK(props.currentValue)}</Text>
                        </View>
                    );
                }}
                customMarkerRight={(props) => {
                    return (
                        <View style={styles.customMarker}>
                            <Text style={styles.customMarkerText}>{formatCurrencyK(props.currentValue)}</Text>
                        </View>
                    );
                }}
                selectedStyle={{ backgroundColor: 'black' }}
                unselectedStyle={{ backgroundColor: 'silver' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f5fcff',
        maxWidth: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    customMarker: {
        backgroundColor: AppColors.backgroundHeader,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'green',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customMarkerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 8,
    },
});

export default MultiSliderRangeNumber;
