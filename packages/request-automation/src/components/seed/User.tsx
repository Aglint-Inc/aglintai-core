import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

type user = {
  name: string;
  email: string;
  title: string;
  role: string;
};

function User() {
  const [avaUsers, setAvailableUsers] = useState<user[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { recruiterId: recruiter_id } = useAppContext();
  const [message, setMessage] = useState<string[]>([]);
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const {
        data,
        error,
      }: { data: { users: { email: string }[] }; error: any } =
        await axios.post("/api/automation/get_users", {
          recruiter_id,
        });

      if (error) {
        throw new Error(error.message);
      }
      const {
        data: newUsers,
        error: newUserError,
      }: {
        data: user[];
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

      console.log(
        "Newemail :",
        newUsers.map((u) => u.email)
      );
      console.log("currentUsersEmails :", currentUsersEmails);
      console.log(
        "availaibleUsers :",
        availaibleUsers.map((ava) => ava.email)
      );
      setAvailableUsers(availaibleUsers);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
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
      setIsAdding(true);
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
      fetchUsers();
    } catch (e: any) {
      setMessage(["failed to add a users", e.message]);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) return "Loading...";
  if (!avaUsers.length) return "No users found";

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <div>
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
        <button onClick={addUserHandle} disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Users"}
        </button>
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
