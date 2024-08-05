import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { EventNode } from './node';

type SchedulingEventLogs = DatabaseTable['request_progress'];

export class WorkflowGraph {
  private nodes: Map<SchedulingEventLogs['event_type'], EventNode>;
  private adjacencyList: Map<
    SchedulingEventLogs['event_type'],
    Set<SchedulingEventLogs['event_type']>
  >;

  constructor() {
    this.nodes = new Map(); // vertices
    this.adjacencyList = new Map(); // edges
  }

  public addNode(node: EventNode) {
    if (this.nodes.has(node.event_type)) {
      throw new Error('Node already exists');
    }
    this.nodes.set(node.event_type, node);
    this.adjacencyList.set(node.event_type, new Set());
  }
  public updateNode(node: EventNode) {
    if (!this.nodes.has(node.event_type)) {
      throw new Error('Node does not exists');
    }
    this.nodes.set(node.event_type, node);
  }

  public addEdge(
    node1_type: EventNode['event_type'],
    node2_type: EventNode['event_type'],
  ) {
    if (!this.nodes.has(node1_type) || !this.nodes.has(node2_type)) {
      throw new Error('Both nodes must exist in the graph');
    }
    this.adjacencyList.get(node1_type)!.add(node2_type);
  }

  public hasEdge(
    node1_type: EventNode['event_type'],
    node2_type: EventNode['event_type'],
  ): boolean {
    if (!this.nodes.has(node1_type) || !this.nodes.has(node2_type)) {
      return false;
    }
    return this.adjacencyList.get(node1_type)!.has(node2_type);
  }

  public getNeighbors(
    eventType: SchedulingEventLogs['event_type'],
  ): Set<SchedulingEventLogs['event_type']> | undefined {
    return this.adjacencyList.get(eventType);
  }

  public getNode(
    eventType: SchedulingEventLogs['event_type'],
  ): EventNode | undefined {
    return this.nodes.get(eventType);
  }

  public removeNode(eventType: SchedulingEventLogs['event_type']) {
    if (!this.nodes.has(eventType)) {
      throw new Error('Node does not exist');
    }
    this.nodes.delete(eventType);
    this.adjacencyList.delete(eventType);
    this.adjacencyList.forEach((neighbors) => {
      neighbors.delete(eventType);
    });
  }
  public traverseGraph(starting_node: SchedulingEventLogs['event_type']) {
    let ordered_nodes: EventNode[] = [];

    if (!this.nodes.has(starting_node)) {
      throw new Error(`${starting_node} does not exist in graph`);
    }

    let node_edges = Array.from(this.getNeighbors(starting_node));
    let past_present_events: EventNode[] = node_edges
      .filter((node_edge) => {
        let node = this.getNode(node_edge);
        return node.updated_at !== null;
      })
      .map((node_edge) => this.getNode(node_edge))
      .sort(
        (node1, node2) =>
          dayjsLocal(node1.updated_at).unix() -
          dayjsLocal(node2.updated_at).unix(),
      );
    const future_events: EventNode[] = node_edges
      .filter((node_edge) => {
        let node = this.getNode(node_edge);
        return node.updated_at === null && node.is_event_expected;
      })
      .map((node_edge) => this.getNode(node_edge))
      .sort((node1, node2) => node1.node_order - node2.node_order);

    let curr_node_sorted_events: EventNode[] = [
      ...past_present_events,
      ...future_events,
    ];
    ordered_nodes = [...curr_node_sorted_events];

    for (let node of curr_node_sorted_events) {
      let curr_node_events = this.traverseGraph(node.event_type);
      ordered_nodes = [...ordered_nodes, ...curr_node_events];
    }

    return ordered_nodes;
  }
}
