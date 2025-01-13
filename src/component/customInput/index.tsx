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

interface CustomInputProps {
  name: any;
  setName?: (text: string) => void;
  Icon: ImageSourcePropType;
  Error?: boolean;
  label: string;
  setError?: (hasError: boolean) => void;
  onChangeText: any;
  onFocus?: any;
  onBlur?: any;
  errorText?: any;
  maxLength?: any;
  keyboardType: any;
}

const CustomInputBox = ({
  name,
  label,
  Icon,
  Error,
  onChangeText,
  errorText,
  maxLength,
  keyboardType,
}: CustomInputProps) => {
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
      </View>
      {Error && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

export default CustomInputBox;