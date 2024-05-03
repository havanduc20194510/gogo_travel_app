import {
  StyleProp,
  TextStyle,
  ColorValue,
  ImageSourcePropType,
} from 'react-native';

export interface OTPDialogProps {
  title: string;
  message: string;
  /**
   * Độ dài mã pin
   */
  pinCount: number;
  /**
   * đ/v: giây
   *
   *
   */
  timeout?: number;
  /**
   * Khi ấn xác nhận otp
   *
   *
   * Nếu trả về `{error: string}`, ô nhập hiện viền đỏ và `error` sẽ hiển thị phía dưới
   *
   * Nếu không sẽ đóng dialog (k có sự kiện dismiss)
   */
  onConfirm: (otp: string) => Promise<{error?: string}>;
  /**
   * Callback khi ấn Gửi lại
   *
   * Khi ấn nút này trạng thái nhập otp được reset -> quay về đầu luồng đợi otp
   */
  onResendPress?: () => void;
  /**
   * Sự kiện khi đóng
   */
  onDimiss?: () => void;
  onOpen?: () => void;

  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  /**
   * Màu highlight khi focus
   */
  highlightColor: ColorValue;
  /**
   * Màu highlight khi error
   */
  errorColor?: ColorValue;
  confirmTitle: string;
  closeTitle: string;
  /**
   * e.g: Mã sẽ hết hạn trong {{timeout}}s -> Mã sẽ hết hạn trong 47s
   *
   * **ONE** placeholder only
   */
  timeoutRemindPlaceholder?: string;
  /**
   * e.g: Gửi lại OTP?
   */
  resendMessage?: string;
  /**
   * e.g: Gửi lại OTP Icon
   */
  resendIcon?: ImageSourcePropType;
  /**
   * required if use `resendMessage`
   */
  resendButtonTitle?: string;
  /**
   * e.g: From clipboard
   */
  pasteFromClipboardMessage?: string;
}

export interface OTPDialogController {
  show: (props: OTPDialogProps) => void;
  hide?: () => void;
  update?: (otp: string) => void;
}
