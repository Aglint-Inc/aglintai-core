import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CandidateForm from "../Profile/CandidateForm";
import { candidatePortalProfileType } from "@/src/app/api/candidate_portal/get_profile/route";

export function ProfileEdit({application_id,formData}:{application_id:string,formData:candidatePortalProfileType}) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader> */}
        <CandidateForm formData={formData} application_id={application_id}/>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
