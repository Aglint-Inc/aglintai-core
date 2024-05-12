// import 'vercel-toast/css';
import { createToast } from 'vercel-toast';

const toast = {
  error: (message) => {
    createToast(message, {
      timeout: 3000,
      type: 'error',
      cancel: '✕',
    });
  },

  success: (message) => {
    createToast(message, {
      timeout: 3000,
      type: 'success',
      cancel: '✕',
    });
  },

  warning: (message) => {
    createToast(message, {
      timeout: 3000,
      type: 'warning',
      cancel: '✕',
    });
  },

  action: (message, onUndo) => {
    createToast(message, {
      timeout: 3000,
      type: 'dark',
      action: {
        text: 'Undo',
        callback(toast) {
          toast.destroy();
          onUndo && onUndo();
        },
      },
      cancel: '✕',
    });
  },

  message: (message) => {
    createToast(message, {
      timeout: 3000,
      cancel: '✕',
      default: '',
      type: 'dark',
    });
  },
};

export default toast;
