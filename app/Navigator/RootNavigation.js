import {createNavigationContainerRef} from '@react-navigation/native';

export const rootNavigationRef = createNavigationContainerRef();

/**
 *
 * @returns same behavior as navigation, global use
 */
export default function rootNavigation() {
  console.log('USING rootNavigation');
  // bind to global.rootNavigation for debugger
  return (global.rootNavigation = rootNavigationRef.current ?? {
    navigate: () => {},
    reset: () => {},
    push: () => {},
    goBack: () => {},
    dispatch: () => {},
    replace: () => {},
  });
}

/**
 * Reset App screen stack to specific screen, remove all old screen
 * @param {string} screen FocusScreen name
 * @param {any} params Route params
 * @param {number} index Index of screen in route[]
 * @param {array} routes Array of route objects will standing before: [{name: string, params: {}}]
 */
export const resetNavigator = (screen, params, index = 0, routes = []) => {
  rootNavigation().reset({
    index,
    routes: [...routes, {name: screen, params}],
  });
};
