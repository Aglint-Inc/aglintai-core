import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as radixColors from '@radix-ui/colors';
import React from 'react';

interface MuiAvatarProps {
  level: string;
  width?: string;
  height?: string;
  variant: AvatarProps['variant'];
  src?: string;
  fontSize?: string;
  dynamicSizing?: boolean;
  extended?: boolean;
  bgColor?: string;
  color?: string;
}

const colors = [
  { bg: radixColors.amber.amber3, border: radixColors.amber.amber6, text: radixColors.amber.amber11 },
  { bg: radixColors.blue.blue3, border: radixColors.blue.blue6, text: radixColors.blue.blue11 },
  { bg: radixColors.bronze.bronze3, border: radixColors.bronze.bronze6, text: radixColors.bronze.bronze11 },
  { bg: radixColors.brown.brown3, border: radixColors.brown.brown6, text: radixColors.brown.brown11 },
  { bg: radixColors.crimson.crimson3, border: radixColors.crimson.crimson6, text: radixColors.crimson.crimson11 },
  { bg: radixColors.cyan.cyan3, border: radixColors.cyan.cyan6, text: radixColors.cyan.cyan11 },
  { bg: radixColors.gold.gold3, border: radixColors.gold.gold6, text: radixColors.gold.gold11 },
  { bg: radixColors.grass.grass3, border: radixColors.grass.grass6, text: radixColors.grass.grass11 },
  { bg: radixColors.gray.gray3, border: radixColors.gray.gray6, text: radixColors.gray.gray11 },
  { bg: radixColors.green.green3, border: radixColors.green.green6, text: radixColors.green.green11 },
  { bg: radixColors.indigo.indigo3, border: radixColors.indigo.indigo6, text: radixColors.indigo.indigo11 },
  { bg: radixColors.lime.lime3, border: radixColors.lime.lime6, text: radixColors.lime.lime11 },
  { bg: radixColors.mint.mint3, border: radixColors.mint.mint6, text: radixColors.mint.mint11 },
  { bg: radixColors.orange.orange3, border: radixColors.orange.orange6, text: radixColors.orange.orange11 },
  { bg: radixColors.pink.pink3, border: radixColors.pink.pink6, text: radixColors.pink.pink11 },
  { bg: radixColors.plum.plum3, border: radixColors.plum.plum6, text: radixColors.plum.plum11 },
  { bg: radixColors.purple.purple3, border: radixColors.purple.purple6, text: radixColors.purple.purple11 },
  { bg: radixColors.red.red3, border: radixColors.red.red6, text: radixColors.red.red11 },
  { bg: radixColors.sage.sage3, border: radixColors.sage.sage6, text: radixColors.sage.sage11 },
  { bg: radixColors.sand.sand3, border: radixColors.sand.sand6, text: radixColors.sand.sand11 },
  { bg: radixColors.sky.sky3, border: radixColors.sky.sky6, text: radixColors.sky.sky11 },
  { bg: radixColors.slate.slate3, border: radixColors.slate.slate6, text: radixColors.slate.slate11 },
  { bg: radixColors.teal.teal3, border: radixColors.teal.teal6, text: radixColors.teal.teal11 },
  { bg: radixColors.tomato.tomato3, border: radixColors.tomato.tomato6, text: radixColors.tomato.tomato11 },
  { bg: radixColors.violet.violet3, border: radixColors.violet.violet6, text: radixColors.violet.violet11 },
  { bg: radixColors.yellow.yellow3, border: radixColors.yellow.yellow6, text: radixColors.yellow.yellow11 },
];

export default function MuiAvatar({
  level,
  width,
  height,
  variant,
  src,
  fontSize,
  dynamicSizing,
  bgColor,
  color,
  extended,
}: MuiAvatarProps): React.JSX.Element {
  function stringToColor(string: string, index: number) {
    return colors[index % colors.length];
  }

  function stringAvatar(value: string, index: number): {
    sx: { width: string; height: string; bgcolor: string; color: string; border: string; borderColor: string };
    children: React.JSX.Element;
  } {
    const colorData = stringToColor(value, index);
    return {
    
      sx: {
        ...(dynamicSizing
          ? { width: '100%', height: '100%' }
          : {
            width: width ? width : '40px',
            height: height ? height : '40px',
          }),
        bgcolor: bgColor ? bgColor : colorData.bg,
        color: color ? color : colorData.text,
        // border: `2px solid ${colorData.border}`,
        border: 'none',
        borderColor: ''
      },
      children: (
        <Typography
          position={'relative'}
          color={colorData.text}
          fontSize={fontSize}
        >
          {value
            ? extended
              ? value.slice(0, 2).toUpperCase()
              : value[0].toUpperCase()
            : '0'}
        </Typography>
      ),
    };
  }

  // Calculate the index for color selection based on the level
  const index = level ? level.charCodeAt(0) : 0;

  return (
    // @ts-ignore
    <Avatar src={src ? src : '/'} variant={variant} {...stringAvatar(level, index)} />
  );
}
