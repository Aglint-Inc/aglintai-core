import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogTrigger } from "@/components/ui/dialog";
import { candidatePortalProfileType } from "@/src/app/api/candidate_portal/get_profile/route";

import CandidateForm from "../Profile/CandidateForm";

export function ProfileEdit({application_id,formData}:{application_id:string,formData:candidatePortalProfileType}) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        <CandidateForm formData={formData} application_id={application_id}/>
      </DialogContent>
    </Dialog>
  )
}
