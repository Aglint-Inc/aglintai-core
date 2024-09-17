export type dynamicOptionsTypes =
  | string[]
  | { id: string; label: string }[]
  | { header: string; options: { id: string; label: string }[] }[]
  | {
      header: string;
      path: string[];
      options: { id: string; label: string }[];
    }[];

export type nestedType<T> = { [key: string]: nestedType<T> } | T;

export type isSectionsActive = {
  // eslint-disable-next-line no-unused-vars
  [K: string]: number;
};
