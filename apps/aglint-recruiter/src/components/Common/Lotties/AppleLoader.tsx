import { appleLoaderData } from '@public/lottie/apple-loader-data';
import Lottie from 'lottie-react';
import React from 'react';

function AppleLoader({ width = 200, height = 100 }) {
  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <div style={{ width: `${width}px` }}>
        <Lottie animationData={appleLoaderData} loop={true} autoplay={true} />
      </div>
    </div>
  );
}

export default AppleLoader;
