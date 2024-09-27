import { Button } from '@components/ui/button';

import { DatabaseTable } from '@aglint/shared-types';

export const ActionsContainer = ({
  wAction,
}: {
  wAction: DatabaseTable['workflow_action'];
}) => {
  return (
    <div className='rounded-md bg-secondary p-4'>
      <div className='mb-2 flex items-center justify-end'>
        <Button
          variant='ghost'
          size='sm'
          onClick={
            () => {}
            // removeAction(categoryIndex, automationIndex, actionIndex)
          }
        >
          Remove
        </Button>
      </div>
      {/* <ActionContent
        action={action}
        categoryIndex={categoryIndex}
        automationIndex={automationIndex}
        actionIndex={actionIndex}
        handleActionChange={handleActionChange}
        editingActions={editingActions}
        toggleActionEdit={toggleActionEdit}
      /> */}
    </div>
  );
};
