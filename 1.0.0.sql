CREATE TABLE public.users (
  name VARCHAR NOT NULL, 
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB,
  id SERIAL PRIMARY KEY
);
