CREATE TYPE "public"."video_format_enum" AS ENUM('16_9', '1_1', '9_16');--> statement-breakpoint
CREATE TYPE "public"."video_status_enum" AS ENUM('pending', 'processing', 'done', 'failed');--> statement-breakpoint
CREATE TABLE "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(64) NOT NULL,
	"aspect_ratio" "video_format_enum" NOT NULL,
	"thumbnail_url" text NOT NULL,
	"config" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "templates_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "video_collaborators" (
	"video_id" integer NOT NULL,
	"name" varchar(120) NOT NULL,
	CONSTRAINT "video_collaborators_video_id_name_pk" PRIMARY KEY("video_id","name")
);
--> statement-breakpoint
CREATE TABLE "video_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_id" integer NOT NULL,
	"format" "video_format_enum" NOT NULL,
	"output_path" text,
	"status" "video_status_enum" DEFAULT 'pending',
	"duration_ms" integer,
	"width" integer,
	"height" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"primary_beatmaker" varchar(120) NOT NULL,
	"beat_name" varchar(150) NOT NULL,
	"type_beat" varchar(120) NOT NULL,
	"template_id" integer NOT NULL,
	"audio_path" text NOT NULL,
	"image_path" text NOT NULL,
	"buy_link" text,
	"seo_title" text,
	"seo_description" text,
	"seo_hashtags" text[],
	"status" "video_status_enum" DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "video_collaborators" ADD CONSTRAINT "video_collaborators_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_variants" ADD CONSTRAINT "video_variants_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE no action ON UPDATE no action;