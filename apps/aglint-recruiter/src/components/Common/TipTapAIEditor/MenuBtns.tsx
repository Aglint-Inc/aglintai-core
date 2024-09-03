import {
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  ChevronUp,
  Italic,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo,
} from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
      className='sticky top-0 z-10 flex justify-between border-b border-neutral-200 bg-white pr-2'
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
          <PopoverTrigger asChild>
            <Button variant='ghost' size='sm' className='h-8 border-none'>
              {typography}
              {open ? (
                <ChevronUp className='ml-2 h-4 w-4' />
              ) : (
                <ChevronDown className='ml-2 h-4 w-4' />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-40'>
            <div className='flex flex-col gap-1'>
              <Button
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive('paragraph') ? 'bg-neutral-100' : ''}`}
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
                  className={`justify-start ${editor.isActive('heading', { level }) ? 'bg-neutral-100' : ''}`}
                  onClick={() => handleClick(level, text)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`p-2 ${editor.isActive('bold') ? 'bg-neutral-100' : ''}`}
            >
              <Bold className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`p-2 ${editor.isActive('italic') ? 'bg-neutral-100' : ''}`}
            >
              <Italic className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={`p-2 ${editor.isActive('underline') ? 'bg-neutral-100' : ''}`}
            >
              <Underline className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isAlign && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  disabled={
                    !editor.can().chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 ${editor.isActive('bulletList') ? 'bg-neutral-100' : ''}`}
                >
                  <List className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bullet List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  disabled={
                    !editor.can().chain().focus().toggleOrderedList().run()
                  }
                  className={`p-2 ${editor.isActive('orderedList') ? 'bg-neutral-100' : ''}`}
                >
                  <ListOrdered className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ordered List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
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
                  className={`p-2 ${editor.isActive({ textAlign: 'left' }) ? 'bg-neutral-100' : ''}`}
                >
                  <AlignLeft className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
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
                  className={`p-2 ${editor.isActive({ textAlign: 'right' }) ? 'bg-neutral-100' : ''}`}
                >
                  <AlignRight className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
};

const TipTapUndoRedo = () => {
  const { editor } = useTipTap();
  return (
    <div className='flex items-center gap-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              className={`h-6 w-6 p-1 ${editor?.can().undo() ? 'bg-neutral-100' : ''}`}
            >
              <Undo className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              className={`h-6 w-6 p-1 ${editor?.can().redo() ? 'bg-neutral-100' : ''}`}
            >
              <Redo className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
