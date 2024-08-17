import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

type emailAuthData = {
  email: string;
  expiry_date: string;
  access_token: string;
  refresh_token: string;
};

const UpdateEmailAuth = () => {
  const [emailsToUpdate, setEmailsToUpdate] = useState<
    { email: string; user_id: string }[]
  >([]);
  const [emailAuthData, setEmailAuthData] = useState<emailAuthData[]>([]);
  const [loading, setLoading] = useState(true);
  const { recruiterId: recruiter_id } = useAppContext();

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch constant emails and emailAuth data
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
      const { status } = await axios.post(
        "/api/automation/schedule_auth_update",
        {
          emailsToUpdate,
          emailAuthData,
        }
      );

      if (status != 200) throw new Error("failed to update");

      await fetchData();
    } catch (error) {
      console.error("Error updating emails:", error);
    } finally {
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h5>Users calander not conneted:</h5>
      {emailsToUpdate?.length === 0 ? (
        <p>No users to update.</p>
      ) : (
        <ul>
          {emailsToUpdate?.map((user) => (
            <li key={user.user_id}>{user.email}</li>
          ))}
        </ul>
      )}
      <button onClick={handleUpdate} disabled={emailsToUpdate?.length === 0}>
        Update Email Auth
      </button>
    </div>
  );
};

export default UpdateEmailAuth;
