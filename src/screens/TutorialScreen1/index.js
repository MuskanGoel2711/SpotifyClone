import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import styles from './style';
import tutorialData from '../../assets/tutorialData';

const { width } = Dimensions.get('window');

const TutorialScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < tutorialData.length) {
            flatListRef.current.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'FirstScreen' }],
            });
        }
    };

    const handleSkip = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'FirstScreen' }],
        });
    }

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={tutorialData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />
            <View style={styles.pagination}>
                {tutorialData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            { opacity: index === currentIndex ? 1 : 0.3 },
                        ]}
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity onPress={handleNext} style={[
                        styles.button, { backgroundColor: '#2f71a3' },
                    ]}>
                        <Text style={styles.buttonText}>
                           {currentIndex === tutorialData.length - 1 ? 'Finish' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSkip} style={[
                        styles.button, { backgroundColor: 'black' },
                    ]}>
                        <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TutorialScreen;