import React from 'react';
import { GlobalIndicatorComponent } from './components/indicator/GlobalIndicator';


/**
 * @document
 * @param
 * @returns {JSX.Element}
 * @constructor
 */
const GlobalComponent = () => {
  const tag = '[GlobalComponent]';

  return (
    <>
      
      <GlobalIndicatorComponent forceClose={false} />
      
    </>
  );
};

export default GlobalComponent;
