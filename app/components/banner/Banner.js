import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import AppColors from '../../assets/AppColors';
import dashboardApi from '../../controllers/api/dashboardApi';
import _ from 'lodash';
import navigatorUtils from '../../utils/navigator.utils';

// const ENTRIES1 = [
//     {
//         title: 'Beautiful and dramatic Antelope Canyon',
//         subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//         illustration: 'https://i.imgur.com/UYiroysl.jpg',
//     },
//     {
//         title: 'Earlier this morning, NYC',
//         subtitle: 'Lorem ipsum dolor sit amet',
//         illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
//     },
//     {
//         title: 'White Pocket Sunset',
//         subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
//         illustration: 'https://i.imgur.com/MABUbpDl.jpg',
//     },
//     {
//         title: 'Acrocorinth, Greece',
//         subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//         illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
//     },
//     {
//         title: 'The lone tree, majestic landscape of New Zealand',
//         subtitle: 'Lorem ipsum dolor sit amet',
//         illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
//     },
// ];

const accessToken = '';

const { width: screenWidth } = Dimensions.get('window');

const Banner = (props) => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [topPlaces, setTopPlaces] = useState([]);
    const getTopPlaces = async () => {
        const data = await dashboardApi.topPlace(accessToken);

        if (_.isArray(data?.data?.data)) {
            setTopPlaces(
                data?.data?.data.map((place) => {
                    return {
                        title: place?.name,
                        subtitle: place?.name,
                        illustration: place?.images[0]?.url,
                        place: place,
                    };
                }),
            );
            console.log('top places: ', topPlaces);
        }
    };

    useEffect(() => {
        getTopPlaces();
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => {
                        // handle to screen detail
                        // console.log('abc');
                        navigatorUtils.navigate('PlaceDetailScreen', { place: item?.place });
                    }}
                >
                    <ParallaxImage
                        source={{ uri: item?.illustration }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                    <Text style={styles.title} numberOfLines={2}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                // sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={topPlaces}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: '100*',
    },
    item: {
        // width: screenWidth - 60,
        // height: screenWidth - 60,
        width: '100%',
    },
    imageContainer: {
        // flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: AppColors.secondary1,
        borderRadius: 8,
        height: 150,
        width: '100%',
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        objectFit: 'cover',
        // aspectRatio: 1.5,
        // // width: screenWidth - 60,
        // height: null,
        // left: 0,
        // right: 0,
    },
});
