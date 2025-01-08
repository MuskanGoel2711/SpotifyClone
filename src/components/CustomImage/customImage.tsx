import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { vw, vh } from '../../utils/Dimensions';

type CustomImageProps = {
    onPress?: any;
    style?: any;
    source?: any;
    resizeMode?: any;

}

const CustomImage: React.FC<CustomImageProps> = ({
    onPress,
    source,
    style,
    resizeMode
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={source} style={[styles.artistImage, style]} resizeMode="stretch" />
        </TouchableOpacity>
    )
}

export default CustomImage;

const styles = StyleSheet.create({
    artistImage: {
        width: vw(100),
        height: vh(100),
        borderRadius: 8,
        marginBottom: 5,
        backgroundColor: 'black',
    }
})