import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";
import { CompanyProfile } from "../../../type/UITypes";

type form = {
  first_name: string;
  last_name: string;
  email: string;
  title?: string;
  role?: string;
};

function CompanyDetails({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { recruiterId: recruiter_id } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [selectedCompany, setSelectedCompant] = useState<string>("");
  const supabase = window.supabase;

  const fetchCompanys = async () => {
    try {
      setIsLoading(true);
      const {
        data: { companies: comp },
      } = await axios.get(
        "https://aglintai-seed-data.vercel.app/company/company.json"
      );
      setCompanies(comp);

      const { data, error } = await supabase
        .from("recruiter")
        .select()
        .single()
        .eq("id", recruiter_id);

      if (error) throw new Error(error.message);
      setSelectedCompant(data.name);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recruiter_id) fetchCompanys();
  }, [recruiter_id]);

  const updateCompany = async () => {
    try {
      setMessage([]);
      setIsLoading(true);
      const selComp = companies.find((comp) => comp.name === selectedCompany);

      if (selComp) {
        const dataToUpdate: Omit<CompanyProfile, "slug"> = {
          name: selComp.name,
          company_website: selComp.company_website,
          employee_size: selComp.employee_size,
          industry: selComp.industry,
          logo: selComp.logo,
          phone_number: selComp.phone_number,
          profile_image: selComp.profile_image,
          socials: selComp.socials,
        };

        const { error } = await supabase
          .from("recruiter")
          .update({ ...dataToUpdate })
          .eq("id", recruiter_id);

        if (error) throw new Error(error.message);
        setMessage(["Company details update Successfully"]);

        const {
          data: users,
        }: {
          data: form[];
        } = await axios.get(
          `https://aglintai-seed-data.vercel.app/company/${selComp.slug}/users.json`
        );

        await axios.post("/api/automation/update_users_name", users);
        setMessage((pre) => [...pre, "Users name updated successfully"]);
      }
    } catch (e: any) {
      setMessage((pre) => [...pre, e.message]);
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ minWidth: "200px" }}>
      {isLoading ? (
        <p>Company Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5>Persona col</h5>

            {companies.length ? (
              <>
                {companies.map((company, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={() => setSelectedCompant(company.name)}
                  >
                    <input
                      type="radio"
                      name="company"
                      checked={company.name === selectedCompany}
                    />
                    {company.name}
                  </div>
                ))}
                <button
                  onClick={updateCompany}
                  style={{
                    marginTop: "10px",
                  }}
                  disabled={companies.length === 0}
                >
                  Update company
                </button>
              </>
            ) : (
              "No Company Available"
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDetails;
