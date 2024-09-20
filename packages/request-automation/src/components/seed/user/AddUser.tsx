import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";

type form = {
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  role: string;
};

type user = {
  email: string;
  user_id: string;
  status: "invited" | "active" | "suspended";
};

function AddUser({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [avaUsers, setAvailableUsers] = useState<form[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { recruiterId: recruiter_id } = useAppContext();

  const fetchUsers = async () => {
    setIsLoading(true);

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
        "https://aglintai-seed-data.vercel.app/company/aglint/users.json"
      );

      if (newUserError) {
        throw new Error(newUserError.message);
      }

      const currentUsersEmails = data.users.map((user) => user.email);
      const availaibleUsers = newUsers.filter(
        (user) => !currentUsersEmails.includes(user.email)
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
      setIsLoading(true);
      const forms = avaUsers.filter((user) =>
        selectedUser.includes(user.email)
      );
      const { data, status } = await axios.post("/api/automation/add_users", {
        recruiter_id,
        forms,
      });
      if (status !== 200) throw new Error();
      const userEmails = data.data;
      setMessage([
        data.data.length + " User added successfully",
        ...userEmails,
      ]);
      await fetchUsers();
    } catch (e: any) {
      setMessage(["failed to add a users", e.message]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minWidth: "300px" }}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <h5>Select users to add</h5>
          {avaUsers.length ? (
            <>
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
                    <p>{user.first_name}</p>
                    <p style={{ opacity: 0.5 }}>{user.email}</p>
                    <p style={{ opacity: 0.5 }}>({user.role})</p>
                  </div>
                ))}
              </div>

              <button onClick={addUserHandle} disabled={isLoading}>
                Add Users
              </button>
            </>
          ) : (
            <p>No Users found</p>
          )}
        </>
      )}
    </div>
  );
}

export default AddUser;
