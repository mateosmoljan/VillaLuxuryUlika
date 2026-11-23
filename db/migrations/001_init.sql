-- Neon (free) schema. The app also creates this table on first use when DATABASE_URL is set.
CREATE TABLE IF NOT EXISTS site_state (
  id integer PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
