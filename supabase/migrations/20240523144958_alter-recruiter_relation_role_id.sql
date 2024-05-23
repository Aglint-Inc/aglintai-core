--  Add a new column with the correct data type and foreign key constraint
ALTER TABLE recruiter_relation ADD COLUMN role_id UUID REFERENCES roles(id);