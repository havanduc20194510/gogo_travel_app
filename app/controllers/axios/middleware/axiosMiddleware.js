import navigatorUtils from '../../../utils/navigator.utils';
import { store } from '../../redux/AppStore';
import { AccountActions } from '../../slice/AccountSlice';

const handleException = (error) => {};
const handleResponseMessage = (data) => {
    if (
        data &&
        data.notShowError === false &&
        (data.status === false || data.status === 'error' || data.status_code !== 0)
    ) {
        let message = null;
        if (typeof data.error_desc === 'string') {
            message = data.error_desc;
        } else if (typeof data.error === 'string') {
            message = data.error;
        } else if (typeof data.error?.message === 'string') {
            message = data.error.message;
        } else if (typeof data.message === 'string') {
            message = data.message;
        }
        if (message !== null) {
            if (data.status_code === 8) {
                // hiển thị dialog để đăng nhập lại
                // showNotificationDialog({
                //   title: 'Oops!',
                //   message: message,
                //   confirmText: t('Relogin'),
                //   onConfirm: () =>
                //     store.dispatch(AccountActions.loginWithRefreshToken()),
                // });
            } else if (data.status_code === 400 || data?.error?.response?.status === 401 || data.status_code === 5) {
                // invalid refresh token
                // hiển thị dialog để đăng nhập lại
                // showNotificationDialog({
                //   title: 'Oops!',
                //   message: message,
                //   confirmText: t('Relogin'),
                //   onConfirm: () => navigatorUtils.navigate('LoginScreen'),
                // });
            } else {
                // showNotificationDialog({
                //   title: 'Oops!',
                //   message: message,
                //   confirmText: t('Close'),
                // });
            }
        }
    }

    // nếu status_code = 8 -> xóa accessToken
    if (data.status_code === 8) {
        // store.dispatch(AccountActions.updateState({accessToken: null}));
    }

    return data;
};

export default {
    handleException,
    handleResponseMessage,
};
