export const supabaseWrap = ({ data, error }: any) => {
  if (error) throw new Error(error);
  return data;
};
