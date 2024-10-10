-- Step 3: Add a unique constraint to the foreign key column
ALTER TABLE candidate_request_availability
ADD CONSTRAINT unique_request_id UNIQUE (request_id);

