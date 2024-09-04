/* eslint-disable security/detect-object-injection */
import {
  type DatabaseTable,
  type DatabaseTableUpdate,
} from '@aglint/shared-types';

import {
  capitalize,
} from '@mui/material';
import { Check, Edit2, GripVertical, Trash2, X } from "lucide-react"
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { ButtonSoft } from '@devlink2/ButtonSoft';
import { NewTabPill } from '@devlink3/NewTabPill';
import { ScheduleReason } from '@devlink3/ScheduleReason';
import { ScheduleReasonSection } from '@devlink3/ScheduleReasonSection';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

const initialReasons: DatabaseTable['recruiter']['scheduling_reason'] = {
  candidate: {
    rescheduling: ['other'],
    cancellation: ['other'],
  },
  internal: {
    rescheduling: ['other'],
    cancellation: ['other'],
    decline: ['other'],
  },
};

const SchedulingReasons = () => {
  const { recruiter, setRecruiter: updateRecruiter } = useAuthDetails();
  const [tab, setTab] =
    useState<keyof DatabaseTable['recruiter']['scheduling_reason']>(
      'candidate',
    );
  const reason = {
    ...initialReasons,
    ...(recruiter.scheduling_reason ?? {}),
  };

  const handelUpdateReasons = async <T extends typeof tab>(
    updatedReason: Partial<DatabaseTable['recruiter']['scheduling_reason'][T]>,
  ) => {
    const temp = {
      ...reason,
    };
    temp[tab] = { ...(temp[tab] || {}), ...updatedReason };
    return setRecruiter({
      id: recruiter.id,
      scheduling_reason: temp,
    }).then((data) => {
      updateRecruiter({ ...data, socials: recruiter.socials });
      return true;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(reason[tab][result.draggableId]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedReason = {
      [result.draggableId]: items,
    };

    handelUpdateReasons(updatedReason);
  };

  return (
    <>
      <ScheduleReason
        sloNewTabPill={
          <>
            {(
              Object.keys(
                reason || {},
              ) as unknown as (keyof DatabaseTable['recruiter']['scheduling_reason'])[]
            ).map((key) => (
              <NewTabPill
                key={key}
                textLabel={capitalizeFirstLetter(key)}
                isPillActive={key === tab}
                onClickPill={{
                  onClick: () => {
                    setTab(key);
                  },
                }}
              />
            ))}
          </>
        }
        isMainHeadingVisible={true}
        textMainHeading={
          tab === 'candidate'
            ? 'Set Rescheduling & Cancellation Reasons'
            : 'Set Decline Rescheduling & Cancellation Reasons'
        }
        textMainHelperText={
          tab === 'candidate'
            ? 'Configure default reasons for candidates to cancel or reschedule their interviews. These reasons will be available as options for candidates when they request to modify their scheduled interviews.'
            : 'Set predefined reasons for interviewers to decline or request rescheduling, and for canceling interviews. These reasons will be available as options for interviewers when they need to modify their scheduled interviews.'
        }
        slotScheduleReasonSection={
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(reason[tab]).map(<T extends typeof tab>(item) => {
              const typedItem =
                item as keyof DatabaseTable['recruiter']['scheduling_reason'][T] &
                  string;
              return (
                <ScheduleReasonSectionCard
                  key={item}
                  scheduleReason={typedItem}
                  updateReasons={handelUpdateReasons}
                  description={`Add reasons for ${capitalizeFirstLetter(
                    item,
                  )}. These options will be available when the ${capitalizeFirstLetter(
                    tab === 'internal' ? 'Internal user' : tab,
                  )} ${
                    item === 'decline'
                      ? 'decline the Session'
                      : 'request for session ' + capitalizeFirstLetter(item)
                  }.`}
                  scheduleReasonItems={reason[tab][item] || []}
                />
              );
            })}
          </DragDropContext>
        }
      />
    </>
  );
};
export default SchedulingReasons;

const ScheduleReasonSectionCard = <
  T extends keyof DatabaseTable['recruiter']['scheduling_reason'],
>({
  scheduleReason,
  description,
  updateReasons,
  scheduleReasonItems,
}: {
  scheduleReason: keyof DatabaseTable['recruiter']['scheduling_reason'][T] &
    string;
  description: string;
  updateReasons: (
    // eslint-disable-next-line no-unused-vars
    updatedReason: DatabaseTable['recruiter']['scheduling_reason'][T],
  ) => Promise<boolean>;
  scheduleReasonItems: string[];
}) => {
  const [newReason, setNewReason] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddReason = () => {
    if (newReason.trim()) {
      const updatedItems = [...scheduleReasonItems, newReason.trim()];
      updateReasons({ [scheduleReason]: updatedItems }).then(() => {
        toast.success('New reason added successfully.');
        setNewReason('');
        setIsAdding(false);
      });
    }
  };

  const handleCancelAdd = () => {
    setNewReason('');
    setIsAdding(false);
  };

  return (
    <ScheduleReasonSection
      slotAddButton={
        isAdding ? (
          <div className='w-full'>
            <Card className="border-none bg-neutral-100 w-full mb-2">
            <CardContent className="p-3 w-full">
              <div className="flex items-center space-x-2 w-full">
                <Input
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="Enter new reason"
                  className="h-8"
                />
                <Button onClick={handleAddReason} size="icon" variant="outline" className='w-7 h-7 flex-shrink-0'>
                  <Check className="h-3 w-3" />
                </Button>
                <Button onClick={handleCancelAdd} size="icon" variant="outline" className='w-7 h-7 flex-shrink-0'>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
          
        ) : (
          <div className='flex justify-start'>
             <ButtonSoft
            highContrast={false}
            iconName={'add'}
            isLeftIcon={true}
            size={2}
            textButton='Add'
            onClickButton={{
              onClick: () => setIsAdding(true),
            }}
          />
          </div>
         
        )
      }
      textHeading={`${capitalize(scheduleReason)} Reason`}
      textDesc={description}
      onClickAdd={{
        onClick: () => setIsAdding(true),
      }}
      slotReasonList={
        <Droppable droppableId={scheduleReason}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {scheduleReasonItems.map((item, index) => (
                <Draggable key={item + index} draggableId={item + index} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center mb-2 relative group"
                    >
                      <div 
                        {...provided.dragHandleProps} 
                        className="cursor-move mr-2 absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ transform: 'translateX(-100%)' }}
                      >
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <ReasonListItem
                        text={item}
                        onEdit={(updatedText) => {
                          const temp = { [scheduleReason]: [...scheduleReasonItems] };
                          temp[String(scheduleReason)][index] = updatedText;
                          updateReasons(temp).then(() => {
                            toast.success('Updated Successfully.');
                          });
                        }}
                        onDelete={() => {
                          const temp: DatabaseTable['recruiter']['scheduling_reason'][T] =
                            {
                              [scheduleReason]:
                                scheduleReasonItems?.filter((_, ind) => index !== ind) ||
                                [],
                            };
                          updateReasons(temp).then(() => {
                            toast.success('Deleted Successfully.');
                          });
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      }
    />
  );
};

const ReasonListItem = ({
  text,
  onEdit,
  onDelete,
}: {
  text: string;
  onEdit: (updatedText: string) => void;
  onDelete: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSave = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card 
        className={`w-full ${isEditing ? 'bg-gray-100 border-none' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-3">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className=" h-8"
              />
              <Button onClick={handleSave} size="icon" variant="outline" className='w-7 h-7 flex-shrink-0'>
                <Check className="h-3 w-3" />
              </Button>
              <Button onClick={handleCancel} size="icon" variant="outline" className='w-7 h-7 flex-shrink-0'>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>{text}</span>
              
              <div className="space-x-2">
                <Button 
                  onClick={() => setIsEditing(true)} 
                  size="icon"
                  variant="outline"
                  className={`w-7 h-7 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(true)} 
                  size="icon"
                  variant="outline"
                  className={`w-7 h-7 bg-red-100 hover:bg-red-200 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the reason.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel  onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};



const setRecruiter = async (
  data: Omit<DatabaseTableUpdate['recruiter'], 'id'> & { id: string },
) => {
  return supabase
    .from('recruiter')
    .update(data)
    .eq('id', data.id)
    .select(
      '*,office_locations(*), departments(id,name), recruiter_preferences(*)',
    )
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
