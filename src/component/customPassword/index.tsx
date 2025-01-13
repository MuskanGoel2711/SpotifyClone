import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageSourcePropType,
  useColorScheme,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Styles} from './style';
import {Icons} from '../../assets';

interface CustomPasswordInputProps {
  name: string;
  label: string;
  Icon: ImageSourcePropType;
  isPasswordVisible: boolean; // Passed down from the parent component
  togglePasswordVisibility: () => void; // Function passed from parent
  Error?: boolean;
  errorText?: string;
  maxLength?: number;
  keyboardType: any;
  onChangeText: (text: string) => void;
}

const CustomPasswordInputBox = ({
  name,
  label,
  Icon,
  isPasswordVisible,
  togglePasswordVisibility,
  Error,
  errorText,
  maxLength,
  keyboardType,
  onChangeText,
}: CustomPasswordInputProps) => {
  const theme = useColorScheme();
  const styles = Styles(theme);

  return (
    <>
      <View
        style={[styles.inputContainer, Error ? styles.errorContainer : null]}>
        <TouchableOpacity activeOpacity={1} style={styles.iconButton}>
          <Image
            source={Icon}
            style={[styles.iconStyle, {tintColor: Error ? 'red' : 'grey'}]}
          />
        </TouchableOpacity>

        <TextInput
          style={[styles.phoneInput]}
          label={label}
          keyboardType={keyboardType}
          value={name}
          maxLength={maxLength}
          secureTextEntry={!isPasswordVisible} // Hides the password
          textColor={theme === 'dark' ? '#FFF' : '#000'}
          onChangeText={onChangeText}
          mode="flat"
          underlineStyle={{
            display: 'none',
          }}
          theme={{
            colors: {
              primary: 'gray',
              placeholder: 'grey',
              background: 'transparent',
              disabled: 'transparent',
            },
          }}
        />

        {/* Password Visibility Toggle */}
        <TouchableOpacity
          onPress={togglePasswordVisibility}>
          <Image
            source={isPasswordVisible ? Icons.eye_off : Icons.eye}
            style={[styles.eyeImg, {tintColor: 'grey'}]}
          />
        </TouchableOpacity>
      </View>

      {Error && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

export default CustomPasswordInputBox;