import { create, StateCreator } from 'zustand';

type AssessmentCreateModalSlice = {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (openModal: boolean) => void;
  resetModal: () => void;
};

const createAssessmentModalSlice: StateCreator<
  AllSlice,
  [],
  [],
  AssessmentCreateModalSlice
> = (set) => ({
  openModal: false,
  setOpenModal: (openModal) => set(() => ({ openModal })),
  resetModal: () => set(() => ({ openModal: false })),
});

type UseSelectedQuestionSlice = {
  currentQuestion: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentQuestion: (currentQuestion: number) => void;
  resetCurrentQuestion: () => void;
};

const createSelectedQuestionSlice: StateCreator<
  AllSlice,
  [],
  [],
  UseSelectedQuestionSlice
> = (set) => ({
  currentQuestion: -1,
  setCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
  resetCurrentQuestion: () => set(() => ({ currentQuestion: -1 })),
});

type SharedSlice = {
  resetAll: () => void;
};

const createSharedSlice: StateCreator<AllSlice, [], [], SharedSlice> = (
  set,
  get,
) => ({
  resetAll: () => {
    get().resetModal(), get().resetCurrentQuestion();
  },
});

const useAssessmentStore = create<BoundStore>()((...a) => ({
  ...createAssessmentModalSlice(...a),
  ...createSelectedQuestionSlice(...a),
  ...createSharedSlice(...a),
}));

type AllSlice = AssessmentCreateModalSlice & UseSelectedQuestionSlice;
type BoundStore = AllSlice & SharedSlice;

export default useAssessmentStore;
