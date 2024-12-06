import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type CustomButtonProps = {
    onPress?: any;
    style?: any;
    disabled?: any;
    textStyle?: any;
    title?: any;

}
const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    style,
    disabled,
    textStyle,
    title

}) => {
    return(
        <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;