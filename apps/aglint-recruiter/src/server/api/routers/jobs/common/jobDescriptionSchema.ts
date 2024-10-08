import { z } from 'zod';

export const jobDescriptionSchema = z.string().min(100);
