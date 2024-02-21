import { dbName } from '@utils/dbname';
import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useAuthDetails } from '../AuthContext/AuthContext';

const NotificationsContext = createContext();
const useNotificationsContext = () => useContext(NotificationsContext);
const NotificationsContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { userDetails } = useAuthDetails();

  async function getNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userDetails?.session?.session?.user?.id)
      .order('id', { ascending: false });
    if (!error) {
      setNotifications(data);
    }
  }

  useEffect(() => {
    if (userDetails?.session?.session?.user?.id) {
      getNotifications();
      supabase
        .channel('custom-insert-channel')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userDetails?.session?.session?.user?.id}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new, ...prev]);
          },
        )
        .subscribe();
    }
  }, [userDetails]);

  const createNotification = async (res) => {
    const { error } = await supabase
      .from('notifications')
      .insert([
        {
          text: res?.text,
          type: res?.type,
          heading: res?.heading,
          employee_id: res?.employee_id,
          user_id: res?.user_id,
          senderdetails: res?.senderdetails,
        },
      ])
      .select();
    if (error) {
      toast.error(error.message);
    }
  };

  const makeNotificationSeen = async (id) => {
    setNotifications((prev) => {
      prev.map((n) => {
        if (n.id === id) {
          n.seen = true;
        }
      });
      return [...prev];
    });
    const { error } = await supabase
      .from(dbName.NOTIFICATIONS)
      .update({ seen: true })
      .eq('id', id);
    if (error) {
      toast.error(error.message);
    }
  };

  async function markAllnotifications() {
    const { error } = await supabase
      .from('notifications')
      .update({ seen: true })
      .eq('user_id', userDetails.session.session.user.id);
    if (!error) {
      getNotifications();
      return null;
    }
  }

  async function deleteAllnotifications() {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userDetails.session.session.user.id);
    if (!error) {
      setNotifications([]);
      return null;
    }
  }
  async function deletenotifications(id) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
    if (!error) {
      setNotifications(notifications.filter((pre) => pre.id !== id));
      return null;
    }
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        createNotification,
        getNotifications,
        makeNotificationSeen,
        markAllnotifications,
        deleteAllnotifications,
        deletenotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContextProvider, useNotificationsContext };
