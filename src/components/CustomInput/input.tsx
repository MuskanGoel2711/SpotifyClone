import React from 'react';
import { TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';

type CustomInputProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  style?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  placeholderTextColor?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: TextInputProps['returnKeyType'];
  inputRef?: React.Ref<TextInput>;
  keyboardAppearance?: TextInputProps['keyboardAppearance'];
  cursorColor?: string;
  onFocus?: any;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  onChangeText,
  value,
  style,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  placeholderTextColor,
  onSubmitEditing,
  returnKeyType,
  inputRef,
  keyboardAppearance,
  cursorColor,
  onFocus
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={style}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      placeholderTextColor={placeholderTextColor}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      ref={inputRef}
      keyboardAppearance={keyboardAppearance}
      cursorColor={cursorColor}
      onFocus={onFocus}
    />
  );
};

export default CustomInput;
