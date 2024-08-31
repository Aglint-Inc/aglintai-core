'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/shadcn/ui/avatar';
import { Button } from '@components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { Textarea } from '@components/shadcn/ui/textarea';
import React, { useState } from 'react';

export default function CandidateForm() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [bio, setBio] = useState(
    'A passionate developer with 5 years of experience...',
  );
  const [photo, setPhoto] = useState('/placeholder.svg?height=128&width=128');
  const [resume, setResume] = useState(null);

  const handlePhotoUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e?.target?.result as any);
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (file) => {
    setResume(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log('Form submitted:', { name, email, phone, bio, photo, resume })
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
      <Card className='w-full max-w-2xl border-none'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Candidate Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col items-center space-y-4'>
              <Avatar className='w-32 h-32'>
                <AvatarImage src={photo} alt={name} />
                <AvatarFallback>
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <FileUploader
                accept='image/*'
                onFileSelect={handlePhotoUpload}
                className='w-full max-w-xs'
              >
                Upload Photo
              </FileUploader>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your full name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Enter your phone number'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='Tell us about yourself'
                rows={4}
              />
            </div>

            <div className='space-y-2'>
              <Label>Resume</Label>
              <FileUploader
                accept='.pdf,.doc,.docx'
                onFileSelect={handleResumeUpload}
                className='w-full'
              >
                {resume ? 'Update Resume' : 'Upload Resume'}
              </FileUploader>
              {resume && (
                <div className='flex items-center space-x-2 mt-2'>
                  <span className='text-sm text-gray-600'>{resume.name}</span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      window.open(URL.createObjectURL(resume), '_blank')
                    }
                  >
                    View
                  </Button>
                </div>
              )}
            </div>

            <Button type='submit' className='w-full'>
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// FileUploader component (you may need to implement this or use a library)
function FileUploader({ children, accept, onFileSelect, className }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className={className}>
      <label className='block'>
        <span className='sr-only'>Choose file</span>
        <input
          type='file'
          accept={accept}
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          border border-gray-300 rounded-md
        '
        />
      </label>
      {children}
    </div>
  );
}
