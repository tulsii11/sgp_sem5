-- ============================================================
-- Seed: seed_skills.sql
-- Description: Minimal reference skills for the skills taxonomy
-- NOTE: This is REFERENCE DATA ONLY — no fake users or records.
-- ============================================================

INSERT INTO public.skills (name, category, normalized_name) VALUES
  -- Programming Languages
  ('Python', 'Programming Language', 'python'),
  ('JavaScript', 'Programming Language', 'javascript'),
  ('TypeScript', 'Programming Language', 'typescript'),
  ('Java', 'Programming Language', 'java'),
  ('C++', 'Programming Language', 'c++'),
  ('C', 'Programming Language', 'c'),
  ('C#', 'Programming Language', 'c#'),
  ('Go', 'Programming Language', 'go'),
  ('Rust', 'Programming Language', 'rust'),
  ('PHP', 'Programming Language', 'php'),
  ('Ruby', 'Programming Language', 'ruby'),
  ('Swift', 'Programming Language', 'swift'),
  ('Kotlin', 'Programming Language', 'kotlin'),
  ('R', 'Programming Language', 'r'),
  ('SQL', 'Programming Language', 'sql'),

  -- Frontend
  ('React', 'Frontend', 'react'),
  ('Angular', 'Frontend', 'angular'),
  ('Vue.js', 'Frontend', 'vue.js'),
  ('Next.js', 'Frontend', 'next.js'),
  ('HTML', 'Frontend', 'html'),
  ('CSS', 'Frontend', 'css'),
  ('Tailwind CSS', 'Frontend', 'tailwind css'),
  ('Bootstrap', 'Frontend', 'bootstrap'),

  -- Backend
  ('Node.js', 'Backend', 'node.js'),
  ('Express.js', 'Backend', 'express.js'),
  ('Django', 'Backend', 'django'),
  ('Flask', 'Backend', 'flask'),
  ('FastAPI', 'Backend', 'fastapi'),
  ('Spring Boot', 'Backend', 'spring boot'),
  ('ASP.NET', 'Backend', 'asp.net'),

  -- Database
  ('PostgreSQL', 'Database', 'postgresql'),
  ('MySQL', 'Database', 'mysql'),
  ('MongoDB', 'Database', 'mongodb'),
  ('Redis', 'Database', 'redis'),
  ('Firebase', 'Database', 'firebase'),
  ('Supabase', 'Database', 'supabase'),

  -- DevOps & Cloud
  ('Docker', 'DevOps', 'docker'),
  ('Kubernetes', 'DevOps', 'kubernetes'),
  ('AWS', 'Cloud', 'aws'),
  ('Azure', 'Cloud', 'azure'),
  ('Google Cloud', 'Cloud', 'google cloud'),
  ('Git', 'DevOps', 'git'),
  ('CI/CD', 'DevOps', 'ci/cd'),
  ('Linux', 'DevOps', 'linux'),

  -- AI / ML / Data
  ('Machine Learning', 'AI/ML', 'machine learning'),
  ('Deep Learning', 'AI/ML', 'deep learning'),
  ('TensorFlow', 'AI/ML', 'tensorflow'),
  ('PyTorch', 'AI/ML', 'pytorch'),
  ('scikit-learn', 'AI/ML', 'scikit-learn'),
  ('Natural Language Processing', 'AI/ML', 'natural language processing'),
  ('Computer Vision', 'AI/ML', 'computer vision'),
  ('Data Analysis', 'Data', 'data analysis'),
  ('Pandas', 'Data', 'pandas'),
  ('NumPy', 'Data', 'numpy'),

  -- Mobile
  ('React Native', 'Mobile', 'react native'),
  ('Flutter', 'Mobile', 'flutter'),
  ('Android', 'Mobile', 'android'),
  ('iOS', 'Mobile', 'ios')

ON CONFLICT (normalized_name) DO NOTHING;
