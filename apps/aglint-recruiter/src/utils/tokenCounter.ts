import axios from 'axios';
import { type CompletionUsage } from 'openai/resources';

export const tokenMeter = async ({
  company_name,
  model,
  tokenUsage,
  usageLocation,
}: {
  tokenUsage: CompletionUsage;
  usageLocation: string;
  model: string;
  company_name: string;
}) => {
  try {
    await axios.post(
      'https://us-central1-aglint-cloud-381414.cloudfunctions.net/token_counter_v1',
      {
        total_token: tokenUsage.total_tokens,
        prompt_token: tokenUsage.prompt_tokens,
        completion_token: tokenUsage.completion_tokens,
        api: usageLocation,
        model: model,
        env: process.env.NEXT_PUBLIC_HOST_NAME,
        company_name: company_name,
      },
    );
  } catch (error) {
    //
  }
};
