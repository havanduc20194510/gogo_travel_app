import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicatorCustom} from './CustomActivityIndicator';


export default {
  /**
   * hide indicator
   */
  hide: () => {
    ActivityIndicatorRef.current?.hide();
  },
  /**
   * show indicator with message
   * @param {*} message to show
   */
  show: (message = ' ', type = IndicatorType.Normal) => {
      ActivityIndicatorRef.current?.show(message, type);
      console.log('[GlobalIndicator] show Indicator type:', type);
  },
};

export const IndicatorType = {
  Normal: 'normal',
  Circle: 'circle',
};
const ActivityIndicatorRef = createRef();

/**
 *
 * @param {{forceClose:boolean}} param0
 * @returns
 */
export function GlobalIndicatorComponent({forceClose}) {
  const [indicatorText, setIndicatorText] = useState(undefined);

  const [type, setType] = useState(IndicatorType.Normal);
  /* force close modal */
  useEffect(() => {
    if (forceClose) {
      setIndicatorText(undefined);
    }
  }, [forceClose]);

  useLayoutEffect(() => {
    ActivityIndicatorRef.current = {
      show: (text, type) => {
        !forceClose && setIndicatorText(text);
        setType(type);
      },

      hide: () => {
        setIndicatorText(undefined);
      },
    };
  }, [forceClose]);

  return (
    <ActivityIndicatorCustom visible={!!indicatorText} text={indicatorText} />
  );
}
