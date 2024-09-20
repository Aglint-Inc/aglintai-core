import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";

type user = {
  email: string;
  user_id: string;
  status: "invited" | "active" | "suspended";
};

function ActiveUser({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { recruiterId: recruiter_id } = useAppContext();
  const [invitedUser, setInvitedUser] = useState<user[]>([]);
  const [selectedUser, setSelecetedUser] = useState<string[]>([]);

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

      const invitedUsers = data.users.filter(
        (user) => user.status === "invited"
      );

      setInvitedUser(invitedUsers);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recruiter_id) fetchUsers();
  }, [recruiter_id]);

  const activeHandler = async () => {
    try {
      setIsLoading(true);
      setMessage([]);
      await axios.post("/api/automation/update_user_to_active", {
        user_ids: selectedUser,
      });
      await fetchUsers();
      setMessage((pre) => [...pre, "Users state updated succesfully"]);
    } catch (e: any) {
      setMessage([e.message]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (value: string) => {
    setSelecetedUser((pre) =>
      pre.includes(value) ? pre.filter((id) => id !== value) : [...pre, value]
    );
  };

  return (
    <div style={{ minWidth: "300px" }}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <h5>Move users invited to active</h5>
          {invitedUser.length ? (
            <>
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
                    onClick={() => handleSelect(user.user_id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUser.includes(user.user_id)}
                    />
                    <p>{user.email}</p>
                  </div>
                ))}
              </div>
              <button onClick={activeHandler} disabled={isLoading}>
                Update Users
              </button>
            </>
          ) : (
            <p>No users found</p>
          )}
        </>
      )}
    </div>
  );
}

export default ActiveUser;
