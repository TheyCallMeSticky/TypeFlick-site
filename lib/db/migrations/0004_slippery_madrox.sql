ALTER TABLE "video_collaborators" DROP CONSTRAINT "video_collaborators_video_id_videos_id_fk";
--> statement-breakpoint
ALTER TABLE "video_variants" DROP CONSTRAINT "video_variants_video_id_videos_id_fk";
--> statement-breakpoint
ALTER TABLE "video_collaborators" ADD CONSTRAINT "video_collaborators_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_variants" ADD CONSTRAINT "video_variants_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;