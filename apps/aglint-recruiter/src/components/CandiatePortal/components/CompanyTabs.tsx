"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/ui/tabs";
import CompanySlider from "./companySlider";



export default function CompanyTabs({ companyImages, aboutContent, jobDescriptionContent }: { companyImages: any, aboutContent: any, jobDescriptionContent: any }) {
  return (
    <Tabs defaultValue="about" className="p-8">
      <TabsList className="mb-4">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="job-description">Job description</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <h2 className="text-xl font-semibold mb-4">About us</h2>
        <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: aboutContent }} />
        <div className="relative mt-8">
          <CompanySlider slides={companyImages} />
        </div>
      </TabsContent>
      <TabsContent value="job-description">
        <h2 className="text-xl font-semibold mb-4">Software Engineer</h2>
        <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: jobDescriptionContent }} />
      </TabsContent>
    </Tabs>
  )
}
