import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

type form = {
  name: string;
  email: string;
  title: string;
  role: string;
};

type user = {
  email: string;
  user_id: string;
  status: "invited" | "active" | "suspended";
};

function User() {
  const [avaUsers, setAvailableUsers] = useState<form[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<{
    addUser: boolean;
    updateUser: boolean;
  }>({
    addUser: true,
    updateUser: true,
  });

  const { recruiterId: recruiter_id } = useAppContext();
  const [message, setMessage] = useState<string[]>([]);
  const [invitedUser, setInvitedUser] = useState<user[]>([]);

  const fetchUsers = async (type?: "addUser" | "updateUser") => {
    if (type) {
      setIsLoading((pre) => ({ ...pre, [type]: true }));
    }
    try {
      const {
        data,
        error,
      }: {
        data: {
          users: user[];
        };
        error: any;
      } = await axios.post("/api/automation/get_users", {
        recruiter_id,
      });

      if (error) {
        throw new Error(error.message);
      }
      const {
        data: newUsers,
        error: newUserError,
      }: {
        data: form[];
        error: any;
      } = await axios.get(
        "https://aglintai-seed-data.vercel.app/company/users.json"
      );

      if (newUserError) {
        throw new Error(newUserError.message);
      }

      const currentUsersEmails = data.users.map((user) => user.email);
      const availaibleUsers = newUsers.filter(
        (user) => !currentUsersEmails.includes(user.email)
      );

      const invitedUsers = data.users.filter(
        (user) => user.status === "invited"
      );

      setAvailableUsers(availaibleUsers);
      setInvitedUser(invitedUsers);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading({ addUser: false, updateUser: false });
    }
  };

  useEffect(() => {
    if (recruiter_id) fetchUsers();
  }, [recruiter_id]);

  const handleSelectUser = (email: string) => {
    setSelectedUser((pre) =>
      pre?.includes(email)
        ? pre.filter((user) => user !== email)
        : [...pre, email]
    );
  };

  const addUserHandle = async () => {
    try {
      setMessage([]);
      setIsLoading((pre) => ({ ...pre, addUser: true }));
      const forms = avaUsers.filter((user) =>
        selectedUser.includes(user.email)
      );
      const { data, status } = await axios.post("/api/automation/add_users", {
        recruiter_id,
        forms,
      });
      if (status !== 200) throw new Error();
      const userEmails = data.data;
      setMessage([data.data.length + "User added successfully", ...userEmails]);
      await fetchUsers("addUser");
    } catch (e: any) {
      setMessage(["failed to add a users", e.message]);
    } finally {
      setIsLoading((pre) => ({ ...pre, addUser: false }));
    }
  };

  const activeHandler = async () => {
    try {
      setIsLoading((pre) => ({ ...pre, updateUser: true }));
      setMessage([]);
      await axios.post("/api/automation/update_user_to_active", {
        user_ids: invitedUser.map((user) => user.user_id).slice(0, 2),
      });
      await fetchUsers("updateUser");
    } catch (e: any) {
      setMessage(["Failed to update user state", e.message]);
    } finally {
      setIsLoading((pre) => ({ ...pre, updateUser: false }));
    }
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <div style={{ minWidth: "300px" }}>
        {isLoading.addUser ? (
          "Loading..."
        ) : avaUsers.length ? (
          <>
            <h5>Select users to add</h5>
            <div
              style={{
                maxHeight: "150px",
                overflow: "scroll",
              }}
            >
              {avaUsers.map((user) => (
                <div
                  key={user.email}
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => handleSelectUser(user.email)}
                >
                  <input
                    type="checkbox"
                    checked={selectedUser.includes(user.email)}
                  />
                  <p>{user.name}</p>
                  <p style={{ opacity: 0.5 }}>{user.email}</p>
                  <p style={{ opacity: 0.5 }}>({user.role})</p>
                </div>
              ))}
            </div>
            <button onClick={addUserHandle} disabled={isLoading.addUser}>
              Add Users
            </button>
          </>
        ) : (
          "No users found"
        )}
      </div>

      <div style={{ minWidth: "300px" }}>
        {isLoading.updateUser ? (
          "Loading..."
        ) : invitedUser.length ? (
          <>
            <h5>Move users invited to active</h5>
            <div
              style={{
                maxHeight: "150px",
                overflow: "scroll",
              }}
            >
              {invitedUser.map((user) => (
                <div
                  key={user.email}
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => handleSelectUser(user.email)}
                >
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
            <button
              onClick={activeHandler}
              disabled={!invitedUser.length || isLoading.updateUser}
            >
              Update Users
            </button>
          </>
        ) : (
          "No Invited Users found"
        )}
      </div>
      {message.length ? (
        <div>
          <h5>Console</h5>
          {message.map((mes) => (
            <p>{mes}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default User;
