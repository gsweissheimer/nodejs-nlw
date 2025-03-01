CREATE TYPE "my_schema"."entity_types" AS ENUM('pet', 'tutor', 'family');--> statement-breakpoint
CREATE TYPE "my_schema"."event_types" AS ENUM('event', 'appointment');--> statement-breakpoint
CREATE TABLE "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "my_schema"."event_types" NOT NULL,
	"entity_uuid" uuid NOT NULL,
	"entity_type" text NOT NULL,
	"event_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
