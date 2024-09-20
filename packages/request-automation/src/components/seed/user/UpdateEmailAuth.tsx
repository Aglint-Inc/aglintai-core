import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../../context/AppContext";
import { emailAuthData } from "../../../type/UITypes";

const UpdateEmailAuth = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [emailsToUpdate, setEmailsToUpdate] = useState<
    { email: string; user_id: string }[]
  >([]);
  const [emailAuthData, setEmailAuthData] = useState<emailAuthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelecetedUser] = useState<string[]>([]);

  const { recruiterId: recruiter_id } = useAppContext();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://aglintai-seed-data.vercel.app/users/seed-calander.json"
      );
      setEmailAuthData(data.emailAuthData);

      // Query recruiter_user to find users whose emails do not match the constantEmails
      const {
        data: { users },
      } = await axios.post("/api/automation/get_users_not_in_constantEmails", {
        recruiter_id,
        constantEmails: data.constantEmails,
      });

      setEmailsToUpdate(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [recruiter_id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setMessage([]);
      const { status } = await axios.post(
        "/api/automation/schedule_auth_update",
        {
          usersToUpdate: selectedUser,
          emailAuthData,
        }
      );
      if (status != 200) throw new Error("failed to update");
      await fetchData();
      setMessage(["Email auth updated successfully"]);
    } catch (error) {
      setMessage(["Email auth update failed"]);
      console.error("Error updating emails:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (value: string) => {
    setSelecetedUser((pre) =>
      pre.includes(value) ? pre.filter((id) => id !== value) : [...pre, value]
    );
  };

  console.log(selectedUser);
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <h5>Users calander not conneted</h5>
          <div>
            {emailsToUpdate?.length === 0 ? (
              <p>No users to update.</p>
            ) : (
              <div>
                <div
                  style={{
                    maxHeight: "150px",
                    overflow: "scroll",
                    paddingRight: "20px",
                  }}
                >
                  {emailsToUpdate?.map((user) => (
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
                <button
                  onClick={handleUpdate}
                  disabled={emailsToUpdate?.length === 0}
                >
                  Update Email Auth
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateEmailAuth;
