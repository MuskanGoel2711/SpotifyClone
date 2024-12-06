import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type CustomButtonProps = {
    onPress?: any;
    style?: any;
    disabled?: any;

}
const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    style,
    disabled

}) => {
    return(
        <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
            <Text style={style}></Text>
        </TouchableOpacity>
    )
}

export default CustomButton;