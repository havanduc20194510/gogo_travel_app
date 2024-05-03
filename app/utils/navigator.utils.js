import {StackActions} from '@react-navigation/native';
import url from 'url';
import {Linking} from 'react-native';
import rootNavigation, { resetNavigator } from '../Navigator/RootNavigation';

const tag = '[NavigatorUtil]';

/**
 * Use navigation to navigate to screen
 * @param {string} screen name
 * @param {*} params params
 * @param {*} navigation default will use rootNavigation
 */
const navigate = (screen, params, navigation = rootNavigation()) => {
  console.log(tag, 'navigate', screen, params);
  navigation.navigate(screen, params);
};

/**
 * Push navigation
 * @param {*} screen
 * @param {*} params
 * @param {*} navigation default will useRootNavigation
 */
const push = (screen, params, navigation = rootNavigation()) => {
  if (typeof navigation.push === 'function') {
    return navigation.push(screen, params);
  }

  const pushAction = StackActions.push(screen, params);
  navigation?.dispatch(pushAction);
};

/**
 * reset navigation stack and set screen
 * @param {*} screen name
 * @param {*} params screen params
 * @param {*} index index of screen in stack
 * @param {*} routes array of routes stand before the screen {name: string, params: {}}[]
 */
const reset = (screen, params, index = 0, routes = []) => {
  resetNavigator(screen, params, index, routes);
};

/**
 * back to previous screen on stack
 * @param {*} navigation default will use rootNavigation
 */
const goBack = (navigation = rootNavigation()) => {
  // kiểm tra có thể  goBack không trước khi thực hiện
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};

const replace = (screen, params, navigation = rootNavigation()) => {
  if (navigation === null || navigation === undefined) {
    navigation = rootNavigation();
  }
  const replaceAction = StackActions.replace(screen, params);
  navigation?.dispatch(replaceAction);
};

/** 
 * Dùng để chuyển  đến tất cả các màn hình
 * ví dụ mốn mở màn hinh EKYCVerifyScreen(có tham số start = 1) -> deepLink = intrustca://?action=EKYCVerifyScreen&start=1
 * @param navigation
 * @param deepLink
 * @returns {Promise<void>}
 */
const navigateDeepLink = async (deepLink, navigation = null) => {
  console.log('navigateDeepLink', deepLink);
  if (!deepLink) {
    return;
  }

  const urlParams = url.parse(deepLink, true).query;
  console.log(tag, 'urlPrams', urlParams);
  const action = urlParams?.action;
  const method = urlParams?.method ?? 'navigate';

  if (action) {
    if (method === 'replace') {
      replace(action, urlParams);
    } else {
      navigate(action, urlParams);
    }
  } else if (deepLink?.startsWith('http')) {
    Linking.openURL(deepLink);
  }
};

export default {
  goBack,
  replace,
  reset,
  navigateDeepLink,
  push,
  navigate,
};
