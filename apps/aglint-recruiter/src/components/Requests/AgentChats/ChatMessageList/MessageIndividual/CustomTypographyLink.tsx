import { Typography } from '@mui/material';
import { marked } from 'marked';

const CustomTypographyLink = ({
  text,
  links,
}: {
  text: string;
  links: {
    replace: string;
    with: string;
  }[];
}) => {
  const replaceWithLinks = (text) => {
    let result = text;
    links?.forEach(({ replace, with: link }) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(`(${replace})`, 'gi');
      const replacement = `<a href="${link}" style="text-decoration: none; color:#3C6478 ;">${replace}</a>`;
      result = result.replace(regex, replacement);
    });
    return result;
  };

  const replacedText = replaceWithLinks(text);

  return (
    <Typography dangerouslySetInnerHTML={{ __html: marked(replacedText) }} />
  );
};

export default CustomTypographyLink;
