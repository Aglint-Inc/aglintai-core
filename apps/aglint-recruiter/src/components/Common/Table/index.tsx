import { palette } from '@context/Theme/Theme';
import {
  Checkbox,
  // Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

import { Checkbox as DevCheckbox } from '@/devlink/Checkbox';

import Icon from '../Icons/Icon';

interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: any;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount, headCells } = props;
  // const { headCells } = props;

  return (
    <TableHead
      className='header-row'
      sx={{ bgcolor: palette.grey[100], borderRadius: '4px' }}
    >
      <TableRow>
        <EnhancedCheckBoxCell>
          <Stack position={'relative'} sx={{ display: 'none' }}>
            <Stack
              sx={{ position: 'absolute', top: '-8px', bgcolor: '#fff' }}
              zIndex={1}
            >
              <DevCheckbox
                isChecked={rowCount > 0 && numSelected === rowCount}
                onClickCheck={{ id: 'select-all' }}
              />
            </Stack>

            <Checkbox
              sx={{
                marginTop: '-6px',
                padding: 0,
                visibility: 'false',
                position: 'absolute',
                '&.Mui-checked': {
                  color: palette.blue[600],
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 14,
                },
              }}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
              id='select-all'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </Stack>
        </EnhancedCheckBoxCell>
        {headCells.map((headCell) => (
          <EnhancedCell key={headCell.id}>
            <Stack
              direction='row'
              justifyItems={'start'}
              alignItems='center'
              gap={0.9}
            >
              <Icon
                variant={headCell.icon}
                height='16px'
                width='16px'
                color='#555555'
              />
              <Typography variant='body2' color={palette.grey[800]}>
                {headCell.label}
              </Typography>
            </Stack>
          </EnhancedCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  deleteHandler: () => void;
  numSelected: number;
  deselectAll: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, deleteHandler, deselectAll } = props;

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={'4px'}
      sx={{
        ...(numSelected > 0 && {
          bgcolor: palette['grey'][100],
        }),
        '.MuiToolbar-root': {
          minHeight: '10px!important',
        },
        borderRadius: '4px',
        minHeight: '40px',
        px: '30px',
        mt: '4px',
      }}
      spacing={'24px'}
    >
      <DevCheckbox
        isChecked={true}
        onClickCheck={{
          onClick: () => {
            deselectAll();
          },
          id: 'select-all',
        }}
      />

      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton onClick={deleteHandler} id='delete'>
            <Icon variant='DeleteIcon' height='18px' width='18px' />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

function CustomTable({
  body,
  deleteHandler,
  selected,
  handleSelectAllClick,
  headCells,
  rowLength,
  deselectAll,
}) {
  return (
    <Stack sx={{ width: '100%', mb: 2 }}>
      {selected.length > 0 && (
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteHandler={deleteHandler}
          deselectAll={deselectAll}
        />
      )}

      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby='tableTitle'
          size={'small'}
        >
          {selected.length === 0 && (
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rowLength}
            />
          )}
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default CustomTable;

export const EnhancedCheckBoxCell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TableCell
      style={{
        width: '4%',
        border: 'none',
        padding: '10px',
        paddingLeft: '30px',
      }}
      padding='checkbox'
      align='left'
    >
      {children}
    </TableCell>
  );
};

export const EnhancedCell = ({ children, sx = {} }) => (
  <TableCell
    style={{
      width: '16%',
      border: 'none',
      padding: '10px',
      ...sx,
      marginBottom: '10px !important',
    }}
    align='left'
  >
    <Typography
      className='one-line-clamp'
      variant='body2'
      color={palette.grey[800]}
    >
      {children}
    </Typography>
  </TableCell>
);
