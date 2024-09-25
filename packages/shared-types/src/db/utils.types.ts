// @ts-nocheck
import type { TypeOf } from 'zod';
import type { DatabaseTable, TrueDB } from '..';
import type { Database } from './schema.types';
import type { agentSelfScheduleInstruction } from '@aglint/shared-utils';

export type CustomizableTypes<T extends 'Array' | 'Object'> = T extends 'Array'
  ? Record<string, unknown>[]
  : Record<string, unknown>;

// Will be V2. Do not delete
// export type Custom<
//   T extends CustomizableTypes<"Array"> | CustomizableTypes<"Object">,
//   U extends T extends CustomizableTypes<"Array">
//     ? Partial<{ [id in keyof T[number]]: unknown }>
//     : Partial<{ [id in keyof T]: unknown }>,
// > =
//   T extends CustomizableTypes<"Array">
//     ? (Omit<T[number], keyof U> &
//         Required<Pick<U, Extract<keyof RequiredOnly<T[number]>, keyof U>>> &
//         Partial<Pick<U, Extract<keyof PartialOnly<T[number]>, keyof U>>>)[]
//     : T extends CustomizableTypes<"Object">
//       ? Omit<T, keyof U> &
//           Required<Pick<U, Extract<keyof RequiredOnly<T>, keyof U>>> &
//           Partial<Pick<U, Extract<keyof PartialOnly<T>, keyof U>>>
//       : never;

export type Custom<
  T extends Record<any, any>[] | Record<any, any>,
  U extends T extends Record<any, any>[]
    ? Partial<{ [id in keyof T[number]]: any }>
    : T extends Record<any, any>
      ? Partial<{ [id in keyof T]: any }>
      : never,
> = T extends Record<any, any>[]
  ? (Omit<T[number], keyof U> & U)[]
  : T extends Record<any, any>
    ? Omit<T, keyof U> & U
    : U;

export type RequiredOnly<T extends CustomizableTypes<'Object'>> = Pick<
  T,
  {
    [id in keyof T]-?: undefined extends T[id] ? never : id;
  }[keyof T]
>;

export type PartialOnly<T extends CustomizableTypes<'Object'>> = Omit<
  T,
  keyof RequiredOnly<T>
>;

export type CustomActionType =
  | 'slack'
  | 'email'
  | 'end_point'
  | 'agent_instruction';

type CustomEmailPayload = {
  email?: Pick<
    Database['public']['Tables']['company_email_template']['Row'],
    'subject' | 'body'
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
    // ai_response: z.infer<typeof agentSelfScheduleInstruction>;
  };
  email?: CustomEmailPayload['email'];
};

export type ActionPayloadType = {
  email: CustomEmailPayload;
  slack: CustomSlackPayload;
  end_point: CustomEndPointPayload;
  agent_instruction: CustomAgentInstructionPayload;
};

export type ValidWorkflowActionEntries<
  T extends
    Database['public']['Enums']['workflow_trigger'] = Database['public']['Enums']['workflow_trigger'],
> =
  | {
      action_type: Extract<CustomActionType, 'email'>;
      payload: ActionPayloadType['email'];
      target_api: Extract<
        Database['public']['Enums']['email_slack_types'],
        `${T}_${'email' | 'emailLink'}_${string}`
      >;
    }
  | {
      action_type: Extract<CustomActionType, 'slack'>;
      payload: ActionPayloadType['slack'];
      target_api: Extract<
        Database['public']['Enums']['email_slack_types'],
        `${T}_${'slack'}_${string}`
      >;
    }
  | {
      action_type: Extract<CustomActionType, 'end_point'>;
      payload: ActionPayloadType['end_point'];
      target_api: Extract<
        Database['public']['Enums']['email_slack_types'],
        `${T}_${string}_${string}`
      >;
    }
  | {
      action_type: Extract<CustomActionType, 'agent_instruction'>;
      payload: ActionPayloadType['agent_instruction'];
      target_api: Extract<
        Database['public']['Enums']['email_slack_types'],
        `${T}_${'agent_instruction' | 'emailLink' | 'agent' | 'emailAgent' | 'phoneAgent'}_${string}`
      >;
    } extends infer S
  ? S extends { target_api: never }
    ? never
    : S
  : never;

export type Trigger_API_Action_Mapper<
  T extends
    DatabaseTable['workflow']['trigger'] = DatabaseTable['workflow']['trigger'],
> = {
  [Trigger in T]: {
    name: string;
    value: ValidWorkflowActionEntries<Trigger>;
  }[];
};

type ExcludeNullable<T> = T extends null ? never : T;

type IgnoreNullable<T extends Record<string, unknown>> = {
  [id in keyof T]: ExcludeNullable<T[id]>;
};

type NeverNullable<T extends Record<string, unknown>> = {
  [id in keyof T]: null extends T[id] ? never : T[id];
};

type NeverNotNullable<T extends Record<string, unknown>> = {
  [id in keyof T]: null extends T[id] ? T[id] : never;
};

type OmitNever<T extends Record<string, unknown>> = {
  [id in keyof T as T[id] extends never ? never : id]: T[id];
};

type PickNullable<T extends Record<string, unknown>> = OmitNever<
  NeverNotNullable<T>
>;

type OmitNullable<T extends Record<string, unknown>> = OmitNever<
  NeverNullable<T>
>;

export type SelectiveNotNull<
  T extends Record<string, unknown>,
  U extends keyof PickNullable<T>,
> = OmitNullable<T> &
  Pick<IgnoreNullable<PickNullable<T>>, U> &
  Omit<PickNullable<T>, U>;

export type SelectiveNotNullTables<
  T extends OmitNever<{
    [id in keyof TrueDB['public']['Tables']]: keyof PickNullable<
      TrueDB['public']['Tables'][id]['Row']
    >;
  }>,
> = Custom<
  TrueDB['public']['Tables'],
  {
    [id in keyof T]: Custom<
      TrueDB['public']['Tables'][id],
      {
        Row: SelectiveNotNull<TrueDB['public']['Tables'][id]['Row'], T[id]>;
      }
    >;
  }
>;

export type SelectiveNotNullViews<
  T extends OmitNever<{
    [id in keyof TrueDB['public']['Views']]: keyof PickNullable<
      TrueDB['public']['Views'][id]['Row']
    >;
  }>,
> = Custom<
  TrueDB['public']['Views'],
  {
    [id in keyof T]: Custom<
      TrueDB['public']['Views'][id],
      {
        Row: SelectiveNotNull<TrueDB['public']['Views'][id]['Row'], T[id]>;
      }
    >;
  }
>;
