import {StyleProp, TextStyle} from 'react-native';

export interface ConfirmDialogProps {
  title: string;
  message: string | JSX.Element | (() => JSX.Element);

  /**
   * Các nút chức năng
   */
  options?: [ConfirmDialogOption] | [ConfirmDialogOption, ConfirmDialogOption];

  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;

  /**
   * bấm ra ngoài/nút back có đóng đc dialog. Mặc định là true
   */
  dismissable?: boolean;

  /**
   * Bắt sự kiện khi dialog đóng
   */
  onDimiss?: () => void;
  onOpen?: () => void;
}

interface ConfirmDialogOption {
  type: 'default' | 'cancel';
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export interface NotificationDialogProps {
  title: string;
  message: string | JSX.Element | (() => JSX.Element);
  /**
   * Tiêu đề nút 'Xác nhận'
   *
   * e.g: OK, Xác nhận, Đóng
   */
  confirmText?: string;
  /**
   * Sự kiện khi ấn 'xác nhận'
   */
  onConfirm?: () => void;

  titleStyle?: StyleProp<TextStyle>;
  confirmTextStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;

  /**
   * bấm ra ngoài/nút back có đóng đc dialog. Mặc định là true
   */
  dismissable?: boolean;

  /**
   * Bắt sự kiện khi dialog đóng
   */
  onDimiss?: () => void;
  onOpen?: () => void;
}
