CREATE TABLE leagues (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  visibility text NOT NULL,
  timezone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE questions (
  id uuid PRIMARY KEY,
  league_id uuid NOT NULL REFERENCES leagues(id),
  prompt text NOT NULL,
  options_json jsonb NOT NULL,
  lock_at timestamptz NOT NULL,
  reveal_at timestamptz NOT NULL,
  points integer NOT NULL CHECK(points > 0),
  CHECK(lock_at < reveal_at)
);
CREATE TABLE pick_submissions (
  id uuid PRIMARY KEY,
  question_id uuid NOT NULL REFERENCES questions(id),
  player_id uuid NOT NULL,
  revision integer NOT NULL,
  answer_json jsonb NOT NULL,
  receipt_hash text NOT NULL,
  submitted_at timestamptz NOT NULL,
  UNIQUE(question_id, player_id, revision)
);
CREATE TABLE score_events (
  id uuid PRIMARY KEY,
  question_id uuid NOT NULL REFERENCES questions(id),
  player_id uuid NOT NULL,
  event_type text NOT NULL,
  points integer NOT NULL,
  related_event_id uuid REFERENCES score_events(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

