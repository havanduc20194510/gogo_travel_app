import { useDispatch, useSelector } from 'react-redux';
import PreferenceKeys from '../controllers/constants/PreferenceKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../controllers/hook/AccountHook';

const UserHelper = {
    // Check accessToken isValid
    checkAccessTokenValid: async () => {
        const accessToken = useAuth();
        if (accessToken) return true;
        return false;
    },

    // Sign out
    signOut: async () => {
        const dispatch = useDispatch();
        dispatch(
            AccountAction.updateState({
                account: {},
                accessToken: null,
                authenticated: false,
            }),
        );
    },
};

export default UserHelper;
