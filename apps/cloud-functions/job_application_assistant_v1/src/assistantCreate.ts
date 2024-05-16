import { openai } from "./client/openai";

export const createAssistant = async () => {
  const assistant_id = await openai.createAssistant({
    model: "gpt-3.5-turbo-1106",
    name: "Job Assistant",
    instructions: `you are a assistant for job applications having access to the functions that return the job applications id, data and can update applications status.  try to get data requested by the user in one function call. do not get extra data if user have not requested specifically for it. For returning the applications to user use '''$[ 'applications_id' , ' applications_id']''' for returning applications .  until asked about other details specifically do not get user details. use markdown to return the comparison between the resumes.
user will provide the job description json before starting asking question, use the job description answer user queries.`,
    tools: [
      {
        type: "function",
        function: {
          name: "get_applications_ids",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["exact", "range"],
                  },
                  exact: {
                    type: "object",
                    properties: {
                      filter: {
                        type: "string",
                        enum: ["in", "not_in"],
                      },
                      city: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      state: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      country: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    required: ["city", "state", "country"],
                  },
                  range: {
                    type: "object",
                    properties: {
                      distance: {
                        type: "number",
                        description: "distance in kilometer.",
                      },
                      place: {
                        type: "string",
                      },
                    },
                    required: ["distance", "place"],
                  },
                },
              },
              company: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["current", "previous"],
                  },
                  names: {
                    type: "string",
                  },
                },
              },
              score: {
                type: "object",
                properties: {
                  condition: {
                    type: "string",
                    enum: ["gt", "lt", "eq", "gte", "lte", "between"],
                  },
                  lower_value: {
                    type: "number",
                  },
                  greater_value: {
                    type: "number",
                  },
                },
              },
              skills: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              experience_in_months: {
                type: "number",
              },
              sort: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    orderBy: {
                      type: "string",
                      enum: ["created_at", "applied_at", "overall_score"],
                    },
                    order: {
                      type: "string",
                      enum: ["desc", "asc"],
                    },
                  },
                },
              },
              limit: {
                type: "number",
                description: "set number or result. Can be null.",
              },
            },
            required: [],
          },
          description: "Retrieve job application_id with name and ats scores.",
        },
      },
      {
        type: "function",
        function: {
          name: "get_applications_details",
          parameters: {
            type: "object",
            properties: {
              options: {
                type: "object",
                properties: {
                  application_ids: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: ["application_ids"],
          },
          description: "Retrieve job application details",
        },
      },
      {
        type: "function",
        function: {
          name: "update_applications",
          description: "Update job application status",
          parameters: {
            type: "object",
            properties: {
              options: {
                type: "object",
                properties: {
                  application_ids: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  status: {
                    type: "string",
                    enum: ["qualified", "disqualified"],
                  },
                },
              },
            },
            required: ["application_ids", "status"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "send_result",
          description: "Send the reuslt of user query",
          parameters: {
            type: "object",
            properties: {
              application_selection: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "short 1 line text",
                  },
                  applications_id: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: [],
          },
        },
      },
    ],
  });
  console.log("assistant created, id:", assistant_id);
  return assistant_id;
};

// const extera = `you are a assistant for job applications having access to the functions that return the job applications ids, applications data or update applications status or send result to user. User will provide the job description json before starting asking question, use the job description to help user analyse or compare the application.
// Do not get extra details until user asked for details specifically or for applications comparison.
// use CSV formate for response output.
// example for selecting and filter:
// input: get me top 3 applications
// output: Here are the top 3 job applications based on overall score:
// ${application_id\n'697cd8c4-ad6f-4230-a8a1-ddd30aa8fc16'\n'2dd1f051-1e85-40ff-9116-1f96c6c576c4'\n'9760544e-b345-4c47-842e-4de94e45d7ae' }

// example for detailed applications:
// input: give me more details for Hagerty.
// output: ${ applications_id, name, score, educations, .... \n "697cd8c4-ad6f-4230-a8a1-ddd30aa8fc16", "Tony Hagerty", "100", .... \n}

// example for comparing applications:
// input: give comparing Tony Hagerty and Bob Garfinkel.
// output: ${ applications_id, name, score, educations, .... \n "697cd8c4-ad6f-4230-a8a1-ddd30aa8fc16", "Tony Hagerty", "100", .... \n "9760544e-b345-4c47-842e-4de94e45d7ae", "Bob Garfinkel", "98", .... \n} `
