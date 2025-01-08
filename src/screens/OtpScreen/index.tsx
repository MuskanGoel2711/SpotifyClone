import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OtpScreenProps {
    confirm: any
}

const OtpScreen: React.FC<OtpScreenProps> = (props) => {
    const insets = useSafeAreaInsets();
    const [code, setCode] = useState<string>('');

    const confirmCode = async () => {
        try {
            await props.confirm();
        } catch (error) {
            console.log('Invalid code.');
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TextInput 
                value={code} 
                onChangeText={(text: string) => setCode(text)} 
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter OTP"
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={confirmCode} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>enter otp</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#70706e',
        marginTop: 5,
        color: 'white',
    },
    buttonContainer: {
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        width: '90%',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
