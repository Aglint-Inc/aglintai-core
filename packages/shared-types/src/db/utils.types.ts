import type { TypeOf } from "zod";
import type { DatabaseTable } from "..";
import type { Database } from "./schema.types";
import type { agentSelfScheduleInstruction } from "@aglint/shared-utils";

export type CustomizableTypes<T extends "Array" | "Object"> = T extends "Array"
  ? Record<string, unknown>[]
  : Record<string, unknown>;

export type Custom<
  T extends CustomizableTypes<"Array"> | CustomizableTypes<"Object">,
  U extends T extends CustomizableTypes<"Array">
    ? Partial<{ [id in keyof T[number]]: unknown }>
    : Partial<{ [id in keyof T]: unknown }>,
> =
  T extends CustomizableTypes<"Array">
    ? (Omit<T[number], keyof U> &
        Required<Pick<U, Extract<keyof RequiredOnly<T[number]>, keyof U>>> &
        Partial<Pick<U, Extract<keyof PartialOnly<T[number]>, keyof U>>>)[]
    : T extends CustomizableTypes<"Object">
      ? Omit<T, keyof U> &
          Required<Pick<U, Extract<keyof RequiredOnly<T>, keyof U>>> &
          Partial<Pick<U, Extract<keyof PartialOnly<T>, keyof U>>>
      : never;

export type RequiredOnly<T extends CustomizableTypes<"Object">> = Pick<
  T,
  {
    [id in keyof T]-?: undefined extends T[id] ? never : id;
  }[keyof T]
>;

export type PartialOnly<T extends CustomizableTypes<"Object">> = Omit<
  T,
  keyof RequiredOnly<T>
>;

export type CustomActionType =
  | "slack"
  | "email"
  | "end_point"
  | "agent_instruction";

type CustomEmailPayload = {
  email?: Pick<
    Database["public"]["Tables"]["company_email_template"]["Row"],
    "subject" | "body"
  >;
};

type CustomSlackPayload = {
  slack: null;
};

type CustomEndPointPayload = {
  end_point: null;
};

export type CustomAgentInstructionPayload = {
  agent: {
    instruction: string;
    ai_response: TypeOf<typeof agentSelfScheduleInstruction>;
  };
  email?: CustomEmailPayload["email"];
};

export type ActionPayloadType = {
  email: CustomEmailPayload;
  slack: CustomSlackPayload;
  end_point: CustomEndPointPayload;
  agent_instruction: CustomAgentInstructionPayload;
};

export type ValidWorkflowActionEntries<
  T extends
    Database["public"]["Enums"]["workflow_trigger"] = Database["public"]["Enums"]["workflow_trigger"],
> =
  | {
      action_type: Extract<CustomActionType, "email">;
      payload: ActionPayloadType["email"];
      target_api: Extract<
        Database["public"]["Enums"]["email_slack_types"],
        `${T}_${"email" | "emailLink"}_${string}`
      >;
    }
  | {
      action_type: Extract<CustomActionType, "slack">;
      payload: ActionPayloadType["slack"];
      target_api: Extract<
        Database["public"]["Enums"]["email_slack_types"],
        `${T}_${"slack"}_${string}`
      >;
    }
  | {
      action_type: Extract<CustomActionType, "end_point">;
      payload: ActionPayloadType["end_point"];
      target_api: Extract<
        Database["public"]["Enums"]["email_slack_types"],
        `${T}_${string}_${string}`
      >;
    }
  | {
      action_type: Extract<CustomActionType, "agent_instruction">;
      payload: ActionPayloadType["agent_instruction"];
      target_api: Extract<
        Database["public"]["Enums"]["email_slack_types"],
        `${T}_${"agent_instruction" | "emailLink" | "agent" | "emailAgent" | "phoneAgent"}_${string}`
      >;
    } extends infer S
  ? S extends { target_api: never }
    ? never
    : S
  : never;

export type Trigger_API_Action_Mapper<
  T extends
    DatabaseTable["workflow"]["trigger"] = DatabaseTable["workflow"]["trigger"],
> = {
  [Trigger in T]: {
    name: string;
    value: ValidWorkflowActionEntries<Trigger>;
  }[];
};
