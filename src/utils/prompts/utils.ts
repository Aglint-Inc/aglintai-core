export const requestJson = (prompt: any, jsonStructure: any) => `
${prompt}

--------

Do not include any comments, only provide a RFC8259 compliant JSON response following this format.

--------

${JSON.stringify(jsonStructure, null, 2)}

`;
