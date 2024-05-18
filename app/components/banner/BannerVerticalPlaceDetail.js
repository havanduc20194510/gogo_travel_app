import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import AppColors from '../../assets/AppColors';
import Const from '../Const';

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
];

const banners = ENTRIES1.map((item) => {
    return {
        ...item,
        deepUrl: 'https://www.facebook.com/',
    };
});

const { width: screenWidth } = Dimensions.get('window');

const BannerVerticalPlaceDetail = (props) => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => {
                        // handle to screen detail
                        console.log('abc');
                    }}
                >
                    <ParallaxImage
                        source={{ uri: item.illustration }}
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
            {/* <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                // sliderHeight={screenWidth}
                itemWidth={screenWidth}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
                inactiveSlideScale={1}
                autoplay={true}
                loop={true}
                // lockScrollTimeoutDuration={10}

                layout="default"
            /> */}
        </View>
    );
};

export default BannerVerticalPlaceDetail;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: '100*',
    },
    item: {
        width: screenWidth - 60,
        // height: screenWidth - 60,
    },
    imageContainer: {
        // flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: AppColors.secondary1,
        borderRadius: 8,
        height: 150,
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        aspectRatio: 1.5,
        width: screenWidth - 60,
        height: null,
        left: 0,
        right: 0,
    },
});
