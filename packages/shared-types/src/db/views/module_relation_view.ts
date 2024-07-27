import {
  PauseJson
} from "../..";
import type { ViewType } from "./index.types";

export type CustomModuleRelationView = ViewType<
  "module_relations_view",
  {
    pause_json: PauseJson;
  }
>;
