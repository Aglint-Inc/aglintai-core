/* eslint-disable security/detect-object-injection */
import { debounce } from 'lodash';
import {
  type Message,
  type Toast as Toaster,
  type ToastOptions,
  createToast,
} from 'vercel-toast';

const toastOptions: ToastOptions = {
  timeout: 3000,
  cancel: '✕',
  type: 'dark',
};
export class Toast {
  static asyncToast: { [key: string]: Toaster } = {};
  error(message) {
    createToast(message, {
      ...toastOptions,
      type: 'error',
    });
  }

  success(message) {
    createToast(message, {
      ...toastOptions,
      type: 'success',
    });
  }

  warning(message) {
    createToast(message, {
      ...toastOptions,
      type: 'warning',
    });
  }

  action(message, onUndo) {
    createToast(message, {
      ...toastOptions,
      type: 'dark',
      action: {
        text: 'Undo',
        callback(toast) {
          toast.destroy();
          onUndo && onUndo();
        },
      },
    });
  }

  message(message) {
    createToast(message, toastOptions);
  }

  promise<T>(
    debounce_id: string,
    func: Promise<T>,
    messages?: { onSuccess?: Message; onError?: Message; onPending?: Message },
  ) {
    const tempMessages = {
      onSuccess: 'Success',
      onError: 'Error',
      onPending: 'Pending',
      ...messages,
    };
    if (!Toast.asyncToast[debounce_id]) {
      Toast.asyncToast[debounce_id] = createToast(tempMessages.onPending, {
        ...toastOptions,
        timeout: undefined,
        type: 'default',
      });
    }
    if (func) {
      func
        .then((data) => {
          Toast.asyncToast[debounce_id].message = tempMessages.onSuccess;
          Toast.asyncToast[debounce_id].options = {
            ...toastOptions,
            type: 'success',
            timeout: 2000,
          };
          Toast.asyncToast[debounce_id].message = tempMessages.onSuccess;
          Toast.asyncToast[debounce_id].options = {
            ...toastOptions,
            type: 'success',
            timeout: 2000,
          };
          return data;
        })
        .catch((error) => {
          Toast.asyncToast[debounce_id].message = tempMessages.onError;
          Toast.asyncToast[debounce_id].options = {
            ...toastOptions,
            type: 'error',
            timeout: 2000,
          };
          throw error;
        })
        .finally(() => {
          Toast.asyncToast[debounce_id].destroy();
          Toast.asyncToast[debounce_id].insert();
          delete Toast.asyncToast[debounce_id];
        });
    }
  }
  debouncedPromise(debounce_id: string) {
    // eslint-disable-next-line no-unused-vars
    return <T extends (...x: unknown[]) => Promise<unknown>>(
      fun: T,
      delay: number,
      messages?: {
        onSuccess?: Message;
        onError?: Message;
        onPending?: Message;
      },
    ) => {
      messages = {
        onSuccess: 'Success!',
        onError: 'Error!!',
        onPending: 'Pending...',
        ...messages,
      };
      const tempFunc = debounce((...x) => {
        this.promise(debounce_id, fun(...x), messages);
      }, delay);
      return (...x: Parameters<T>) => {
        if (!Toast.asyncToast[debounce_id]) {
          Toast.asyncToast[debounce_id] = createToast(messages.onPending, {
            ...toastOptions,
            timeout: undefined,
            type: 'default',
          });
        }
        return tempFunc(...x);
      };
    };
  }
}
const toast = new Toast();
export default toast;
