export type SlackInteractionPayload = {
  type: string;
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  api_app_id: string;
  token: string;
  container: {
    type: string;
    message_ts: string;
    channel_id: string;
    is_ephemeral: boolean;
  };
  trigger_id: string;
  team: {
    id: string;
    domain: string;
  };
  enterprise: null | any; // Adjust the type if there are known values
  is_enterprise_install: boolean;
  channel: {
    id: string;
    name: string;
  };
  message: {
    metadata: Record<string, any>;
    user: string;
    type: string;
    ts: string;
    bot_id: string;
    app_id: string;
    text: string;
    team: string;
    blocks: Array<{
      type: string;
      block_id: string;
      text?: {
        type: string;
        text: string;
        verbatim: boolean;
      };
      accessory?: {
        type: string;
        image_url: string;
        alt_text: string;
      };
      elements?: Array<{
        type: string;
        action_id: string;
        text: {
          type: string;
          text: string;
          emoji: boolean;
        };
        style: string;
        value: string;
      }>;
    }>;
  };
  state: {
    values: {
      // Define any known values here if applicable
    };
  };
  response_url: string;
  actions: Array<{
    action_id: string;
    block_id: string;
    text: {
      type: string;
      text: string;
      emoji: boolean;
    };
    value: string;
    style: string;
    type: string;
    action_ts: string;
  }>;
};
