import {
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    useColorScheme,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Styles} from './style';
  import {CountryCode} from 'react-native-country-picker-modal';
  import CustomMobileInputBox from '../../component/customMobile';
  import CustomButton from '../../component/customButton';
  import {Icons} from '../../assets';
  
  interface ForgotPasswordProps {
    onClose?: any;
    navigation: any;
  }
  
  const ForgotPassword = ({navigation}: ForgotPasswordProps) => {
    const theme = useColorScheme();
    const styles = Styles(theme);
  
    const [countryCode, setCountryCode] = useState<CountryCode>('IN');
    const [callingCode, setCallingCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [error, setError] = useState(false);
  
    const onSelect = (country: any) => {
      setCountryCode(country.cca2);
      setCallingCode(`+${country.callingCode[0]}`);
      setPickerVisible(false);
    };
    const handleBack = () => {
      navigation.goBack();
    };
  
    const handleNext = () => {
      if (!error) {
        navigation.navigate('SignUpVerify', {phoneNumber});
      }
    };
  
    const isButtonDisabled = phoneNumber.length < 5;
    return (
      <>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={{flex: 1}}>
              <StatusBar
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
                translucent={true}
              />
              <View style={styles.subContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={Icons.back} style={styles.Left} />
          </TouchableOpacity>
                <View style={styles.contentHeader}>
                  <Text style={styles.headerText}>Forgot Password?</Text>
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailText}>
                    No worries, we'll send an otp on your registered mobile number
                    for verification.
                  </Text>
                </View>
                <CustomMobileInputBox
                  label={'Mobile Number'}
                  countryCode={countryCode}
                  callingCode={callingCode}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  onSelect={onSelect}
                  setPickerVisible={setPickerVisible}
                  Icon={Icons.telephone}
                  error={error}
                  setError={setError}
                  errorText={'Mobile no. should be min 5 digit and max 13 digit.'}
                />
  
                <CustomButton
                  title={'Send OTP'}
                  onPress={handleNext}
                  isButtonDisabled={isButtonDisabled}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </>
    );
  };
  export default ForgotPassword;