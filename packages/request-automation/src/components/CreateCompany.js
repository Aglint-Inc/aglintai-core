import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ecfwsyxpcuzxlxrkhxjz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZndzeXhwY3V6eGx4cmtoeGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3ODU4MzIsImV4cCI6MjAzNjM2MTgzMn0.5KGljbxsC7XzD1MaiTVekEkzAVNX8Q4_rixbqj_OouU";
const supabase = createClient(supabaseUrl, supabaseKey);

const CreateCompany = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch the list of companies from the provided URL
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch(
        "https://aglintai-seed-data.vercel.app/company/company.json"
      );
      const data = await response.json();
      setCompanies(data.companies);
    };

    fetchCompanies();
  }, []);

  // Function to handle the registration process
  const handleRegister = async () => {
    try {
      const password = "Welcome@123";

      // Step 1: Create a new user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }

      const accessToken = data.session?.access_token;
      const user = data.user;

      if (!accessToken) {
        throw new Error("Session token is missing. Unable to proceed.");
      }

      // Step 2: Generate LinkedIn URL based on the user's first name
      const linkedInUrl = `https://www.linkedin.com/in/${firstName.toLowerCase()}`;

      // Step 3: Insert data into recruiter_user table
      const { data: recruiterUserData, error: insertError } = await supabase
        .from("recruiter_user")
        .insert(
          [
            {
              first_name: firstName,
              last_name: lastName,
              email: email,
              profile_image: selectedCompany.profile_image || "",
              phone: selectedCompany.phone_number || "",
              position: selectedCompany.position || "",
              linked_in: linkedInUrl,
              user_id: user.id,
              status: "active",
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

      if (insertError) {
        throw new Error(
          `Error inserting into recruiter_user: ${insertError.message}`
        );
      }
      console.log("Recruiter user:", data);

      // Step 4: Insert data into recruiter table with the newly created recruiter's ID
      const { data: recruiterData, error: recruiterError } = await supabase
        .from("recruiter")
        .insert(
          [
            {
              recruiter_type: "Company",
              name: selectedCompany.name,
              email: email,
              company_website: selectedCompany.company_website || "",
              industry: selectedCompany.industry || "",
              logo: selectedCompany.logo || "",
              phone_number: selectedCompany.phone_number || "",
              employment_type: {
                contract: true,
                fulltime: true,
                parttime: true,
                temporary: true,
                volunteer: true,
                internship: true,
              },
              workplace_type: {
                hybrid: true,
                onsite: true,
                offsite: true,
              },
              employee_size: selectedCompany.employee_size || "",
              socials: selectedCompany.socials || {
                custom: {},
                twitter: "",
                youtube: "",
                facebook: "",
                linkedin: "",
                instagram: "",
              },
              primary_admin: user.id, // Set primary_admin to the newly created recruiter_user ID
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

      if (recruiterError) {
        throw new Error(
          `Error inserting into recruiter: ${recruiterError.message}`
        );
      }

      console.log(
        "User registration and data insertion completed successfully"
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h4>Register New User</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company:</label>
          <select
            onChange={(e) => setSelectedCompany(companies[e.target.value])}
            required
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={index}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCompany;
