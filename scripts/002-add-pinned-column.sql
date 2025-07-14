-- Add a column to track which guides are pinned to the top section
ALTER TABLE guides
ADD COLUMN is_pinned BOOLEAN NOT NULL DEFAULT false;
