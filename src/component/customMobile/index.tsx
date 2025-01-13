import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageSourcePropType,
  useColorScheme,
} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {TextInput} from 'react-native-paper';
import {Styles} from './style';
import {validatePhoneNumber} from '../../utils/validations';

interface CustomMobileInputBoxProps {
  countryCode?: any;
  callingCode?: string;
  label: string;
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  onSelect?: (country: Country) => void;
  setPickerVisible?: any;
  Icon: ImageSourcePropType;
  error: boolean;
  setError: (hasError: boolean) => void;
  errorText?: string;
}

const CustomMobileInputBox = ({
  countryCode,
  callingCode,
  label,
  phoneNumber,
  setPhoneNumber,
  onSelect,
  setPickerVisible,
  Icon,
  error,
  setError,
  errorText,
}: CustomMobileInputBoxProps) => {
  const theme = useColorScheme();
  const styles = Styles(theme);
  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    if (text === '') {
      setError(false);
    } else if (validatePhoneNumber(text)) {
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <View
        style={[styles.inputContainer, error ? styles.errorContainer : null]}>
        <TouchableOpacity activeOpacity={1} style={styles.telephoneButton}>
          <Image
            source={Icon}
            style={[styles.iconStyle, {tintColor: error ? 'red' : 'grey'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.countryCodeButton}
          activeOpacity={1}
          onPress={() => setPickerVisible(setPickerVisible)}>
          <CountryPicker
            countryCode={countryCode}
            withFlag={true}
            withCallingCode={true}
            withFilter={true}
            onSelect={onSelect}
            visible={false}
            containerButtonStyle={styles.flagContainer}
          />
          <Text
            onPress={() => setPickerVisible(setPickerVisible)}
            style={styles.countryCodeText}>
            {callingCode}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInputMobile}
          label={label}
          keyboardType="phone-pad"
          textColor={theme === 'dark' ? '#FFF' : '#000'}
          maxLength={13}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
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
      {error && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

export default CustomMobileInputBox;