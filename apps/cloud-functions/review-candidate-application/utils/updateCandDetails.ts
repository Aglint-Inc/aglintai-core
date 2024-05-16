import { get } from 'lodash';
import { CandidatesType } from '../schema/db/database.types';
import { Resumetype } from '../schema/resumejson.type';
import { supabase, supabaseWrap } from '../config/supabaseClient';
import { logApi } from './logApi';
import md5 from 'blueimp-md5';

export const updateCandidateDetails = async (
  resumeJson: Resumetype,
  candidate: CandidatesType,
  jobApplicationId: string,
  recruiterId: string,
  fileId: string
) => {
  let candidateDetails = {
    first_name: get(resumeJson, 'basics.firstName', ''),
    last_name: get(resumeJson, 'basics.lastName', ''),
    email: get(resumeJson, 'basics.email', undefined),
    phone: get(resumeJson, 'basics.phone', ''),
    linkedin: get(resumeJson, 'basics.profiles', []).find(
      (p) => p.network.toLowerCase() === 'linkedin'
    )?.url,
  };

  let [oldCandidate] = supabaseWrap(
    await supabase
      .from('candidates')
      .select()
      .eq('email', get(resumeJson, 'basics.email', ''))
      .eq('recruiter_id', recruiterId)
  ) as CandidatesType[];

  if (oldCandidate) {
    supabaseWrap(
      await supabase
        .from('applications')
        .update({ candidate_id: oldCandidate.id })
        .eq('application_id', jobApplicationId)
    );

    supabaseWrap(
      await supabase
        .from('candidate_files')
        .update({ candidate_id: oldCandidate.id })
        .eq('id', fileId)
    );

    supabaseWrap(
      await supabase.from('candidates').delete().eq('id', candidate.id)
    );

    return oldCandidate;
  } else {
    const [updatedCandidate] = supabaseWrap(
      await supabase
        .from('candidates')
        .update({
          first_name: get(candidateDetails, 'first_name', undefined),
          last_name: get(candidateDetails, 'last_name', undefined),
          email: get(candidateDetails, 'email', undefined),
          linkedin: get(candidateDetails, 'linkedin', undefined),
          phone: candidateDetails.phone,
          avatar: getGravatar(get(candidateDetails, 'email', undefined)),
        })
        .eq('id', candidate.id)
        .select()
    ) as CandidatesType[];
    logApi('updated candidateDetails', candidateDetails);

    return updatedCandidate;
  }
};

function getGravatar(email: string | undefined) {
  if (!email) return undefined;
  let imgUrl = email
    ? `https://www.gravatar.com/avatar/${md5(
        email.trim().toLowerCase()
      )}?d=basic&s=240&r=g`
    : null;
  return imgUrl;
}
