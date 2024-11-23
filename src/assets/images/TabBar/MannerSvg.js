import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MannerSvg = ({ width = 27, height = 27, focused }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.875 20.2499H19.125V17.9999H7.875V20.2499Z"
      fill={focused ? '#268AFF' : '#BAC4CE'}
    />
    <Path
      d="M19.125 15.75H7.875V13.5H19.125V15.75Z"
      fill={focused ? '#268AFF' : '#BAC4CE'}
    />
    <Path
      d="M7.875 11.2501H12.375V9.00012H7.875V11.2501Z"
      fill={focused ? '#268AFF' : '#BAC4CE'}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 2.25012C4.88604 2.25012 3.375 3.76117 3.375 5.62512V21.3751C3.375 23.2391 4.88604 24.7501 6.75 24.7501H20.25C22.114 24.7501 23.625 23.2391 23.625 21.3751V10.1251C23.625 5.77588 20.0993 2.25012 15.75 2.25012H6.75ZM6.75 4.50012H14.625V10.1251H21.375V21.3751C21.375 21.9965 20.8713 22.5001 20.25 22.5001H6.75C6.12868 22.5001 5.625 21.9965 5.625 21.3751V5.62512C5.625 5.00381 6.12868 4.50012 6.75 4.50012ZM16.875 4.61264C18.6877 4.98061 20.184 6.22031 20.907 7.87512H16.875V4.61264Z"
      fill={focused ? '#268AFF' : '#BAC4CE'}
    />
  </Svg>
);

export default MannerSvg;
