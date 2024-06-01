import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import AppColors from '../../assets/AppColors';
import dashboardApi from '../../controllers/api/dashboardApi';
import _ from 'lodash';
import env from '../../../env.json';
import navigatorUtils from '../../utils/navigator.utils';

const accessToken = '';

const { width: screenWidth } = Dimensions.get('window');

const BannerVertical = (props) => {
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [topTour, setTopTour] = useState([]);

    const getTopTour = async () => {
        const data = await dashboardApi.topTour(accessToken);

        if (_.isArray(data?.data?.data)) {
            setTopTour(data?.data?.data);
        }
    };

    useEffect(() => {
        getTopTour();
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => {
                        navigatorUtils.navigate('DetailTourScreen', { tour: item.tour });
                    }}
                >
                    <ParallaxImage
                        source={{ uri: item.url }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                    <Text style={styles.title} numberOfLines={2}>
                        {item.name}
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
                itemWidth={screenWidth - 200}
                data={topTour.map((tour, index) => {
                    return {
                        name: tour?.name ?? topTour('Tour'),
                        url:
                            tour?.images[Math.floor(Math.random() * tour?.images?.length)]?.url ??
                            env.dev.defaultImagePlace,
                        tour: tour,
                    };
                })}
                renderItem={renderItem}
                hasParallaxImages={true}
                inactiveSlideScale={1}
                autoplay={true}
                // loop={true}
                // lockScrollTimeoutDuration={10}

                layout="default"
            />
        </View>
    );
};

export default BannerVertical;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: '100*',
    },
    item: {
        width: 150,
        height: 300,
    },
    imageContainer: {
        // flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: AppColors.secondary1,
        borderRadius: 8,
        height: 250,
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        // aspectRatio: 1.5,
        width: screenWidth - 60,
        height: null,
        left: 0,
        right: 0,
    },
});
