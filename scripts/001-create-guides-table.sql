-- Create the guides table
CREATE TABLE IF NOT EXISTS guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  game_name TEXT NOT NULL,
  guide_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
