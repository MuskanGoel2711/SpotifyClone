import React from 'react';
import {TouchableOpacity, Text, StyleSheet, useColorScheme} from 'react-native';
import {vh} from '../../utils/Dimensions';


interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isButtonDisabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isButtonDisabled = false,
}) => {
  const theme = useColorScheme();
  const styles = Styles(theme);
  return (
    <TouchableOpacity
      style={[styles.submitButton, isButtonDisabled && [styles.disabledButton]]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isButtonDisabled}>
      <Text
        style={[
          styles.submitButtonText,
          isButtonDisabled && [styles.disabledButtonText],
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Styles = (theme: any) =>
  StyleSheet.create({
    disabledButton: {
      backgroundColor: theme === 'dark' ? '#000' : '#FFF',
      shadowColor: theme === 'dark' ? '#FFF' : '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 5,
    },
    submitButton: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: '85%',
      marginTop: vh(44),
      paddingVertical: vh(16),
      borderRadius: 10,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    disabledButtonText: {
      color: '#E2E2E2',
    },
  });

export default CustomButton;