import { ScoringParam } from "../resultParser";

export const getLists = (resultObj: ScoringParam) => {
  return Object.entries(resultObj).reduce((acc, [key, value]) => {
    if (value instanceof Array) {
      const list = Object.assign(
        {},
        ...value.map((v) => {
          return { [v.index]: v.rating };
        })
      );
      if (Object.keys(list).length !== 0) return { ...acc, [key]: list };
      return { ...acc, [key]: null };
    } else
      return {
        ...acc,
        [key]: Object.keys(value).length !== 0 ? value.list : null,
      };
  }, {});
};
