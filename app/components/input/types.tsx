import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface CustomTextInputProps {
  value: string;
  onChangeText?: () => void;
  type: string;
  title: string;
  placeholder: string;
  widthInput: number;
  heightInput: number;
  backgroundColor: string;
  message: string;
  suffixIcon: string;
  prefixIcon: string;
  isNumber: boolean;
  onSuffixIconPress?: () => void;
  onPrefixIconPress?: () => void;
  style?: StyleProp<ViewStyle>;
  require: boolean;
  borColor: boolean;
  txtColor: string;
  placeholderColor: string;
  editable: boolean;
  titleStyles?: StyleProp<TextStyle>;
  useCalendar: boolean;
  onSelectedDate?: () => void;
  onErrorPhone?: (message: string) => void;
  hiddenClear?: boolean;
  onClear?: () => void;
}
