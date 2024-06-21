export const isEnvProd = () => {
  return process.env.NEXT_PUBLIC_HOST_NAME.includes('app.aglinthq.com');
};
