CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TYPE "my_schema"."pet_types" AS ENUM('dog', 'cat');--> statement-breakpoint
CREATE TABLE "breed" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "my_schema"."pet_types" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "family_tutor" (
	"id" uuid PRIMARY KEY NOT NULL,
	"family_id" uuid NOT NULL,
	"tutor_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "family" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tutor_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pet" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"breed_id" uuid,
	"tutor_id" uuid,
	"birth_date" date,
	"microchip" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"angel" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tutor" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cpf" text NOT NULL,
	"email" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "tutor_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_record" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"tutor_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "family_tutor" ADD CONSTRAINT "family_tutor_family_id_family_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."family"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_tutor" ADD CONSTRAINT "family_tutor_tutor_id_tutor_id_fk" FOREIGN KEY ("tutor_id") REFERENCES "public"."tutor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family" ADD CONSTRAINT "family_tutor_id_tutor_id_fk" FOREIGN KEY ("tutor_id") REFERENCES "public"."tutor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet" ADD CONSTRAINT "pet_breed_id_breed_id_fk" FOREIGN KEY ("breed_id") REFERENCES "public"."breed"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet" ADD CONSTRAINT "pet_tutor_id_tutor_id_fk" FOREIGN KEY ("tutor_id") REFERENCES "public"."tutor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_record" ADD CONSTRAINT "user_record_tutor_id_tutor_id_fk" FOREIGN KEY ("tutor_id") REFERENCES "public"."tutor"("id") ON DELETE no action ON UPDATE no action;