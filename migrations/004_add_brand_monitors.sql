-- Migration: Weekly brand monitoring
-- Date: 2026-10-26
-- Description: brand_monitors table (one row per brand being re-analyzed on a schedule)
-- and brand_analyses.monitor_id to link each scheduled run back to its monitor.
-- Safe to run more than once.

CREATE TABLE IF NOT EXISTS "brand_monitors" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" text NOT NULL,
    "url" text NOT NULL,
    "company_name" text,
    "company" jsonb NOT NULL,
    "competitors" jsonb,
    "prompts" jsonb,
    "frequency" text NOT NULL DEFAULT 'weekly',
    "active" boolean NOT NULL DEFAULT true,
    "paused_reason" text,
    "next_run_at" timestamp NOT NULL,
    "last_run_at" timestamp,
    "last_analysis_id" uuid,
    "failure_count" integer NOT NULL DEFAULT 0,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "brand_monitors_user_id_idx" ON "brand_monitors" ("user_id");
CREATE INDEX IF NOT EXISTS "brand_monitors_due_idx" ON "brand_monitors" ("active", "next_run_at");

ALTER TABLE "brand_analyses" ADD COLUMN IF NOT EXISTS "monitor_id" uuid;
CREATE INDEX IF NOT EXISTS "brand_analyses_monitor_id_idx" ON "brand_analyses" ("monitor_id");
