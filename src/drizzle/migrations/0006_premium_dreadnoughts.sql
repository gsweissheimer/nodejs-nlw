CREATE TYPE my_schema.entity_types AS ENUM ('pet', 'tutor', 'family');
CREATE TYPE my_schema.event_types AS ENUM ('event', 'appointment');

ALTER TABLE event ALTER COLUMN entity_type SET DATA TYPE my_schema.entity_types USING entity_type::my_schema.entity_types;
ALTER TABLE event ADD COLUMN value text NOT NULL;
ALTER TABLE event ADD COLUMN type my_schema.event_types NOT NULL DEFAULT 'event';
