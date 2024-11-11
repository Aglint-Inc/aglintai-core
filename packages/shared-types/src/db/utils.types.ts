import type { DatabaseTable } from "..";
import type { Database } from "./schema.types";

type Prettify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
} & {};

export type Custom<
  T extends Record<any, any>[] | Record<any, any>,
  U extends T extends Record<any, any>[]
    ? Partial<{ [id in keyof T[number]]: any }>
    : T extends Record<any, any>
      ? Partial<{ [id in keyof T]: any }>
      : never,
> = T extends Record<any, any>[]
  ? Prettify<Omit<T[number], keyof U> & U>[]
  : T extends Record<any, any>
    ? Prettify<Omit<T, keyof U> & U>
    : Prettify<U>;

export type CustomizableTypes<T extends "Array" | "Object"> = T extends "Array"
  ? Record<any, any>[]
  : Record<any, any>;

type CustomObject<
  T extends CustomizableTypes<"Object">,
  U extends Options<T>,
> = keyof U extends infer R
  ? Nullable<
      T,
      //@ts-expect-error
      Omit<T, R> &
        Required<Pick<U, Extract<keyof RequiredOnly<T>, R>>> &
        Partial<Pick<U, Extract<keyof PartialOnly<T>, R>>>
    >
  : never;

export type Custom2<
  T extends CustomizableTypes<"Object"> | CustomizableTypes<"Array">,
  U extends T extends CustomizableTypes<"Object">
    ? Options<T>
    : //@ts-expect-error
      Options<T[number]>,
> =
  T extends CustomizableTypes<"Object">
    ? Prettify<CustomObject<T, U>>
    : T extends CustomizableTypes<"Array">
      ? Prettify<CustomObject<T[number], U>>
      : never;

type RequiredOnly<T extends CustomizableTypes<"Object">> = Pick<
  T,
  {
    [id in keyof T]-?: undefined extends T[id] ? never : id;
  }[keyof T]
>;

type PartialOnly<T extends CustomizableTypes<"Object">> = Omit<
  T,
  keyof RequiredOnly<T>
>;

type Options<T extends CustomizableTypes<"Object">> = Partial<{
  [_id in keyof T]: unknown;
}>;

type Nullable<T extends CustomizableTypes<"Object">, U extends Options<T>> =
  NullableOnly<T> extends infer NullableKeys
    ? //@ts-expect-error
      keyof Omit<T, NullableKeys> extends infer NonNullableKeys
      ? UnNullify<Pick<U, NonNullableKeys>> & Nullify<Pick<U, NullableKeys>>
      : never
    : never;

type NullableOnly<T extends CustomizableTypes<"Object">> = {
  [id in keyof T]: null extends T[id] ? id : never;
}[keyof T];

type Nullify<T extends CustomizableTypes<"Object">> = {
  [id in keyof T]: T[id] | null;
};

type UnNullify<T extends CustomizableTypes<"Object">> = {
  [id in keyof T]: NonNullable<T[id]>;
};

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
    description: string;
  }[];
};
