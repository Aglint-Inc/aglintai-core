import { JobFields, JobJson, Section } from "../types";

export const getRequirements = (jobJson: JobJson, tags: Section[]) => {
  return `${tags.map((tag) => getRequirement(jobJson, tag)).join("\n")}`;
};

export const getRequirement = (jobJson: JobJson, tag: Section) => {
  switch (tag) {
    case "positions":
      return generateFields(jobJson.rolesResponsibilities, "positions");
    case "schools":
      return generateFields(jobJson.educations, "schools");
    case "skills":
      return generateFields(jobJson.skills, "skills");
  }
};

const generateFields = (fields: JobFields[], section: Section) => {
  const { primary, secondary } = fields.reduce(
    (acc, curr) => {
      if (
        curr.field &&
        typeof curr.field === "string" &&
        curr.field.trim().length !== 0
      ) {
        if (curr.isMustHave) acc.primary.push(curr.field.trim());
        else acc.secondary.push(curr.field.trim());
      }
      return acc;
    },
    {
      primary: [] as string[],
      secondary: [] as string[],
    }
  );
  const primiaryReq = generateFieldText(primary, section, "Primary");
  const secondaryReq = generateFieldText(secondary, section, "Secondary");

  return `${primiaryReq ? primiaryReq : ""}\n${
    secondaryReq ? secondaryReq : ""
  }`;
};

type RequirementType = "Primary" | "Secondary";

const generateFieldText = (
  fieldStrings: string[],
  section: Section,
  type: RequirementType
) => {
  return fieldStrings.length === 0
    ? null
    : `${getRequirementLevel(type)} / ${type} ${section} requirements :
${fieldStrings.map((requirement, i) => `${i + 1}) ${requirement}`).join("\n")}
`;
};
const getRequirementLevel = (type: RequirementType) => {
  switch (type) {
    case "Primary":
      return `Must have`;
    case "Secondary":
      return "Nice to have";
  }
};
