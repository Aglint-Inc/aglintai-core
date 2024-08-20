import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";

type location = {
  city: string;
  country: string;
  is_headquarter: boolean;
  line1: string;
  line2: string | null;
  region: string;
  timezone: string;
  zipcode: string | null;
  recruiter_id?: string;
  id?: number;
  remote_id?: string | null;
  name?: string;
};
export function Location({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [availableLocations, setAvailableLocations] = useState<location[]>([]);
  const supabase = window.supabase;
  const { recruiterId: recruiter_id } = useAppContext();

  const fetchLocation = async () => {
    try {
      setIsLoading(true);
      const {
        data: currentLocations,
        error,
      }: { data: location[]; error: any } = await supabase
        .from("office_locations")
        .select("*")
        .eq("recruiter_id", recruiter_id);

      if (error) {
        setMessage((pre) => [
          ...pre,
          `Error fetching current Locations ${error.message}`,
        ]);
      }

      const newLocations: location[] = await fetch(
        "https://aglintai-seed-data.vercel.app/company/locations.json"
      )
        .then((res) => res.json())
        .catch((e) => {
          setMessage((pre) => [
            ...pre,
            `Error fetching New Locations ${e.message}`,
          ]);
        });

      const existingNames = currentLocations.map((loc) =>
        loc.city.toLowerCase()
      );
      const avaLocations = newLocations.filter(
        (loc) => !existingNames.includes(loc.city.toLowerCase())
      );

      setAvailableLocations(avaLocations);
    } catch (error: any) {
      setMessage((pre) => [...pre, error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recruiter_id) fetchLocation();
  }, [recruiter_id]);

  const [selectedNewLocation, setSelectedNewLocation] = useState<location[]>(
    []
  );
  const handleSelectNewLocation = (city: string) => {
    const selectedNewLocationCites = selectedNewLocation.map(
      (selCity) => selCity.city
    );
    const newLoc = availableLocations.find((loc) => loc.city === city);
    setSelectedNewLocation((prevSelected) =>
      selectedNewLocationCites.includes(city)
        ? prevSelected.filter((loc) => loc.city !== city)
        : newLoc
          ? [...prevSelected, newLoc]
          : [...prevSelected]
    );
  };

  const handleAddLocation = async () => {
    try {
      setMessage([]);
      setIsLoading(true);

      const locationsToAdd = selectedNewLocation.map((selLoc) => ({
        ...selLoc,
        recruiter_id,
      }));
      const { error }: { data: location[]; error: any } = await supabase
        .from("office_locations")
        .insert(locationsToAdd);

      if (error)
        setMessage((pre) => [...pre, `Location adding error ${error.message}`]);

      setMessage((pre) => [...pre, `Location added successfully`]);
      setSelectedNewLocation([]);
      fetchLocation();
    } catch (e) {
      //
    }
  };
  const selectedNewLocationCites = selectedNewLocation.map(
    (selCity) => selCity.city
  );

  return (
    <div style={{ minWidth: "200px" }}>
      {isLoading ? (
        <p>Location Loading...</p>
      ) : (
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <h5>Select Locations to add</h5>

              {availableLocations.map((location, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => handleSelectNewLocation(location.city)}
                >
                  <input
                    type="checkbox"
                    checked={selectedNewLocationCites.includes(location.city)}
                  />
                  {`${location.city}, ${location.region}, ${location.country}`}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddLocation}
            style={{
              marginTop: "10px",
            }}
            disabled={selectedNewLocation.length === 0}
          >
            Add Locations
          </button>
        </>
      )}
    </div>
  );
}
