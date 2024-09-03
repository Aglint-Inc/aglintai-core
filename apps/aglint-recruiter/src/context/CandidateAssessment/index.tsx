/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import {
  type AssessmentDetailsType,
  type AssessmentQuestionType,
  type AssessmentType,
  type responseType,
} from './types';

interface ContextValue {
  fetching: true | false;
  setFetching: (x: true | false) => void;

  assessmentDetails: AssessmentDetailsType | null;
  setAssessmentDetails: (X: AssessmentDetailsType | null) => void;

  assessmentList: AssessmentType[] | null;
  setAssessmentList: (x: AssessmentType[]) => void;

  selectedAssessment: AssessmentType;
  setSelectedAssessment: (x: AssessmentType) => void;

  assessmentQuestions: AssessmentQuestionType[] | null;
  setAssessmentQuestions: (x: AssessmentQuestionType[]) => void;

  selectedQuestion: AssessmentQuestionType | null;
  setSelectedQuestion: (x: AssessmentQuestionType) => void;

  responses: responseType[] | null | any;
  setResponses: (x: responseType[] | null | any) => void;
}
const defaultValue = {
  fetching: true,
  setFetching: () => {},
  assessmentDetails: null,
  setAssessmentDetails: () => {},
  assessmentList: null,
  setAssessmentList: () => {},

  selectedAssessment: null,
  setSelectedAssessment: () => {},

  assessmentQuestions: null,
  setAssessmentQuestions: () => {},

  selectedQuestion: null,
  setSelectedQuestion: () => {},

  responses: [],
  setResponses: () => {},
};
const CandidateContext = createContext<ContextValue>(defaultValue);
export const useCandidateAssessment = () => useContext(CandidateContext);

function CandidateAssessmentProvider({ children }) {
  const router = useRouter();
  const [fetching, setFetching] = useState<true | false>(true); ////////////////////////////////
  const [assessmentDetails, setAssessmentDetails] =
    useState<AssessmentDetailsType | null>(null);
  const [assessmentList, setAssessmentList] = useState<AssessmentType[] | null>(
    null,
  );

  const [assessmentQuestions, setAssessmentQuestions] = useState<
    AssessmentQuestionType[] | null
  >(null);

  const [selectedQuestion, setSelectedQuestion] =
    useState<AssessmentQuestionType | null>(null);

  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentType>(null);

  const [responses, setResponses] = useState<responseType[] | null>([]);

  async function getApplication() {
    const { application_id, job_id } = router.query;
    const { data } = await axios.post(
      `/api/candidate-assessment/assessment-details`,
      {
        application_id: application_id,
        job_id: job_id,
      },
    );
    setAssessmentDetails(data);
    const tempAssessmentRelationList = data.public_jobs
      .assessment_job_relation as AssessmentDetailsType['public_jobs']['assessment_job_relation'];
    const tempAssessmentList = tempAssessmentRelationList.map(
      (item) => item.assessment,
    );
    setAssessmentList(tempAssessmentList);

    const { assessment_id } = router.query;
    if (assessment_id && tempAssessmentList.length) {
      const tempSelectedAssessment = tempAssessmentList.filter(
        (item) => item.id === assessment_id,
      )[0];
      setSelectedAssessment(tempSelectedAssessment);
      setAssessmentQuestions(tempSelectedAssessment.assessment_question);
      setSelectedQuestion(tempSelectedAssessment?.assessment_question[0]);
    }
    setFetching(false);
  }

  useEffect(() => {
    const { application_id, job_id } = router.query;

    if (application_id && !assessmentDetails) {
      getApplication();
    }
    if (job_id && !assessmentDetails) {
      getApplication();
    }
  }, [router]);

  return (
    <CandidateContext.Provider
      value={{
        fetching,
        setFetching,
        assessmentDetails,
        setAssessmentDetails,
        assessmentList,
        setAssessmentList,
        selectedAssessment,
        setSelectedAssessment,
        assessmentQuestions,
        setAssessmentQuestions,
        selectedQuestion,
        setSelectedQuestion,
        responses,
        setResponses,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export { CandidateAssessmentProvider, CandidateContext };
