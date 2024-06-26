import { Dialog, Stack } from '@mui/material';

import { BookMark } from '@/devlink/BookMark';
import { ResumeWrap } from '@/devlink3/ResumeWrap';
import Loader from '@/src/components/Common/Loader';

const ResumePreviewer = ({
  open,
  onClose,
  id,
  url,
  name,
  bookmark = null,
  navigation = null,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  name: string;
  url: string;
  bookmark?: {
    isBookmarked: boolean;
    handleBookmark: () => void;
  };
  navigation?: {
    handleUp: () => void;
    handleDown: () => void;
  };
}) => {
  const downloadFile = async () => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${(name ?? '').replaceAll(' ', '_').toLowerCase()}_resume${getExtension(url)}`;
        a.click();
      });
    });
  };
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '0px !important',
          border: 'none !important',
          backgroundColor: '#343639',
        },
        '.MuiDialog-container': {
          height: 'auto',
        },
      }}
      fullWidth
      maxWidth={'lg'}
      open={open}
      onClose={() => onClose()}
    >
      <ResumeWrap
        key={id}
        textName={name}
        onClickDown={{
          style: { display: navigation?.handleDown ? 'flex' : 'none' },
          onClick: () => navigation?.handleDown(),
        }}
        slotBookmark={
          <Stack direction={'row'} gap={1}>
            <BookMark onClickBookmark={{ onClick: () => downloadFile() }} />
            {bookmark && (
              <BookMark
                isBookMarked={bookmark.isBookmarked}
                onClickBookmark={{ onClick: () => bookmark.handleBookmark() }}
                isDarkIconVisible={true}
                isLightIconVisible={false}
              />
            )}
          </Stack>
        }
        onClickUp={{
          style: { display: navigation?.handleUp ? 'flex' : 'none' },
          onClick: () => navigation?.handleUp(),
        }}
        onClickClose={{ onClick: () => onClose() }}
        slotResume={
          <Stack
            direction={'row'}
            justifyContent={'center'}
            height={'85vh'}
            position={'relative'}
          >
            <Stack
              width={'100%'}
              height={'100%'}
              position={'absolute'}
              zIndex={1}
            >
              <Embed url={url} />
            </Stack>
            <Stack
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              zIndex={0}
            >
              <Loader />
            </Stack>
          </Stack>
        }
      />
    </Dialog>
  );
};

export { ResumePreviewer };

const Embed = ({ url }: { url: string }) => {
  const extension = getExtension(url);
  return (
    <embed
      src={
        extension === '.docx' || extension === '.doc'
          ? `https://view.officeapps.live.com/op/embed.aspx?src=${url}`
          : url
      }
      title='resume'
      width='100%'
      height='100%'
    />
  );
};

const getExtension = (url: string) => {
  return url.slice(url.lastIndexOf('.'), url.length);
};
