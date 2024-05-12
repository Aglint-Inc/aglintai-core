import { palette } from '@context/Theme/Theme';
import PropTypes from 'prop-types';

function CustomProgress({
  size = 10,
  strokeWidth,
  fillColor,
  bgFill = palette.grey[200],
  bgColor,
  fontSize,
  label,
  text,
  progress,
  rotation = 135,
}) {
  const circumference = 2 * 3.14 * size;
  let filled = progress < 1 ? progress : progress / 100;
  // filled = filled * 0.75;
  strokeWidth = strokeWidth ? strokeWidth : (size * 2) / 10;
  fillColor = fillColor ? fillColor : palette.blue[500];
  fontSize = fontSize ? fontSize : `${size / 3}px`;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: '4px',
        // labelAlign: 'center',
        overflow: 'hidden',
        transition: '0.5s',
        color: fillColor,
      }}
    >
      <div>
        <div
          style={{
            position: 'relative',
            width: `${size * 2 + strokeWidth}px`,
            height: `${size * 2 + strokeWidth}px`,
            borderRadius: '50%',
            //   boxShadow: 'inset 0 0 50px #000',
            background: bgColor ? bgColor : '',
            zIndex: 0,
          }}
        >
          <svg
            style={{
              position: 'relative',
              width: 'inherit',
              height: 'inherit',
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <circle
              cx={size}
              cy={size}
              r={size}
              style={{
                width: '100%',
                height: '100%',
                fill: bgFill,
                stroke: bgFill,
                strokeWidth: strokeWidth,
                strokeLinecap: 'round',
                transform: `translate(${strokeWidth / 2}px, ${
                  strokeWidth / 2
                }px)`,
              }}
            ></circle>
            <circle
              cx={size}
              cy={size}
              r={size}
              style={{
                width: '100%',
                height: '100%',
                fill: 'none',
                strokeWidth: strokeWidth,
                strokeLinecap: 'round',
                transform: `translate(${strokeWidth / 2}px, ${
                  strokeWidth / 2
                }px)`,
                strokeDasharray: circumference,
                strokeDashoffset: circumference - circumference * filled,
                stroke: fillColor,
              }}
            ></circle>
          </svg>
          {(label || label == 0) && (
            <div
              style={{
                color: fillColor,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                fontSize,
                zIndex: 9999,
              }}
            >
              {label}
            </div>
          )}
        </div>
        {text}
      </div>
    </div>
  );
}

CustomProgress.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  fillColor: PropTypes.string,
  bgFill: PropTypes.string,
  bgColor: PropTypes.string,
  fontSize: PropTypes.number,
  label: PropTypes.any,
  text: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  progress: PropTypes.number.isRequired,
  rotation: PropTypes.number,
};

export default CustomProgress;
