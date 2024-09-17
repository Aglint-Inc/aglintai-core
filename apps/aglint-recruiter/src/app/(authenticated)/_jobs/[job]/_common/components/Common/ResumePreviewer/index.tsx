import { Button } from '@components/ui/button';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Bookmark, BookmarkCheck, DownloadCloud, X } from 'lucide-react';
import { useMemo } from 'react';

import { Loader } from '@/components/Common/Loader';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

const ResumePreviewer = ({
  open,
  onClose,
  url,
  name,
  bookmark = null,
  navigation = null,
  download = false,
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
  download?: boolean;
}) => {
  const { checkPermissions } = useRolesAndPermissions();
  const isAllowed = useMemo(
    () => checkPermissions(['manage_job']),
    [checkPermissions],
  );

  const downloadFile = async () => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(name ?? '').replaceAll(' ', '_').toLowerCase()}_resume${getExtension(url)}`;
        a.click();
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl bg-transparent p-0'>
        <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
          <div className='flex items-center justify-between border-b p-4'>
            <h2 className='text-xl font-semibold'>{name}</h2>
            <div className='flex items-center space-x-2'>
              {download && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={downloadFile}
                  className='hover:bg-transparent'
                >
                  <DownloadCloud className='h-4 w-4' />
                  <span className='sr-only'>Download</span>
                </Button>
              )}
              {isAllowed && bookmark && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => bookmark.handleBookmark()}
                  className='hover:bg-transparent'
                >
                  {bookmark.isBookmarked ? (
                    <Bookmark className='h-4 w-4 text-black' />
                  ) : (
                    <BookmarkCheck className='h-4 w-4' />
                  )}
                  <span className='sr-only'>Bookmark</span>
                </Button>
              )}
              <Button variant='ghost' size='sm' onClick={onClose}>
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </Button>
            </div>
          </div>
          <div className='relative h-[85vh]'>
            <div className='absolute inset-0 z-10'>
              <ResumeEmbed url={url} />
            </div>
            <div className='absolute inset-0 z-0 flex items-center justify-center bg-neutral-100'>
              <Loader />
            </div>
          </div>
          {navigation && (
            <div className='flex justify-between border-t p-4'>
              <Button
                variant='outline'
                onClick={navigation.handleUp}
                disabled={!navigation.handleUp}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                onClick={navigation.handleDown}
                disabled={!navigation.handleDown}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ResumePreviewer };

export const ResumeEmbed = ({ url }: { url: string }) => {
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
