import { Card, CardContent } from '@components/ui/card';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, {
  Dispatch,
  DragEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';

export default function ImagesUpload({
  selectedImages,
  setSelectedImages,
}: {
  setSelectedImages: Dispatch<SetStateAction<File[]>>;
  selectedImages: File[];
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      const files = newFiles.filter((file) => file.size < 5 * 1000000);
      // if (newFiles.length !== files.length)
      //chandruAddToast
      setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);

      const files = newFiles.filter((file) => file.size < 5 * 1000000);
      // if (newFiles.length !== files.length)
      //chandruAddToast

      setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full space-y-4'>
      <button
        type='button'
        className={`border-2 w-full border-dashed rounded-lg p-8 text-center ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/25 bg-muted'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept='image/*'
          className='hidden'
        />
        <Upload className='mx-auto h-12 w-12 text-muted-foreground' />
        <p className='mt-2 text-sm text-muted-foreground'>
          Drag &apos;n&apos; drop some files here, or click to select files
        </p>
      </button>

      {selectedImages.length > 0 && (
        <div className='flex flex-col gap-2 mt-4'>
          {selectedImages.map((file, index) => (
            <Card
              key={index}
              className='relative h-14 flex flex-row items-center shadow-none'
            >
              <CardContent className='flex flex-row items-center gap-2 p-2'>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  width={50} // Specify width
                  height={50} // Specify height
                  className='h-full object-cover rounded-md'
                />
                <p className='mt-2 text-sm text-muted-foreground'>
                  {file.name}
                </p>
                <button
                  className='absolute top-4 right-4 bg-secondary text-secondary-foreground rounded-sm p-1'
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className='h-4 w-4' />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
