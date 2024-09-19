import type { FunctionType } from "./index.types";

export type CustomGetLocationsPool = FunctionType<
  "getlocationspool",
  {},
  {
    city: {
      [id: string]: number;
    };
    state: {
      [id: string]: number;
    };
    country: {
      [id: string]: number;
    };
  }
>;
