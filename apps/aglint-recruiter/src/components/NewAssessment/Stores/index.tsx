import { type StateCreator,create } from 'zustand';

type AssessmentDeleteModalSlice = {
  deleteModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setDeleteModal: (deleteModal: boolean) => void;
  resetDeleteModal: () => void;
};

const createAssessmentDeleteModalSlice: StateCreator<
  AllSlice,
  [],
  [],
  AssessmentDeleteModalSlice
> = (set) => ({
  deleteModal: false,
  setDeleteModal: (deleteModal) => set(() => ({ deleteModal })),
  resetDeleteModal: () => set(() => ({ deleteModal: false })),
});

type AssessmentDuplicateModalSlice = {
  duplicateModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setDuplicateModal: (duplicateModal: boolean) => void;
  resetDuplicateModal: () => void;
};

const createAssessmentDuplicateModalSlice: StateCreator<
  AllSlice,
  [],
  [],
  AssessmentDuplicateModalSlice
> = (set) => ({
  duplicateModal: false,
  setDuplicateModal: (duplicateModal) => set(() => ({ duplicateModal })),
  resetDuplicateModal: () => set(() => ({ duplicateModal: false })),
});

type AssessmentCreateModalSlice = {
  createModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setCreateModal: (createModal: boolean) => void;
  resetCreateModal: () => void;
};

const createAssessmentCreateModalSlice: StateCreator<
  AllSlice,
  [],
  [],
  AssessmentCreateModalSlice
> = (set) => ({
  createModal: false,
  setCreateModal: (createModal) => set(() => ({ createModal })),
  resetCreateModal: () => set(() => ({ createModal: false })),
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
    get().resetDeleteModal(),
      get().resetDuplicateModal(),
      get().resetCreateModal(),
      get().resetCurrentQuestion();
  },
});

const useAssessmentStore = create<BoundStore>()((...a) => ({
  ...createAssessmentCreateModalSlice(...a),
  ...createAssessmentDeleteModalSlice(...a),
  ...createAssessmentDuplicateModalSlice(...a),
  ...createSelectedQuestionSlice(...a),
  ...createSharedSlice(...a),
}));

type AllSlice = AssessmentCreateModalSlice &
  AssessmentDeleteModalSlice &
  AssessmentDuplicateModalSlice &
  UseSelectedQuestionSlice;
type BoundStore = AllSlice & SharedSlice;

export default useAssessmentStore;
