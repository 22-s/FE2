import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChartIcon = ({ width = 26, height = 15, focused }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 26 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M26 1.72228V8.9445C26 9.7421 25.3541 10.3889 24.5556 10.3889C23.757 10.3889 23.1111 9.7421 23.1111 8.9445V5.21151L15.4646 12.858C15.1847 13.1379 14.8146 13.2778 14.4444 13.2778C14.0743 13.2778 13.7051 13.1368 13.4234 12.8547L8.66667 8.1004L2.46458 14.3025C2.18382 14.5823 1.81413 14.7223 1.44444 14.7223C0.619305 14.7223 0 14.0475 0 13.2778C0 12.9082 0.141059 12.5385 0.423177 12.2568L7.6454 5.03457C7.92639 4.7511 8.29653 4.61117 8.66667 4.61117C9.03681 4.61117 9.40604 4.75222 9.68771 5.03434L14.4444 9.79311L21.0708 3.16672H17.3333C16.5348 3.16672 15.8889 2.51988 15.8889 1.72228C15.8889 0.924672 16.5348 0.277832 17.3333 0.277832H24.5556C25.3139 0.277832 26 0.882693 26 1.72228Z"
      fill={focused ? "#268AFF" : "#BAC4CE"}
    />
  </Svg>
);

export default ChartIcon;