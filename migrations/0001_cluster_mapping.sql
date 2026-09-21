CREATE TABLE IF NOT EXISTS cluster_mapping (
  location TEXT PRIMARY KEY,
  cluster TEXT NOT NULL,
  updated_at TEXT NOT NULL
);