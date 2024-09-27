import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { ScrollArea } from '@components/ui/scroll-area';
import { Textarea } from '@components/ui/textarea';
import { Bot, Edit2, Mail, MessageSquare, Slack, Zap } from 'lucide-react';

export const Summary = ({ automationCategories, toggleActionEdit }) => {
  const enabledAutomations = automationCategories.flatMap((category) =>
    category.automations.filter((automation) => automation.enabled),
  );

  if (enabledAutomations.length === 0) {
    return renderAIAutomationCTA();
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Automation Summary</CardTitle>
        <CardDescription>Overview of enabled automations</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[calc(100vh-200px)] pr-4'>
          <ul className='space-y-4'>
            {enabledAutomations.map((automation) => (
              <li key={automation.id} className='border-b pb-4 last:border-b-0'>
                <h4 className='mb-2 font-semibold'>{automation.question}</h4>
                <ul className='space-y-2'>
                  {automation.actions.map((action) => (
                    <li key={action.id}>
                      <div className='mb-1 flex items-center space-x-2'>
                        {renderActionBadge(action.type)}
                      </div>
                      {action.type === 'ai' ? (
                        <div className='rounded bg-gray-100 p-2 text-sm'>
                          <p className='font-medium'>AI Instructions:</p>
                          <p>{action.content}</p>
                        </div>
                      ) : (
                        <Accordion type='single' collapsible>
                          <AccordionItem value={action.id}>
                            <AccordionTrigger className='text-sm'>
                              View Content
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className='relative'>
                                {action.type === 'email' && (
                                  <div className='mb-2'>
                                    <Label className='text-sm font-medium'>
                                      Subject:
                                    </Label>
                                    <Input
                                      value={action.subject}
                                      readOnly
                                      className='mt-1'
                                    />
                                  </div>
                                )}
                                <Textarea
                                  value={action.content}
                                  readOnly
                                  rows={4}
                                  className='pr-8'
                                />
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='absolute right-2 top-2'
                                  onClick={() => toggleActionEdit(action.id)}
                                >
                                  <Edit2 className='h-4 w-4' />
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const renderAIAutomationCTA = () => {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Zap className='mr-2 h-5 w-5 text-yellow-500' />
          Supercharge Your Hiring
        </CardTitle>
        <CardDescription>Unlock the power of AI automation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p className='font-semibold'>Key Benefits:</p>
          <ul className='list-inside list-disc space-y-2'>
            <li>Reduce time-to-hire by up to 40%</li>
            <li>Improve candidate satisfaction by 35%</li>
            <li>Save hours on manual tasks daily</li>
          </ul>
          <div className='mt-4 rounded-md bg-secondary p-4'>
            <p className='mb-2 font-semibold'>Get Started:</p>
            <ol className='list-inside list-decimal space-y-1'>
              <li>Enable an automation in the left panel</li>
              <li>Add an AI action to automate responses</li>
              <li>Watch your hiring process transform</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const renderActionBadge = (type: string) => {
  switch (type) {
    case 'email':
      return (
        <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
          <Mail className='mr-1 h-3 w-3' />
          {type}
        </Badge>
      );
    case 'slack':
      return (
        <Badge variant='secondary' className='bg-green-100 text-green-800'>
          <Slack className='mr-1 h-3 w-3' />
          {type}
        </Badge>
      );
    case 'message':
      return (
        <Badge variant='secondary' className='bg-yellow-100 text-yellow-800'>
          <MessageSquare className='mr-1 h-3 w-3' />
          {type}
        </Badge>
      );
    case 'ai':
      return (
        <Badge variant='secondary' className='bg-purple-100 text-purple-800'>
          <Bot className='mr-1 h-3 w-3' />
          {type}
        </Badge>
      );
    default:
      return null;
  }
};
