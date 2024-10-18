import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import {
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo,
} from 'lucide-react';
import React, { useState } from 'react';

import { useTipTap } from './context';

function MenuBtns({
  borderRadius,
  isSize,
  isAlign,
}: {
  borderRadius?: React.CSSProperties['borderRadius'];
  isSize: boolean;
  isAlign: boolean;
}) {
  return (
    <div
      className='sticky top-0 z-10 flex justify-between border-b border-border bg-muted pr-2'
      style={{
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }}
    >
      <TipTapMenus isSize={isSize} isAlign={isAlign} />
      <TipTapUndoRedo />
    </div>
  );
}

export default MenuBtns;

const TipTapMenus = ({
  isSize,
  isAlign,
}: {
  isSize: boolean;
  isAlign: boolean;
}) => {
  const [typography, setTypography] = useState('Paragraph');
  const { editor } = useTipTap();

  if (!editor) return null;

  const handleClick = (level: 1 | 2 | 3 | 4 | 5 | 6, text: string) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setTypography(text);
  };

  const headings = [
    { level: 1 as const, text: 'Heading 1' },
    { level: 2 as const, text: 'Heading 2' },
    { level: 3 as const, text: 'Heading 3' },
    { level: 4 as const, text: 'Heading 4' },
    { level: 5 as const, text: 'Heading 5' },
    { level: 6 as const, text: 'Heading 6' },
  ];

  return (
    <div className='sticky top-0 z-50 flex items-center gap-1 p-1'>
      {isSize && (
        <Popover>
          <PopoverTrigger asChild className=''>
            <Button
              size='sm'
              className='h-8 border-none bg-transparent hover:bg-muted-foreground/20 dark:text-white'
            >
              {typography}
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-40 border border-border'>
            <div className='flex flex-col gap-1'>
              <Button
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive('paragraph') ? 'bg-muted' : ''}`}
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setTypography('Paragraph');
                }}
              >
                Paragraph
              </Button>
              {headings.map(({ level, text }) => (
                <Button
                  key={`heading-${level}`}
                  variant='ghost'
                  size='sm'
                  className={`justify-start ${editor.isActive('heading', { level }) ? 'bg-muted' : ''}`}
                  onClick={() => handleClick(level, text)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 ${editor.isActive('bold') ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
          >
            <Bold className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bold</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 ${editor.isActive('italic') ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
          >
            <Italic className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Italic</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`p-2 ${editor.isActive('underline') ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
          >
            <Underline className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Underline</p>
        </TooltipContent>
      </Tooltip>

      {isAlign && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={
                  !editor.can().chain().focus().toggleBulletList().run()
                }
                className={`p-2 ${editor.isActive('bulletList') ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
              >
                <List className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={
                  !editor.can().chain().focus().toggleOrderedList().run()
                }
                className={`p-2 ${editor.isActive('orderedList') ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
              >
                <ListOrdered className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ordered List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                disabled={
                  !editor.can().chain().focus().setTextAlign('left').run()
                }
                className={`p-2 ${editor.isActive({ textAlign: 'left' }) ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
              >
                <AlignLeft className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                disabled={
                  !editor.can().chain().focus().setTextAlign('right').run()
                }
                className={`p-2 ${editor.isActive({ textAlign: 'right' }) ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
              >
                <AlignRight className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </div>
  );
};

const TipTapUndoRedo = () => {
  const { editor } = useTipTap();
  return (
    <div className='flex items-center gap-1'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className={`h-6 w-6 p-1 ${editor?.can().undo() ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
          >
            <Undo className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Undo</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className={`h-6 w-6 p-1 ${editor?.can().redo() ? 'bg-muted-foreground/50' : ''} hover:bg-muted-foreground/30`}
          >
            <Redo className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Redo</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
