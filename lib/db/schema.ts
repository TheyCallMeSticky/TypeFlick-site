import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
  jsonb,
  primaryKey
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { SUBRESOURCE_INTEGRITY_MANIFEST } from 'next/dist/shared/lib/constants'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 })
})

export const usersRelations = relations(users, ({ many }) => ({
  videos: many(videos)
}))

export const videoFormat = pgEnum('video_format_enum', ['16_9', '1_1', '9_16'])
export const videoStatus = pgEnum('video_status_enum', ['pending', 'processing', 'done', 'failed'])
export const publishTarget = pgEnum('publish_target_enum', ['youtube', 'tiktok', 'instagram', 'x'])

export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: varchar('slug', { length: 64 }).notNull().unique(),
  aspectRatio: videoFormat('aspect_ratio').notNull(),
  thumbnailUrl: text('thumbnail_url').notNull(),
  config: jsonb('config').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
})

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  primaryBeatmaker: varchar('primary_beatmaker', { length: 120 }).notNull(),
  beatName: varchar('beat_name', { length: 150 }).notNull(),
  typeBeat: varchar('type_beat', { length: 120 }).notNull(),
  templateId: integer('template_id')
    .notNull()
    .references(() => templates.id),
  audioPath: text('audio_path').notNull(),
  imagePath: text('image_path').notNull(),
  buyLink: text('buy_link'),
  status: videoStatus('status').default('pending'),
  publishTargets: publishTarget('publish_targets').array().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
})

export const videoVariants = pgTable('video_variants', {
  id: serial('id').primaryKey(),
  videoId: integer('video_id')
    .notNull()
    .references(() => videos.id, { onDelete: 'cascade' }),
  format: videoFormat('format').notNull(),
  jobUuid: varchar('job_uuid', { length: 36 }),
  outputPath: text('output_path'),
  status: videoStatus('status').default('pending'),
  progress: integer('progress'),
  durationMs: integer('duration_ms'),
  width: integer('width'),
  height: integer('height'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
})

export const videoCollaborators = pgTable(
  'video_collaborators',
  {
    videoId: integer('video_id')
      .notNull()
      .references(() => videos.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 120 }).notNull()
  },
  (table) => [primaryKey({ columns: [table.videoId, table.name] })]
)

export const videoMetadata = pgTable(
  'video_metadata',
  {
    videoId: integer('video_id')
      .notNull()
      .references(() => videos.id, { onDelete: 'cascade' }),
    platform: publishTarget('platform').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    hashtags: text('hashtags').array().$type<string[]>()
  },
  (t) => [primaryKey({ columns: [t.videoId, t.platform] })]
)

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 255 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  ipAddress: varchar('ip_address', { length: 45 })
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type NewActivityLog = typeof activityLogs.$inferInsert

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_VIDEO = 'CREATE_VIDEO',
  UPDATE_VIDEO = 'UPDATE_VIDEO',
  DELETE_VIDEO = 'DELETE_VIDEO'
}
