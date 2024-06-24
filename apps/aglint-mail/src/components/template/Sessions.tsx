import { Container, Img, Text } from '@react-email/components';
import { Parser } from 'html-to-react';
import { durationIcon } from '../../utils/email/common/functions';

export const Session = ({ meetingDetail }) => {
  const htmlParser = Parser();
  return (
    <Container className="my-[10px] rounded-md px-[20px] py-[10px] border border-solid border-neutral-5">
      <Text className="m-0   leading-[24px] text-text-xs text-neutral-12">
        <strong>{htmlParser.parse(meetingDetail.date)}</strong>{' '}
        {htmlParser.parse(meetingDetail.time)}
      </Text>
      <Text className="m-0 mt-[5px] flex items-center leading-[24px] text-text-xs text-neutral-12">
        <span className="inline-flex items-center leading-[24px]">
          <Img
            className="w-[24px] h-[24px]"
            src={meetingDetail.sessionTypeIcon}
          />
          &nbsp;
          {htmlParser.parse(meetingDetail.sessionType)}
        </span>
      </Text>
      <Text className="m-0 flex items-center leading-[24px] text-text-xs text-neutral-12">
        <span className="inline-flex items-center leading-[24px]">
          <Img className="w-[24px] h-[24px]" src={meetingDetail.meetingIcon} />
          &nbsp;
          {htmlParser.parse(meetingDetail.platform)}
          &nbsp;&nbsp;
          <Img className="w-[24px] h-[24px]" src={durationIcon} />
          &nbsp;
          {htmlParser.parse(meetingDetail.duration)}
        </span>
      </Text>
    </Container>
  );
};
