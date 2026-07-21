import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Drizzle schema for the public tables. `auth.users` is managed by Supabase;
 * `profiles.id` references it via a foreign key defined in db/policies.sql
 * (Drizzle doesn't manage the auth schema). RLS policies also live there.
 */

export const roleEnum = pgEnum("user_role", ["coach", "client"]);
export const categoryEnum = pgEnum("exercise_category", ["strength", "pt"]);
export const programStatusEnum = pgEnum("program_status", [
  "active",
  "archived",
]);
export const noteKindEnum = pgEnum("note_kind", ["consult", "guidance"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // = auth.users.id
  role: roleEnum("role").notNull().default("client"),
  username: text("username").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  coachId: uuid("coach_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: categoryEnum("category").notNull(),
  description: text("description"),
  videoPath: text("video_path"),
  defaultSets: text("default_sets"),
  defaultReps: text("default_reps"),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const programs = pgTable("programs", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  notes: text("notes"),
  status: programStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const programItems = pgTable("program_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  programId: uuid("program_id")
    .notNull()
    .references(() => programs.id, { onDelete: "cascade" }),
  exerciseId: uuid("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "restrict" }),
  position: integer("position").notNull().default(0),
  dayLabel: text("day_label"),
  sets: text("sets"),
  reps: text("reps"),
  tempo: text("tempo"),
  rest: text("rest"),
  notes: text("notes"),
});

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  kind: noteKindEnum("kind").notNull().default("consult"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type ProgramItem = typeof programItems.$inferSelect;
export type Note = typeof notes.$inferSelect;
