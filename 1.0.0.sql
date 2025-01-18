CREATE TABLE public.users (
  name VARCHAR NOT NULL, -- name = firstName + lastName
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB,
  id SERIAL PRIMARY KEY
);
