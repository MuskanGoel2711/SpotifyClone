import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageSourcePropType,
  useColorScheme,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Styles } from './styles';

interface DOBInputProps {
  label: string;
  Icon: ImageSourcePropType;
  Error?: boolean;
  errorText?: string;
  onDateChange: (selectedDate: Date | undefined) => void;
  maxLength?: number;
}

const DOBInput = ({
  label,
  Icon,
  Error,
  errorText,
  onDateChange,
}: DOBInputProps) => {
  const theme = useColorScheme();
  const styles = Styles(theme);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false); // Close the picker after selection
    const currentDate = selectedDate || date;
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const formattedDate = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    : '';

  return (
    <>
      <View
        style={[styles.inputContainer, Error ? styles.errorContainer : null]}>
        <TouchableOpacity activeOpacity={1} style={styles.iconButton} onPress={() => setShow(true)}>
          <Image
            source={Icon}
            style={[styles.iconStyle, { tintColor: Error ? 'red' : 'grey' }]}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.phoneInput]} // Apply similar styling
          label={label}
          value={formattedDate}
          // editable={false} // Make the field not directly editable
          textColor={theme === 'dark' ? '#FFF' : '#000'}
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

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()} // Prevent future dates
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DOBInput;

