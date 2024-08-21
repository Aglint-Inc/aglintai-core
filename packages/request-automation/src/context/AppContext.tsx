import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

// Define types for the context values
interface AppContextType {
  applicationIds: number[];
  setApplicationIds: React.Dispatch<React.SetStateAction<number[]>>;
  requestIds: number[];
  setRequestIds: React.Dispatch<React.SetStateAction<number[]>>;
  session: any; // Replace `any` with the actual type if known
  companyName: string | null;
  recruiterId: string;
  userId: string | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    supabase: any;
  }
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [applicationIds, setApplicationIds] = useState<number[]>([]);
  const [requestIds, setRequestIds] = useState<number[]>([]);
  const [session, setSession] = useState<any>(null); // State to hold the Supabase session
  const [companyName, setCompanyName] = useState<string | null>(null); // State to hold the company name
  const [recruiterId, setRecruiterId] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null); // State to hold the user_id
  const supabase = window.supabase;

  useEffect(() => {
    async function getSupabaseSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(
          'Unable to login. Please try again later:',
          error.message
        );
      } else if (data?.session) {
        setSession(data.session);
        const currentUserId = data.session.user.id;
        setUserId(currentUserId);
        fetchRecruiterInfo(currentUserId);
      } else {
        console.error('Session not found');
      }
    }

    async function fetchRecruiterInfo(user_id: string) {
      try {
        const { data: relationData, error: relationError } = await supabase
          .from('recruiter_relation')
          .select('recruiter_id')
          .eq('user_id', user_id)
          .single();

        if (relationError) {
          throw new Error(relationError.message);
        }

        if (relationData) {
          const recruiter_id = relationData.recruiter_id;
          setRecruiterId(recruiter_id);

          const { data: recruiterData, error: recruiterError } = await supabase
            .from('recruiter')
            .select('name')
            .eq('id', recruiter_id)
            .single(); // Assuming recruiter_id is unique

          if (recruiterError) {
            throw new Error(recruiterError.message);
          }

          if (recruiterData) {
            setCompanyName(recruiterData.name);
          } else {
            setCompanyName(null);
          }
        } else {
          setCompanyName(null);
        }
      } catch (error) {
        console.error(
          'Error fetching recruiter info:',
          (error as Error).message
        );
      }
    }
    // getSupabaseSession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        applicationIds,
        setApplicationIds,
        requestIds,
        setRequestIds,
        session,
        companyName,
        recruiterId,
        userId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error('Tour Provider not found');
  return value;
};

// import React, { createContext, useState, useEffect } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [applicationIds, setApplicationIds] = useState([]);
//   const [requestIds, setRequestIds] = useState([]);
//   const [session, setSession] = useState(null); // State to hold the Supabase session
//   const [companyName, setCompanyName] = useState(null); // State to hold the company name
//   const [recruiterId, setRecruiterId] = useState(null); // State to hold the recruiter_id
//   const [userId, setUserId] = useState(null); // State to hold the user_id
//   const supabase = window.supabase;

//   useEffect(() => {
//     // Function to retrieve and set the Supabase session
//     async function getSupabaseSession() {
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         console.error(
//           "Unable to login. Please try again later:",
//           error.message
//         );
//       } else if (data?.session) {
//         setSession(data.session); // Save session to state
//         const currentUserId = data.session.user.id;
//         setUserId(currentUserId); // Set user_id in state
//         console.log("Session ID:", currentUserId); // Log the session ID
//         fetchRecruiterInfo(currentUserId); // Fetch recruiter info after session is retrieved
//       } else {
//         console.error("Session not found");
//       }
//     }

//     // Function to check relation and fetch recruiter info and company name
//     async function fetchRecruiterInfo(user_id) {
//       try {
//         // Query the recruiter_relation table to get recruiter_id
//         const { data: relationData, error: relationError } = await supabase
//           .from("recruiter_relation")
//           .select("recruiter_id")
//           .eq("user_id", user_id)
//           .single(); // Assuming there is only one relation per user_id

//         if (relationError) {
//           throw new Error(relationError.message);
//         }

//         if (relationData) {
//           const recruiter_id = relationData.recruiter_id;
//           setRecruiterId(recruiter_id); // Set recruiter_id in state

//           // Query the recruiter table to get the company name
//           const { data: recruiterData, error: recruiterError } = await supabase
//             .from("recruiter")
//             .select("name")
//             .eq("id", recruiter_id)
//             .single(); // Assuming recruiter_id is unique

//           if (recruiterError) {
//             throw new Error(recruiterError.message);
//           }

//           if (recruiterData) {
//             setCompanyName(recruiterData.name); // Set the company name in state
//           } else {
//             setCompanyName(null); // No recruiter found
//           }
//         } else {
//           setCompanyName(null); // No relation found
//         }
//       } catch (error) {
//         console.error("Error fetching recruiter info:", error.message);
//       }
//     }

//     // Call the session retrieval function when the component mounts
//     // getSupabaseSession();
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         applicationIds,
//         setApplicationIds,
//         requestIds,
//         setRequestIds,
//         session,
//         companyName, // Provide companyName in the context
//         recruiterId, // Provide recruiter_id in the context
//         userId, // Provide user_id in the context
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
