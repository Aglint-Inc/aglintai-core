-- create table
CREATE TABLE IF NOT EXISTS office_locations (
    id SERIAL PRIMARY KEY,
    city TEXT NOT NULL,
    line1 TEXT NOT NULL,
    line2 TEXT,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    timezone TEXT NOT NULL,
    is_headquarter BOOLEAN NOT NULL,
    recruiter_id UUID NOT NULL,
    CONSTRAINT fk_recruiter
        FOREIGN KEY (recruiter_id)
        REFERENCES recruiter (id)
        ON DELETE CASCADE
);

-- migrate data to new table

with temp as (select id, unnest(office_locations) as office_locations from recruiter)
INSERT INTO office_locations (recruiter_id, city, line1, line2, region ,country ,zipcode ,timezone ,is_headquarter)
SELECT
  temp.id as recruiter_id
  , COALESCE(temp.office_locations ->> 'city', '') AS city
  , COALESCE(temp.office_locations ->> 'line1', '') AS line1
  , COALESCE(temp.office_locations ->> 'line2', '') AS line2
  , COALESCE(temp.office_locations ->> 'region', '') AS region
  , COALESCE(temp.office_locations ->> 'country', '') AS country
  , COALESCE(temp.office_locations ->> 'zipcode', '') AS zipcode
  , COALESCE(temp.office_locations ->> 'timezone', '') AS timezone
  , COALESCE((temp.office_locations ->> 'is_headquarter')::BOOLEAN, FALSE) AS is_headquarter
  from temp;

-- create departments table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    recruiter_id UUID NOT NULL,
    CONSTRAINT fk_recruiter
        FOREIGN KEY (recruiter_id)
        REFERENCES recruiter (id)
        ON DELETE CASCADE,
    CONSTRAINT unique_deps
        unique (recruiter_id, name)
);

-- migrate data to new table
with temp as (select id, unnest(departments) as department from recruiter)
INSERT INTO departments (recruiter_id, name)
SELECT
  temp.id as recruiter_id,
  temp.department AS name
  from temp;


-- drop column from old table
ALTER TABLE recruiter DROP COLUMN office_locations, DROP COLUMN departments;