/* eslint-disable no-unused-vars */
import { createTheme, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as radixColors from '@radix-ui/colors';
import { useState } from 'react';

import CheckboxIcon from '@/src/components/Common/Icons/CheckboxIcon';
import RadioButtonIcon from '@/src/components/Common/Icons/RadioButtonIcon';

import AppContext from './context';
import { ExtendedTypographyOptions } from './types';

function Theme({ children }) {
  const [color, setColor] = useState('#1976d2');

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        main: radixColors.orange.orange9,
        light: radixColors.orange.orange6,
        dark: radixColors.orange.orange11,
        contrastText: radixColors.whiteA.whiteA12,
      },
      secondary: {
        main: radixColors.sand.sand9,
        light: radixColors.sand.sand6,
        dark: radixColors.sand.sand11,
        contrastText: radixColors.blackA.blackA12,
      },
      error: {
        main: radixColors.tomato.tomato9,
        contrastText: radixColors.whiteA.whiteA12,
      },
      warning: {
        main: radixColors.yellow.yellow9,
        contrastText: radixColors.whiteA.whiteA12,
      },
      info: {
        light: radixColors.sky.sky6,
        main: radixColors.sky.sky9,
        dark: radixColors.sky.sky11,
        contrastText: radixColors.whiteA.whiteA12,
      },
      success: {
        main: radixColors.jade.jade9,
        contrastText: radixColors.whiteA.whiteA12,
      },

      background: {
        default: radixColors.sand.sand2,
        paper: radixColors.sand.sand2,
      },
      text: {
        primary: radixColors.sand.sand12,
        secondary: radixColors.sand.sand11,
        disabled: radixColors.sand.sand8,
      },
    },

    typography: {
      fontFamily: 'var(--text)',
      h1: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-8)',
        lineHeight: 'var(--line-height-8)',
        letterSpacing: 'var(--letter-spacing-3)',
        color: 'var(--neutral-12)',
      },
      h2: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-7)',
        lineHeight: 'var(--line-height-7)',
        letterSpacing: 'var(--letter-spacing-3)',
        color: 'var(--neutral-12)',
      },
      h3: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-6)',
        lineHeight: 'var(--line-height-6)',
        letterSpacing: 'var(--letter-spacing-3)',
        color: 'var(--neutral-12)',
      },
      h4: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-5)',
        lineHeight: 'var(--line-height-5)',
        letterSpacing: 'var(--letter-spacing-3)',
        color: 'var(--neutral-12)',
      },
      h5: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-4)',
        lineHeight: 'var(--line-height-4)',
        letterSpacing: 'var(--letter-spacing-3)',
        color: 'var(--neutral-12)',
      },
      h6: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-3)',
        lineHeight: 'var(--line-height-3)',
        letterSpacing: 'var(--letter-spacing-3)',
        color: 'var(--neutral-12)',
      },
      subtitle1: {
        fontFamily: 'var(--text)',
        fontWeight: '500',
        fontSize: 'var(--font-size-2)',
        lineHeight: 'var(--line-height-2)',
        letterSpacing: 'var(--letter-spacing-2)',
        color: 'var(--neutral-12)',
      },
      subtitle2: {
        fontFamily: 'var(--text)',
        fontWeight: '500',
        fontSize: 'var(--font-size-1)',
        lineHeight: 'var(--line-height-1)',
        letterSpacing: 'var(--letter-spacing-1)',
        color: 'var(--neutral-12)',
      },
      body1: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-normal)',
        fontSize: 'var(--font-size-2)',
        lineHeight: 'var(--line-height-2)',
        letterSpacing: 'var(--letter-spacing-2)',
        color: 'var(--neutral-11)',
      },
      body1medium: {
        fontWeight: 500,
        fontSize: 'var(--font-size-2)',
        lineHeight: 'var(--line-height-2)',
        letterSpacing: 'var(--letter-spacing-2)',
        color: 'var(--neutral-12)',
      },
      body1bold: {
        fontWeight: 700,
        fontSize: 'var(--font-size-2)',
        lineHeight: 'var(--line-height-2)',
        letterSpacing: 'var(--letter-spacing-2)',
        color: 'var(--neutral-12)',
      },
      body2medium: {
        fontWeight: 500,
        fontSize: 'var(--font-size-1)',
        lineHeight: 'var(--line-height-1)',
        letterSpacing: 'var(--letter-spacing-1)',
        color: 'var(--neutral-12)',
      },
      body2bold: {
        fontWeight: 700,
        fontSize: 'var(--font-size-1)',
        lineHeight: 'var(--line-height-1)',
        letterSpacing: 'var(--letter-spacing-1)',
        color: 'var(--neutral-12)',
      },
      body2: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-normal)',
        fontSize: 'var(--font-size-1)',
        lineHeight: 'var(--line-height-1)',
        letterSpacing: 'var(--letter-spacing-1)',
        color: 'var(--neutral-11)',
      },
      button: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-bold)',
        fontSize: 'var(--font-size-3)',
        lineHeight: 'var(--line-height-3)',
        letterSpacing: 'var(--letter-spacing-1)',
        textTransform: 'uppercase',
        color: 'var(--neutral-12)',
      },
      caption: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-normal)',
        fontSize: 'var(--font-size-2)',
        lineHeight: 'var(--line-height-2)',
        letterSpacing: 'var(--letter-spacing-1)',
        color: 'var(--neutral-11)',
      },
      overline: {
        fontFamily: 'var(--text)',
        fontWeight: 'var(--font-weight-normal)',
        fontSize: 'var(--font-size-2)',
        lineHeight: 'var(--line-height-2)',
        letterSpacing: 'var(--letter-spacing-1)',
        textTransform: 'uppercase',
        color: 'var(--neutral-11)',
      },
    } as ExtendedTypographyOptions,
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true, // Disable elevation (box shadow) for all buttons
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            padding: 'var(--space-2) var(--space-3)',
            fontSize: 'var(--font-size-2)',
            lineHeight: 'var(--line-height-2)',
            letterSpacing: 'var(--letter-spacing-2)',
            borderRadius: 'var(--radius-2)',
            fontFamily: 'var(--text)',
            fontWeight: '500',
          },
          contained: {
            boxShadow: 'none', // Level 1 shadow
          },
          outlined: {
            padding: 'var(--space-2) var(--space-3)',
          },
          text: {
            padding: 'var(--space-2) var(--space-3)',
          },
        },
        variants: [
          {
            props: { size: 'small' },
            style: {
              padding: 'var(--space-1) var(--space-2)',
              fontSize: 'var(--font-size-1)',
              lineHeight: 'var(--line-height-1)',
              letterSpacing: 'var(--letter-spacing-1)',
              minWidth: 'auto',
            },
          },
        ],
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true, // Disable ripple effect globally for all components
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true, // Disable ripple effect globally for all components
        },
        styleOverrides: {
          root: {
            padding: 'var(--space-1)',
            fontFamily: 'var(--text)',
            borderRadius: 'var(--radius-2)',
            '&.MuiIconButton-colorPrimary': {
              backgroundColor: 'var(--accent-4)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--accent-5)',
              },
            },
            '&.MuiIconButton-colorSecondary': {
              backgroundColor: 'var(--neutral-5)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--neutral-6)',
              },
            },
            '&.MuiIconButton-colorSuccess': {
              backgroundColor: 'var(--jade-5)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--jade-6)',
              },
            },
            '&.MuiIconButton-colorError': {
              backgroundColor: 'var(--tomato-5)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--tomato-6)',
              },
            },
            '&.MuiIconButton-colorWarning': {
              backgroundColor: 'var(--yellow-5)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--yellow-6)',
              },
            },
            '&.MuiIconButton-colorInfo': {
              backgroundColor: 'var(--sky-5)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--sky-6)',
              },
            },
            '&.MuiIconButton-outlined': {
              border: '1px solid currentColor',
              backgroundColor: 'transparent',
            },
            '&.MuiIconButton-contained': {
              backgroundColor: 'currentColor',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'darken(currentColor, 0.1)',
              },
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            body1bold: 'p',
            body1medium: 'p',
            body2bold: 'p',
            body2medium: 'p',
          },
        },
        styleOverrides: {
          root: {
            fontFamily: 'var(--text)',
          },
        },
      },

      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            // margin: 'var(--space-2)',
            fontFamily: 'var(--text)',
          },
          label: {
            fontSize: 'var(--font-size-2)',
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: false,
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            padding: 'var(--space-1) var(--space-2)',
            fontFamily: 'var(--text)',
            backgroundColor: 'var(--white)',
          },
          input: {
            fontSize: 'var(--font-size-2)',
            lineHeight: 'var(--line-height-2)',
            letterSpacing: 'var(--letter-spacing-3)',
            fontFamily: 'var(--text)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
          variant: 'outlined',
          InputLabelProps: {
            shrink: false,
          },
          placeholder: 'Enter text',
        },
        styleOverrides: {
          root: {
            '& .Mui-disabled': {
              backgroundColor: 'var(--neutral-2)',
            },
            '& .MuiInputLabel-root': {
              display: 'none',
            },
            '& fieldset legend': {
              display: 'none',
            },
            '& .MuiInputBase-root': {
              padding: 'var(--space-1) var(--space-2)',
              fontSize: 'var(--font-size-2)',
              lineHeight: 'var(--line-height-2)',
              letterSpacing: 'var(--letter-spacing-3)',
              fontFamily: 'var(--text)',
              borderRadius: 'var(--radius-2)',
              '&.Mui-focused': {
                boxShadow: 'var(--shadow-4)', // Level 4 shadow
              },
            },
            '& .MuiInputBase-input': {
              padding: 'var(--space-1)  var(--space-2)',
              fontSize: 'var(--font-size-2)',
              lineHeight: 'var(--line-height-2)',
              letterSpacing: 'var(--letter-spacing-3)',
              fontFamily: 'var(--text)',
              color: 'var(--neutral-11)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              top: 0,
            },
            '& .MuiButtonBase-root': {
              // Button inside textfield
              paddingRight: 'var(--space-3)',
            },
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          renderInput: (params) => <TextField {...params} />,
        },
        styleOverrides: {
          root: {
            '& fieldset legend': {
              display: 'none',
            },
            '& .MuiInputLabel-root': {
              display: 'none',
            },
            '& .MuiInputBase-root .MuiButtonBase-root': {
              paddingRight: 0, // Remove the right padding for ButtonBase in Autocomplete TextField
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            padding: 'var(--space-1)',
            fontFamily: 'var(--text)',
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root': {
              transform: 'translate(14px, 8px) scale(1)',
              color: 'var(--neutral-11)',
            },
            '& .MuiInputLabel-root.MuiFormLabel-filled': {
              display: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              top: 0,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--text)',
            '& .MuiInputLabel-root': {
              display: 'none',
            },
            '& fieldset legend': {
              display: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              top: 0,
            },
          },
          select: {
            padding: 'var(--space-1)',
            fontSize: 'var(--font-size-2)',
            lineHeight: 'var(--line-height-2)',
            letterSpacing: 'var(--letter-spacing-3)',
            fontFamily: 'var(--text)',
          },
          icon: {
            right: 'var(--space-1)',
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          icon: <CheckboxIcon variant='unchecked' size={'16px'} />,
          indeterminateIcon: (
            <CheckboxIcon variant='indeterminate' size={'16px'} />
          ),
          checkedIcon: <CheckboxIcon variant='checked' size={'16px'} />,
        },
        styleOverrides: {
          root: ({ size }) => ({
            padding: 0,
            width: size,
            height: size,
            '&.Mui-disabled': {
              '& .MuiSvgIcon-root': {
                opacity: 0.4,
              },
            },
          }),
        },
      },
      MuiRadio: {
        defaultProps: {
          disableRipple: true,
          icon: <RadioButtonIcon variant='unchecked' />,
          checkedIcon: <RadioButtonIcon variant='checked' />,
        },
        styleOverrides: {
          root: {
            padding: 'var(--space-0)',
            '&.Mui-disabled': {
              '& .MuiSvgIcon-root': {
                fill: '#19130029',
              },
            },
          },
        },
      },
      MuiRadioGroup: {
        styleOverrides: {
          root: {
            gap: 'var(--space-2)',
          },
        },
      },
      // MuiSwitch: {
      //   styleOverrides: {
      //     root: {
      //       width: '40px', // adjusted width
      //       height: '24px', // adjusted height
      //       padding: '2px', // adjusted padding
      //     },
      //     switchBase: {
      //       padding: '2px', // adjusted padding
      //       '&.Mui-checked': {
      //         transform: 'translateX(16px)', // adjust the position when checked
      //       },
      //     },
      //     thumb: {
      //       width: '20px', // adjusted width
      //       height: '20px', // adjusted height
      //     },
      //     track: {
      //       borderRadius: '12px', // adjusted borderRadius
      //     },
      //   },
      // },

      MuiAlert: {
        styleOverrides: {
          root: {
            padding: '0 var(--space-2)',
            borderRadius: 'var(--radius-1)',
            boxShadow: 'none', // Level 2 shadow
            fontFamily: 'var(--text)',
            fontSize: 'var(--font-size-1)',
            lineHeight: 'var(--line-height-1)',
            letterSpacing: 'var(--letter-spacing-1)',
            backgroundColor: 'var(--info-1)',
            border: '1px solid var(--info-6)',
            '& .MuiAlert-message': {
              padding: 'var(--space-1)',
            },
            '& .MuiAlert-message p': {
              color: 'var(--info-a11)',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            objectFit: 'cover',
            '&.MuiAvatar-circular-small': {
              fontSize: 'var(--font-size-2)',
              width: 'var(--space-6)',
              height: 'var(--space-6)',
              borderRadius: 'var(--radius-full)',
            },
            '&.MuiAvatar-circular-medium': {
              fontSize: 'var(--font-size-4)',
              width: 'var(--space-7)',
              height: 'var(--space-7)',
            },
            '&.MuiAvatar-circular-large': {
              fontSize: 'var(--font-size-6)',
              width: 'var(--space-9)',
              height: 'var(--space-9)',
            },
            '&.MuiAvatar-rounded-xs': {
              fontSize: 'var(--font-size-2)',
              width: 'var(--space-4)',
              height: 'var(--space-4)',
              borderRadius: 'var(--radius-1)',
            },
            '&.MuiAvatar-rounded-small': {
              fontSize: 'var(--font-size-2)',
              width: 'var(--space-5)',
              height: 'var(--space-5)',
              borderRadius: 'var(--radius-2)',
            },
            '&.MuiAvatar-rounded-medium': {
              fontSize: 'var(--font-size-4)',
              width: 'var(--space-7)',
              height: 'var(--space-7)',
              borderRadius: 'var(--radius-2)',
            },
            '&.MuiAvatar-rounded-large': {
              fontSize: 'var(--font-size-6)',
              width: 'var(--space-9)',
              height: 'var(--space-9)',
              borderRadius: 'var(--radius-3)',
            },
            '&.MuiAvatar-square-small': {
              fontSize: 'var(--font-size-2)',
              width: 'var(--space-5)',
              height: 'var(--space-5)',
              borderRadius: 'var(--radius-0)',
            },
            '&.MuiAvatar-square-medium': {
              fontSize: 'var(--font-size-4)',
              width: 'var(--space-7)',
              height: 'var(--space-7)',
              borderRadius: 'var(--radius-0)',
            },
            '&.MuiAvatar-square-large': {
              fontSize: 'var(--font-size-6)',
              width: 'var(--space-9)',
              height: 'var(--space-9)',
              borderRadius: 'var(--radius-0)',
            },
          },
        },
      },
      MuiAvatarGroup: {
        styleOverrides: {
          root: {
            gap: 'var(--space-2)',
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            padding: 'var(--space-1)',
            borderRadius: 'var(--radius-2)',
            fontFamily: 'var(--text)',
            fontSize: 'var(--font-size-2)',
            lineHeight: 'var(--line-height-2)',
            letterSpacing: 'var(--letter-spacing-2)',
            backgroundColor: 'var(--neutral-a3)',
            color: 'var(--neutral-a11)',
            '& .MuiChip-deleteIcon': {
              width: 'var(--space-4)',
              height: 'var(--space-4)',
              margin: '0 var(--space-1)',
              padding: 0,
            },
          },
          label: {
            padding: '0 var(--space-1)',
          },
          icon: {},
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: 'var(--accent-9)',
          },
        },
      },

      // MuiTimePicker: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },
      // MuiDateCalendar: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },
      // MuiDatePicker: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },
      // MuiDateRangeCalendar: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },
      // MuiDesktopDatePicker: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },
      // MuiDesktopDateTimePicker: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },
      // MuiDesktopTimePicker: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },

      MuiMenu: {
        styleOverrides: {
          paper: {
            padding: 0,
            borderRadius: 'var(--radius-2)',
            '& .MuiMenu-list': {
              padding: 0,
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: 'var(--space-2)',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            padding: 0,
            borderRadius: 'var(--radius-2)',
            boxShadow: 'var(--shadow-3)', // Level 3 shadow
          },
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--neutral-2)',
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            height: 'var(--slider-height)',
            padding: 'var(--space-2) 0',
          },
          thumb: {
            width: 'var(--slider-thumb-size)',
            height: 'var(--slider-thumb-size)',
            marginTop: 'var(--space-1)',
            marginLeft: '-var(--space-1)',
          },
          track: {
            height: 'var(--slider-track-height)',
          },
          rail: {
            height: 'var(--slider-track-height)',
          },
        },
      },

      // MuiStaticDateTimePicker: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //       fontFamily: 'var(--text)',
      //     },
      //   },
      // },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'var(--neutral-2)',
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-2)',
            borderRadius: 'var(--radius-2)',
            boxShadow: 'var(--shadow-3)', // Level 3 shadow
          },
          arrow: {
            '::before': {
              boxShadow: 'var(--shadow-2)', // Level 3 shadow
              backgroundColor: 'var(--white)',
            },
          },
        },
      },

      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: 'separate',
            borderSpacing: '0 var(--space-1)',
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--text)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: 'var(--space-2)',
            borderBottom: 'none',
            fontFamily: 'var(--text)',
          },
          head: {
            fontWeight: 'bold',
            backgroundColor: 'var(--neutral-2)',
          },
          body: {
            backgroundColor: 'var(--neutral-2)',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            padding: 'var(--space-2)',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--text)',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:last-child td, &:last-child th': {
              borderBottom: 0,
            },
            '&:nth-of-type(odd)': {
              backgroundColor: 'var(--color-background-alternate)',
            },
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize', // Set text to title case
            fontWeight: 500, // Medium font weight
            fontSize: 'var(--font-size-2)', // Custom font size
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          // You can set default props here if needed
        },
        styleOverrides: {
          paper: {
            // borderRadius: '4px',
            // marginTop: '4px',
            // padding: 'var(--space-4)',
            boxShadow: 'var(--shadow-4)', // Level 4 shadow
          },
          paperFullScreen: {
            borderRadius: '0',
            // padding: 'var(--space-4)',
            boxShadow: 'var(--shadow-4)', // Level 4 shadow
          },
          paperFullWidth: {
            // padding: 'var(--space-4)',
            boxShadow: 'var(--shadow-4)', // Level 4 shadow
          },
          paperScrollBody: {
            borderRadius: '4px',
            marginTop: '4px',
            // padding: 'var(--space-4)',
            boxShadow: 'var(--shadow-4)', // Level 4 shadow
          },
          paperScrollPaper: {
            borderRadius: '4px',
            marginTop: '4px',
            // padding: 'var(--space-4)',
            boxShadow: 'var(--shadow-4)', // Level 4 shadow
          },
        },
      },
      // MuiBox: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-2)',
      //     },
      //   },
      // },
      // MuiStack: {
      //   styleOverrides: {
      //     root: {
      //       '& .MuiStack-root': {
      //         borderColor: 'var(--neutral-6)',
      //       },
      //       '& .react-tel-input .form-control:focus': {
      //         borderColor: 'var(--accent-9)',
      //         outline: 'none !important',
      //       },
      //       '& .react-tel-input .form-control:hover': {
      //         borderColor: 'var(--neutral-9)',
      //       },
      //       '& .react-tel-input .flag-dropdown:focus': {
      //         borderColor: 'var(--accent-9)',
      //         outline: 'none !important',
      //       },
      //     },
      //   },
      // },
      MuiCard: {
        styleOverrides: {
          root: {
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-4)',
            boxShadow: 'var(--shadow-2)', // Level 2 shadow
          },
        },
      },

      MuiContainer: {
        styleOverrides: {
          root: {
            padding: 'var(--space-5)',
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            margin: 'var(--space-3) 0',
            bg: 'var(--neutral-3)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            padding: 0,
            // borderRadius: 'var(--radius-3)',
            border: 'none',
            boxShadow: 'var(--shadow-3)', // Level 3 shadow
          },
        },
      },

      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            '&.success': {
              backgroundColor: 'var(--jade-9)',
            },
            '&.error': {
              backgroundColor: 'var(--tomato-9)',
            },
            '&.warning': {
              backgroundColor: 'var(--yellow-9)',
            },
            '&.info': {
              backgroundColor: 'var(--sky-9)',
            },
          },
        },
      },

      // MuiGrid: {
      //   styleOverrides: {
      //     container: {
      //       gap: 'var(--space-3)',
      //     },
      //   },
      // },

      // MuiPaper: {
      //   styleOverrides: {
      //     root: {
      //       padding: 'var(--space-4)',
      //       borderRadius: 'var(--radius-3)',
      //       boxShadow: 'var(--shadow-3)', // Level 3 shadow
      //     },
      //   },
      // },
    },
  });

  return (
    <AppContext.Provider value={{ color, setColor }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
export default Theme;

// Create a theme instance.

export const palette = {
  white: {
    100: 'var(--white-a6)',
    200: 'var(--white-a3)',
    300: 'var(--white-a1)',
    700: 'var(--white)',
  },
  grey: {
    100: 'var(--sand-1)',
    400: 'var(--sand-6)',
    500: 'var(--sand-8)',
    600: 'var(--sand-10)',
    700: 'var(--sand-11)',
    800: 'var(--sand-12)',
  },
  blue: {
    400: 'var(--sky-8)',
    600: 'var(--sky-9)',
  },
  green: {
    800: 'var(--jade-12)',
  },
  red: {
    400: 'var(--tomato-8)',
    500: 'var(--tomato-9)',
    800: 'var(--tomato-12)',
  },
  yellow: {
    600: 'var(--yellow-8)',
    700: 'var(--yellow-9)',
    800: 'var(--yellow-10)',
  },
  kale: {
    600: 'var(--jade-8)',
  },
};
