import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import string from '../../utils/enum';

const Premium = () => {
    return(
        <View style={styles.container}>
            <Text style={{color: 'white', margin: 50}}>{string.premium}</Text>
        </View>
    )
}

export default Premium;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },

})