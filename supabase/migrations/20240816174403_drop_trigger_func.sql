drop trigger if exists "after_insert_candidate_request_availability" on "public"."candidate_request_availability";

drop trigger if exists "workflow_on_update_candidate_req_avail_slots" on "public"."candidate_request_availability";

drop function if exists "public"."func_on_update_candidate_request_availability_slots"();


