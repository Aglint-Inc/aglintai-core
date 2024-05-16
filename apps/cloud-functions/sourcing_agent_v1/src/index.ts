import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

import { getResponse } from "./utils";
import { JOB_ASSISTANT_TYPE } from "./types/data.types";
import {
  getFilter,
  process_Candidate,
  save_search_history_in_db,
} from "./langchan";
import { send_mails } from "./email";

// import LoggerV2 from "./logger";

export const hello: HttpFunction = async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  if (req.method === "POST") {
    let { query, candidate_ids, recruiter_id } =
      req.body as JOB_ASSISTANT_TYPE["post"]["in"];
    if (!query) {
      res.status(400).send(getResponse({ error: "message is required!" }));
      return;
    }
    const orgs_data = await getFilter(query);
    const type = orgs_data.args.type;
    let candidates_ids: any[] = [];
    let email_status: {
      status: {
        success: string[];
        failed: string[];
      };
      types:
        | "Recruitment Inquiry"
        | "Networking Connection"
        | "Research Study Invitation";
    } | null = null;
    // console.log({ orgs_data });
    switch (type) {
      case "process_query": {
        candidates_ids = await process_Candidate({
          query: query,
          args: orgs_data.args,
          org_ids: orgs_data.company_ids,
          recruiter_id,
        });
        break;
      }
      case "email": {
        const template = orgs_data.args.email?.template;
        if (!template) break;
        candidate_ids = candidate_ids || [];
        email_status = await send_mails({
          candidate_ids,
          types: template,
        });

        break;
      }
    }

    // console.log({ history_id });
    return res
      .status(200)
      .json({ email_status, candidates_ids, args: orgs_data.args });
  } else if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send(getResponse({ error: "Method Not Allowed!" }));
    return;
  }
};

// {
//   person_locations: string[] ( extract city or state or country if mentioned in the text or else empty array),
//           person_titles : string[] (extract job title mentioned in the text),
//           person_seniorities: enum [entry, senior, manager, director, executive, intern, owner, founder, c_suite, partner, vp, head][](extract seniority mentioned in the text or else empty array),
//           companies: string[] (extract company name mentioned in the text or else empty array),
//           }
// getFilter("senior software engineer in san francisco at google");
