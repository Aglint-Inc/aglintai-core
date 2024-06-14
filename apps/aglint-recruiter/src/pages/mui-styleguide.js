/* eslint-disable security/detect-object-injection */
import { AccountCircle } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import SaveIcon from '@mui/icons-material/Save';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const CardExample = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='140'
        image='/static/images/cards/contemplative-reptile.jpg'
        alt='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          Lizard
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

const ButtonExamples = () => {
  const colors = [
    'primary',
    'secondary',
    'success',
    'error',
    'warning',
    'info',
  ];

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Buttons
      </Typography>
      <Grid container spacing={2}>
        {colors.map((color) => (
          <Grid item key={color}>
            <Button variant='contained' color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          </Grid>
        ))}
        {['primary', 'secondary'].map((color) => (
          <Grid item key={color}>
            <Button variant='outlined' color={color}>
              Outlined {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          </Grid>
        ))}
        {colors.map((color) => (
          <Grid item key={color}>
            <Button variant='text' color={color}>
              Text {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h4' gutterBottom>
        Buttons with Icons
      </Typography>
      <Grid container spacing={2}>
        {[
          { color: 'var(--accent-11)', label: 'Save', icon: <SaveIcon /> },
          { color: 'var(--error-11)', label: 'Delete', icon: <DeleteIcon /> },
          { color: 'var(--success-11)', label: 'Success', icon: <CheckIcon /> },
          { color: 'var(--error-11)', label: 'Error', icon: <ErrorIcon /> },
          { color: 'var(--warning-11)', label: 'Warning', icon: <WarningIcon /> },
          { color: 'var(--info-11)', label: 'Info', icon: <InfoIcon /> },
        ].map(({ color, label, icon }) => (
          <Grid item key={color}>
            <Button variant='contained' color={color} startIcon={icon}>
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h4' gutterBottom>
        Small Buttons
      </Typography>
      <Grid container spacing={2}>
        {colors.map((color) => (
          <Grid item key={color}>
            <Button variant='contained' color={color} size='small'>
              Small {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          </Grid>
        ))}
        {['primary', 'secondary'].map((color) => (
          <Grid item key={color}>
            <Button variant='outlined' color={color} size='small'>
              Small Outlined {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          </Grid>
        ))}
        {colors.map((color) => (
          <Grid item key={color}>
            <Button variant='text' color={color} size='small'>
              Small Text {color.charAt(0).toUpperCase() + color.slice(1)}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h4' gutterBottom>
        Small Buttons with Icons
      </Typography>
      <Grid container spacing={2}>
        {[
          { color: 'var(--accent-11)', label: 'Save', icon: <SaveIcon /> },
          { color: 'var(--error-11)', label: 'Delete', icon: <DeleteIcon /> },
          { color: 'var(--success-11)', label: 'Success', icon: <CheckIcon /> },
          { color: 'var(--error-11)', label: 'Error', icon: <ErrorIcon /> },
          { color: 'var(--warning-11)', label: 'Warning', icon: <WarningIcon /> },
          { color: 'var(--info-11)', label: 'Info', icon: <InfoIcon /> },
        ].map(({ color, label, icon }) => (
          <Grid item key={color}>
            <Button
              variant='contained'
              color={color}
              size='small'
              startIcon={icon}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h4' gutterBottom>
        Loading State Buttons
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant='contained' size='small' disabled>
            <CircularProgress size={16} color='inherit' />
          </Button>

          <Button variant='outlined' size='small' disabled>
            <CircularProgress size={16} color='inherit' /> Error
          </Button>
        </Grid>
      </Grid>

      <Typography variant='h4' gutterBottom>
        Icon Buttons
      </Typography>
      <Grid container spacing={2}>
        {colors.map((color) => (
          <Grid item key={color}>
            <IconButton color={color}>
              <SaveIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const ButtonGroupExample = () => (
  <>
    <Typography variant='h4' gutterBottom>
      Button Group
    </Typography>
    <Box sx={{ display: 'flex', '& > *': { m: 1 } }}>
      <ButtonGroup color='primary' aria-label='outlined primary button group'>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup
        color='primary'
        variant='contained'
        aria-label='outlined primary button group'
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup
        color='primary'
        variant='text'
        aria-label='outlined primary button group'
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Box>
  </>
);

const ToggleButtonExample = () => {
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Toggle Button
      </Typography>
      <ToggleButtonGroup
        size='small'
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label='text alignment'
      >
        <ToggleButton value='left' aria-label='left aligned'>
          Left
        </ToggleButton>
        <ToggleButton value='center' aria-label='centered'>
          Center
        </ToggleButton>
        <ToggleButton value='right' aria-label='right aligned'>
          Right
        </ToggleButton>
        <ToggleButton value='justify' aria-label='justified' disabled>
          Justify
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

const TypographyExamples = () => (
  <>
    <Typography variant='h4' gutterBottom>
      Typography
    </Typography>
    {[
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'button',
      'caption',
      'overline',
    ].map((variant) => (
      <Typography
        variant={variant}
        display={
          variant === 'button' ||
          variant === 'caption' ||
          variant === 'overline'
            ? 'block'
            : undefined
        }
        gutterBottom
        key={variant}
      >
        {`${variant} Text`}
      </Typography>
    ))}
    <Typography variant='body1' gutterBottom>
      Body 1
    </Typography>
    <Typography variant='body1medium' gutterBottom>
      Body 1 Medium
    </Typography>
    <Typography variant='body1bold' gutterBottom>
      Body 1 Bold
    </Typography>

    <Typography variant='body2' gutterBottom>
      Body 2
    </Typography>
    <Typography variant='body2medium' gutterBottom>
      Body 2 Medium
    </Typography>
    <Typography variant='body2bold' gutterBottom>
      Body 2 Bold
    </Typography>
  </>
);
const TableExample = () => {
  const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  };

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Table
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const DialogExample = () => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Dialog
      </Typography>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>This is the dialog content.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Button
        variant='outlined'
        onClick={handleClickOpenConfirm}
        style={{ marginLeft: '10px' }}
      >
        Open Confirm Dialog
      </Button>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCloseConfirm} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AlertExamples = () => (
  <>
    <Typography variant='h4' gutterBottom>
      Alerts
    </Typography>
    {['error', 'warning', 'info', 'success'].map((severity) => (
      <Box sx={{ marginBottom: '20px' }} key={severity}>
        <Alert severity={severity} key={severity}>
          This is a {severity} alert — check it out!
        </Alert>
      </Box>
    ))}
  </>
);

const AccordionExample = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const AvatarExample = () => {
  return (
    <div>
      <Avatar
        alt='Remy Sharp'
        variant='rounded-small'
        src='/static/images/avatar/2.jpg'
      />
      <Avatar
        alt='Travis Howard'
        variant='rounded-medium'
        src='/static/images/avatar/2.jpg'
      />
      <Avatar
        alt='Cindy Baker'
        variant='rounded-large'
        src='/static/images/avatar/3.jpg'
      />

      <Avatar
        alt='Remy Sharp'
        variant='square-small'
        src='/static/images/avatar/1.jpg'
      />
      <Avatar
        alt='Remy Sharp'
        variant='square-medium'
        src='/static/images/avatar/1.jpg'
      />
      <Avatar
        alt='Remy Sharp'
        variant='square-large'
        src='/static/images/avatar/1.jpg'
      />

      <Avatar
        alt='Travis Howard'
        variant='circular-small'
        src='/static/images/avatar/2.jpg'
      />
      <Avatar
        alt='Travis Howard'
        variant='circular-medium'
        src='/static/images/avatar/2.jpg'
      />
      <Avatar
        alt='Travis Howard'
        variant='circular-large'
        src='/static/images/avatar/2.jpg'
      />
    </div>
  );
};

const AvatarGroupExample = () => {
  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        Avatar Group
      </Typography>
      <AvatarGroup max={4}>
        <Avatar alt='Remy Sharp' size='1' src='/static/images/avatar/1.jpg' />
        <Avatar
          alt='Travis Howard'
          size='2'
          src='/static/images/avatar/2.jpg'
        />
        <Avatar alt='Cindy Baker' size='3' src='/static/images/avatar/3.jpg' />
        <Avatar alt='Agnes Walker' size='4' src='/static/images/avatar/4.jpg' />
        <Avatar
          alt='Trevor Henderson'
          size='5'
          src='/static/images/avatar/5.jpg'
        />
      </AvatarGroup>
    </Container>
  );
};

const BadgeExample = () => {
  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        Badge
      </Typography>
      <IconButton aria-label='mail'>
        <Badge badgeContent={4} color='primary'>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label='mail'>
        <Badge badgeContent={10} color='secondary'>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label='mail'>
        <Badge badgeContent={0} color='error' showZero>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label='mail'>
        <Badge badgeContent={99} color='primary'>
          <MailIcon />
        </Badge>
      </IconButton>
    </Container>
  );
};

export const CheckboxExample = () => {
  return (
    <div>
      <FormControlLabel control={<Checkbox />} label='Checkbox 1' />
      <FormControlLabel control={<Checkbox />} label='Checkbox 2' />
    </div>
  );
};

const ChipExample = () => {
  return (
    <div>
      <Chip label='Chip 1' />
      <Chip label='Chip 2' />
    </div>
  );
};

export const CircularProgressExample = () => {
  return (
    <div>
      <CircularProgress />
      <CircularProgress color='secondary' />
    </div>
  );
};

export const AutocompleteExample = () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label='Autocomplete' />}
    />
  );
};

export const InputAdornmentExample = () => {
  return (
    <TextField
      label='Input with icon'
      InputProps={{
        startAdornment: (
          <InputAdornment position='end'>
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  );
};

export const RadioExample = () => {
  return (
    <div>
      <FormControlLabel control={<Radio />} label='Radio 1' />
      <FormControlLabel control={<Radio />} label='Radio 2' />
    </div>
  );
};

export const RadioGroupExample = () => {
  return (
    <RadioGroup>
      <FormControlLabel control={<Radio />} label='Option 1' />
      <FormControlLabel control={<Radio />} label='Option 2' />
    </RadioGroup>
  );
};

const RatingExample = () => {
  return <Rating name='simple-controlled' />;
};

export const SelectExample = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>Age</InputLabel>
      <Select value={age} onChange={handleChange}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export const SwitchExample = () => {
  return (
    <div>
      <FormControlLabel control={<Switch />} label='Switch 1' />
      <FormControlLabel control={<Switch />} label='Switch 2' />
    </div>
  );
};

export const TextFieldExample = () => {
  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        TextField
      </Typography>
      <TextField
        label='Outlined'
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField label='Filled' variant='filled' fullWidth margin='normal' />
      <TextField
        label='Standard'
        variant='standard'
        fullWidth
        margin='normal'
      />
      <TextField
        label='With Helper Text'
        helperText='Some important text'
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Password'
        type='password'
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Disabled'
        variant='outlined'
        fullWidth
        margin='normal'
        disabled
      />
      <TextField
        label='Error'
        variant='outlined'
        fullWidth
        margin='normal'
        error
        helperText='Incorrect entry.'
      />
    </Container>
  );
};

const FormElementsExample = () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [age, setAge] = React.useState('');
  const [alignment, setAlignment] = React.useState('female');
  const [ratingValue, setRatingValue] = React.useState(null);

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const handleRadioChange = (event) => {
    setAlignment(event.target.value);
  };

  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        Form Elements
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={6}>
          <TextField
            label='Outlined'
            variant='outlined'
            fullWidth
            margin='normal'
            placeholder='Enter your text'
          />
        </Grid>
        <Grid item xs={4} sm={6}>
          <TextField
            label='With Helper Text'
            helperText='Some important text'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            placeholder='Enter your password'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label='Disabled'
            variant='outlined'
            fullWidth
            margin='normal'
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label='Error'
            variant='outlined'
            fullWidth
            margin='normal'
            error
            helperText='Incorrect entry.'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControlLabel control={<Checkbox />} label='Checkbox 1' />
          <FormControlLabel control={<Checkbox />} label='Checkbox 2' />
        </Grid>
        <Grid item xs={6} sm={6}>
          <RadioGroup value={alignment} onChange={handleRadioChange}>
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
          </RadioGroup>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControlLabel control={<Switch />} label='Switch 1' />
          <FormControlLabel control={<Switch />} label='Switch 2' />
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel>Age</InputLabel>
            <Select value={age} onChange={handleSelectChange} label='Age'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField {...params} label='Autocomplete' variant='outlined' />
            )}
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Rating
            name='simple-controlled'
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label='Input with icon'
            variant='outlined'
            fullWidth
            margin='normal'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const TooltipExample = () => {
  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        Tooltip
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Tooltip title='Delete'>
            <Button variant='contained' size='small'>
              Delete
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title='Add' arrow>
            <Button variant='contained' color='primary' size='small'>
              Add
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title='Edit' placement='right'>
            <Button variant='contained' color='secondary' size='small'>
              Edit
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title='Save' placement='bottom'>
            <Button variant='contained' color='success' size='small'>
              Save
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title='Info' placement='top-start'>
            <Button variant='contained' color='info' size='small'>
              Info
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title='Warning' placement='top-end'>
            <Button variant='contained' color='warning' size='small'>
              Warning
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
};

const SnackbarExample = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('info'); // Default status

  const handleClick = (newStatus) => () => {
    setStatus(newStatus);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Snackbar
      </Typography>
      <Stack spacing={2} direction={'row'}>
        <Button
          variant='outlined'
          size='small'
          onClick={handleClick('success')}
        >
          Success
        </Button>
        <Button variant='outlined' size='small' onClick={handleClick('error')}>
          Error
        </Button>
        <Button
          variant='outlined'
          size='small'
          onClick={handleClick('warning')}
        >
          Warning
        </Button>
        <Button variant='outlined' size='small' onClick={handleClick('info')}>
          Info
        </Button>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`This is a ${status} snackbar message.`}
        ContentProps={{
          className: status,
        }}
        action={
          <>
            <Button color='secondary' size='small' onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
    </>
  );
};

const BreadcrumbsExample = () => (
  <>
    <Typography variant='h4' gutterBottom>
      Breadcrumbs
    </Typography>
    <Breadcrumbs aria-label='breadcrumb'>
      <Link color='inherit' href='/'>
        Home
      </Link>
      <Link color='inherit' href='/getting-started/installation/'>
        Core
      </Link>
      <Typography color='textPrimary'>Breadcrumb</Typography>
    </Breadcrumbs>
  </>
);

const DrawerExample = () => {
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Drawer
      </Typography>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Open {anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
};

const LinksExample = () => (
  <>
    <Typography variant='h4' gutterBottom>
      Links
    </Typography>
    <Link href='#' variant='body2'>
      Link
    </Link>
  </>
);

const MenuExample = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Menu
      </Typography>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};
const PaginationExample = () => (
  <>
    <Typography variant='h4' gutterBottom>
      Pagination
    </Typography>
    <Pagination count={10} />
  </>
);

export const StepperExample = () => {
  const steps = [
    'Select campaign settings',
    'Create an ad group',
    'Create an ad',
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Stepper
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography>{steps[activeStep]}</Typography>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant='contained' color='primary' onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
const TabsExample = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Tabs
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='simple tabs example'
      >
        <Tab label='Item One' />
        <Tab label='Item Two' />
        <Tab label='Item Three' />
      </Tabs>
      <div>
        {value === 0 && <Typography>Item One</Typography>}
        {value === 1 && <Typography>Item Two</Typography>}
        {value === 2 && <Typography>Item Three</Typography>}
      </div>
    </>
  );
};
const StyleGuide = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenConfirm, setDialogOpenConfirm] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorPopoverEl, setAnchorPopoverEl] = useState(null);

  const handlePopoverClick = (event) => {
    setAnchorPopoverEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorPopoverEl(null);
    setPopoverOpen(false);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClickOpenConfirm = () => {
    setDialogOpenConfirm(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCloseConfirm = () => {
    setDialogOpenConfirm(false);
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{ p: 4 }}
      style={{ background: 'var(--neutral-2)' }}
    >
      <Grid item xs={12} sm={6} md={8}>
        <ButtonExamples />
        <ButtonGroupExample />
        <ToggleButtonExample />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TypographyExamples />
        <LinksExample />
        <BreadcrumbsExample />
        <SnackbarExample />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <FormElementsExample />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TableExample />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <AlertExamples />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardExample />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <DrawerExample />
        <MenuExample />
        <PaginationExample />
        <TabsExample />
        <Typography variant='h4' gutterBottom>
          Popover
        </Typography>
        <Button
          size='small'
          aria-describedby={popoverOpen ? 'simple-popover' : undefined}
          variant='contained'
          onClick={handlePopoverClick}
        >
          Open Popover
        </Button>
        <Popover
          id='simple-popover'
          open={popoverOpen}
          anchorEl={anchorPopoverEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
        <Typography variant='h4' gutterBottom>
          Dialog
        </Typography>
        <Button variant='outlined' size='small' onClick={handleClickOpen}>
          Open Dialog
        </Button>
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogContent>
            <DialogContentText>This is the dialog content.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>

        <Button
          variant='outlined'
          size='small'
          onClick={handleClickOpenConfirm}
          style={{ marginLeft: '10px' }}
        >
          Open Confirm Dialog
        </Button>
        <Dialog open={dialogOpenConfirm} onClose={handleCloseConfirm}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleCloseConfirm} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TooltipExample />
        <RatingExample />
        <ChipExample />
        <AccordionExample />
        <AvatarExample />
        <AvatarGroupExample />
        <BadgeExample />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={1} sx={{ padding: 2, margin: 2 }}>
          <TextField
            label='Hidden Label'
            placeholder='Enter text'
            variant='outlined'
            fullWidth
          />
        </Paper>
        <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
          <Select
            label='Hidden Label'
            placeholder='Select an option'
            variant='outlined'
            displayEmpty
            fullWidth
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <Autocomplete
            options={['Option 1', 'Option 2', 'Option 3']}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Hidden Label'
                placeholder='Choose an option'
                variant='outlined'
                fullWidth
              />
            )}
          />
        </Paper>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
                <StepperExample />
            </Grid> */}
    </Grid>
  );
};

export default StyleGuide;
