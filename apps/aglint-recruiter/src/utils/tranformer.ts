import serialize from 'serialize-javascript';

export const transformer = {
  serialize,
  deserialize(data: any) {
    // eslint-disable-next-line security/detect-eval-with-expression
    return eval('(' + data + ')');
  },
};
