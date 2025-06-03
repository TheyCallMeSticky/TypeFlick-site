CREATE TYPE "public"."publish_target_enum" AS ENUM('youtube', 'tiktok', 'instagram');--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "publish_targets" "publish_target_enum"[] NOT NULL;