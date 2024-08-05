import { WorkflowGraph } from './graph';
import { EventNode } from './node';

export const createReqAvailWorkflowGraph = () => {
  const req_avail_graph = new WorkflowGraph();
  req_avail_graph.addNode(
    new EventNode('not_started', 'FIND_CURR_AVAIL_SLOTS', true, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'REQ_CAND_AVAIL_EMAIL_LINK', true, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'CAND_AVAIL_REC', true, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'FIND_SUITABLE_SLOTS', true, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'SELF_SCHEDULE_LINK', true, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'CAND_CONFIRM_SLOT', true, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'REQ_AVAIL_FIRST_FOLLOWUP', false, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'REQ_AVAIL_SECOND_FOLLOWUP', false, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'CANCEL_AVAIL_REQ', false, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode(
      'not_started',
      'SELF_SCHEDULE_FIRST_FOLLOWUP',
      false,
      0,
      null,
    ),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'SELF_SCHEDULE_SEC_FOLLOWUP', false, 0, null),
  );
  req_avail_graph.addNode(
    new EventNode('not_started', 'SELF_SCHEDULE_CANCEL', false, 0, null),
  );

  // edges
  req_avail_graph.addEdge('FIND_CURR_AVAIL_SLOTS', 'REQ_CAND_AVAIL_EMAIL_LINK');
  req_avail_graph.addEdge('REQ_CAND_AVAIL_EMAIL_LINK', 'CAND_AVAIL_REC');
  req_avail_graph.addEdge('CAND_AVAIL_REC', 'FIND_SUITABLE_SLOTS');
  req_avail_graph.addEdge('FIND_SUITABLE_SLOTS', 'SELF_SCHEDULE_LINK');
  req_avail_graph.addEdge('SELF_SCHEDULE_LINK', 'CAND_CONFIRM_SLOT');
  req_avail_graph.addEdge(
    'REQ_CAND_AVAIL_EMAIL_LINK',
    'REQ_AVAIL_FIRST_FOLLOWUP',
  );
  req_avail_graph.addEdge(
    'REQ_AVAIL_FIRST_FOLLOWUP',
    'REQ_AVAIL_SECOND_FOLLOWUP',
  );
  req_avail_graph.addEdge('REQ_AVAIL_FIRST_FOLLOWUP', 'CAND_AVAIL_REC');
  req_avail_graph.addEdge('REQ_AVAIL_SECOND_FOLLOWUP', 'CANCEL_AVAIL_REQ');
  req_avail_graph.addEdge('REQ_AVAIL_SECOND_FOLLOWUP', 'CAND_AVAIL_REC');

  req_avail_graph.addEdge('SELF_SCHEDULE_LINK', 'SELF_SCHEDULE_FIRST_FOLLOWUP');
  req_avail_graph.addEdge('SELF_SCHEDULE_FIRST_FOLLOWUP', 'CAND_CONFIRM_SLOT');
  req_avail_graph.addEdge(
    'SELF_SCHEDULE_FIRST_FOLLOWUP',
    'SELF_SCHEDULE_SEC_FOLLOWUP',
  );
  req_avail_graph.addEdge('SELF_SCHEDULE_SEC_FOLLOWUP', 'CAND_CONFIRM_SLOT');
  req_avail_graph.addEdge('SELF_SCHEDULE_SEC_FOLLOWUP', 'SELF_SCHEDULE_CANCEL');
  return req_avail_graph;
};
