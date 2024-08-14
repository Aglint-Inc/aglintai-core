import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../AppContext";

const UpdateEmailAuth = () => {
  const { recruiterId } = useContext(AppContext);
  const [emailsToUpdate, setEmailsToUpdate] = useState([]);
  const [constantEmails, setConstantEmails] = useState([]);
  const [emailAuthData, setEmailAuthData] = useState({});
  const [loading, setLoading] = useState(true);
  const supabase = window.supabase; // Accessing Supabase client
  const { recruiterId: recruiter_id } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch constant emails and emailAuth data
        const { data } = await axios.get(
          "https://aglintai-seed-data.vercel.app/users/seed-calande.json"
        );
        setConstantEmails(data.constantEmails);
        setEmailAuthData(data.emailAuthData);

        // Query recruiter_relation to get users with matching recruiterId
        const { data: recruiterUsers } = await supabase
          .from("recruiter_relation")
          .select("user_id")
          .eq("recruiter_id", recruiter_id);

        const userIds = recruiterUsers.map((user) => user.user_id);
        console.log("userIds", userIds);
        // Query recruiter_user to find users whose emails do not match the constantEmails
        const { data: usersToUpdate } = await supabase
          .from("recruiter_user")
          .select("*")
          .in("id", userIds)
          .notIn("email", constantEmails);

        setEmailsToUpdate(usersToUpdate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [recruiterId]);

  const handleUpdate = async () => {
    try {
      for (const user of emailsToUpdate) {
        await supabase
          .from("recruiter_user")
          .update({ email_auth: emailAuthData[user.email] })
          .eq("id", user.id);
      }
      alert("Emails updated successfully!");
    } catch (error) {
      console.error("Error updating emails:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Users with Emails Not Matching the Constant Emails:</h2>
      {emailsToUpdate.length === 0 ? (
        <p>No users to update.</p>
      ) : (
        <ul>
          {emailsToUpdate.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      )}
      <button onClick={handleUpdate} disabled={emailsToUpdate.length === 0}>
        Update Email Auth
      </button>
    </div>
  );
};

export default UpdateEmailAuth;
