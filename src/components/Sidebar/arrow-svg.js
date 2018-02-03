import React from 'react';

const Arrow = ({
  color,
  rotate,
  height,
  width,
}) => (
  <svg style={{transform: `rotate(${rotate || -90}deg)`}} width={width || 18} height={height || 18} viewBox="0 0 24 24">
    <path fill={color || '#AAB0B9'} d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
  </svg>
)

export default Arrow;
