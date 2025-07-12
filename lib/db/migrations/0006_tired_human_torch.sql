CREATE TYPE "public"."seo_platform_enum" AS ENUM('youtube', 'instagram', 'tiktok', 'x');--> statement-breakpoint
CREATE TABLE "video_metadata" (
	"video_id" integer NOT NULL,
	"platform" "seo_platform_enum" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"hashtags" text[] NOT NULL,
	CONSTRAINT "video_metadata_video_id_platform_pk" PRIMARY KEY("video_id","platform")
);
--> statement-breakpoint
ALTER TABLE "video_metadata" ADD CONSTRAINT "video_metadata_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;