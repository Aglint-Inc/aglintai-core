import { Button } from "@components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { ImagePlus } from "lucide-react"

import ImagesUpload from "./ImagesUpload"

export function ConfigureSliderImages() {
  return (
    <div>
       <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Company About</h1>
          <p className='text-sm text-muted-foreground'>
            This section content will be displayed on the candidate portal as the about section.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 auto-rows-auto">
      {/* 5 Grey Background Divs */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 h-40 rounded-md flex items-center justify-center"
        >
          <p className="text-center">Image {index + 1}</p>
        </div>
      ))}
      
      <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-col items-center gap-4 justify-center w-full h-full" variant="outline">
        <ImagePlus className="w-10 h-10 " />
          Add Slider Images</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Slider Images</DialogTitle>
          <DialogDescription>
            Upload images for the slider on the candidate portal. You can upload up to 5 images, each less than 5MB. Landscape orientation is preferred.
          </DialogDescription>
        </DialogHeader>
       <ImagesUpload />
        <DialogFooter className="w-full flex flex-row gap-2 justify-between">
        <Button variant="secondary" className="w-full">Cancel</Button>
          <Button type="submit" className="w-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
      </div>
    
    </div>
  )
}
