-- ============================================
-- CodeConnects Seed Data
-- Realistic sample data for development/demo
-- ============================================
-- All passwords are: Password123!
-- bcrypt hash for "Password123!" (10 rounds)
-- ============================================

USE codeconnects;

-- ============================================
-- USERS (10 developer profiles)
-- ============================================
INSERT INTO users (name, email, password, bio, profile_image, skills, github_url, linkedin_url) VALUES
('Alex Rivera', 'alex@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Full-stack developer passionate about building scalable web applications. Love working with React and Node.js. Open source contributor and coffee enthusiast.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', 'React,Node.js,TypeScript,PostgreSQL,Docker,AWS', 'https://github.com/alexrivera', 'https://linkedin.com/in/alexrivera'),

('Samantha Chen', 'samantha@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Frontend engineer specializing in React and design systems. Building beautiful, accessible web experiences. Speaker at ReactConf 2025.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha', 'React,Vue.js,CSS,Figma,Storybook,Jest', 'https://github.com/samchen', 'https://linkedin.com/in/samanthachen'),

('Marcus Johnson', 'marcus@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Backend developer focused on microservices and cloud architecture. Java and Python expert. Currently exploring Rust for systems programming.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', 'Java,Python,Spring Boot,Kubernetes,MySQL,Redis', 'https://github.com/marcusjohnson', 'https://linkedin.com/in/marcusjohnson'),

('Priya Patel', 'priya@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Data engineer and ML enthusiast. Love turning data into actionable insights. Building data pipelines and training models by day, contributing to open source by night.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', 'Python,TensorFlow,SQL,Spark,Airflow,GCP', 'https://github.com/priyapatel', 'https://linkedin.com/in/priyapatel'),

('Jordan Williams', 'jordan@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Mobile developer building cross-platform apps with React Native and Flutter. Previously at a fintech startup. Passionate about clean code and great UX.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', 'React Native,Flutter,Dart,JavaScript,Firebase,Swift', 'https://github.com/jordanwilliams', 'https://linkedin.com/in/jordanwilliams'),

('Elena Rodriguez', 'elena@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'DevOps engineer automating everything. Kubernetes, Terraform, and CI/CD pipelines are my jam. Advocate for infrastructure as code and GitOps workflows.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', 'Docker,Kubernetes,Terraform,AWS,Jenkins,Linux', 'https://github.com/elenarodriguez', 'https://linkedin.com/in/elenarodriguez'),

('David Kim', 'david@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Security-focused software engineer. Building secure applications and finding vulnerabilities. CTF player and bug bounty hunter in my spare time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', 'Python,Go,Cybersecurity,Penetration Testing,Linux,Cryptography', 'https://github.com/davidkim', 'https://linkedin.com/in/davidkim'),

('Aisha Thompson', 'aisha@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'UI/UX designer turned frontend developer. Bridging the gap between design and code. Creating pixel-perfect, accessible interfaces with a focus on user delight.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha', 'HTML,CSS,JavaScript,React,Figma,Adobe XD', 'https://github.com/aishathompson', 'https://linkedin.com/in/aishathompson'),

('Ryan O''Brien', 'ryan@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Game developer and creative coder. Working with Unity and Unreal Engine. Love building interactive experiences and exploring WebGL for the browser.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan', 'C#,Unity,C++,Unreal Engine,WebGL,Three.js', 'https://github.com/ryanobrien', 'https://linkedin.com/in/ryanobrien'),

('Nina Kowalski', 'nina@codeconnects.dev', '$2a$10$kD4uYf1lQQaFv9x0wkP.pecXp1tTrrm2wU.8xaD4PORzPQbEpYNpm', 'Full-stack developer with a passion for education technology. Building platforms that make learning accessible. Mentor at local coding bootcamps.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina', 'React,Node.js,MongoDB,Express,GraphQL,Next.js', 'https://github.com/ninakowalski', 'https://linkedin.com/in/ninakowalski');

-- ============================================
-- POSTS (20+ realistic developer posts)
-- ============================================
INSERT INTO posts (user_id, content, created_at) VALUES
(1, 'Just deployed my first microservice architecture using Docker and Kubernetes! The learning curve was steep but totally worth it. Here''s what I learned about container orchestration... 🚀', NOW() - INTERVAL 14 DAY),
(2, 'Hot take: CSS Grid has completely replaced Flexbox for me in most layout scenarios. The ability to define both rows and columns simultaneously is a game-changer. What''s your preferred layout method?', NOW() - INTERVAL 13 DAY),
(3, 'Spent the weekend optimizing database queries at work. Reduced our main dashboard load time from 8 seconds to 400ms just by adding proper indexes and rewriting a few JOINs. Never underestimate the power of query optimization! 💪', NOW() - INTERVAL 12 DAY),
(4, 'Excited to share that my machine learning model for predicting code review outcomes just hit 94% accuracy! Built with TensorFlow and trained on our internal dataset. Paper coming soon.', NOW() - INTERVAL 11 DAY),
(5, 'React Native vs Flutter in 2026 — I''ve built production apps with both. Here''s my honest take: Flutter wins on consistency and performance, React Native wins on ecosystem and hiring. Choose based on your team''s strengths.', NOW() - INTERVAL 10 DAY),
(6, 'Automated our entire CI/CD pipeline today. From commit to production in under 5 minutes with zero manual intervention. Terraform + GitHub Actions + ArgoCD is the dream team. 🔥', NOW() - INTERVAL 9 DAY),
(7, 'Found a critical XSS vulnerability in a popular npm package today. Responsible disclosure sent. This is why we need to audit our dependencies regularly. Stay safe out there, devs!', NOW() - INTERVAL 8 DAY),
(8, 'Just redesigned our company''s design system from scratch. 47 components, full accessibility compliance, dark mode support, and comprehensive Storybook documentation. Took 3 months but it was worth every minute.', NOW() - INTERVAL 7 DAY),
(9, 'Built a real-time multiplayer game using WebSockets and Three.js this weekend. Nothing fancy, just a simple physics sandbox, but seeing multiple players interact in 3D space in the browser is magical. ✨', NOW() - INTERVAL 6 DAY),
(10, 'Mentored my first bootcamp cohort today. Watching beginners have their "aha moment" with recursion never gets old. Teaching is the best way to deepen your own understanding.', NOW() - INTERVAL 5 DAY),
(1, 'Tip for junior developers: Don''t just learn syntax, learn patterns. Understanding MVC, Observer, Factory, and Strategy patterns will make you a 10x better developer regardless of the language you use.', NOW() - INTERVAL 4 DAY),
(2, 'Accessibility is not optional. Just spent a week making our app screen-reader compatible and the amount of issues I found was eye-opening. Start with semantic HTML and ARIA labels — it''s easier than you think.', NOW() - INTERVAL 3 DAY),
(3, 'Question for the community: What''s your go-to approach for handling database migrations in production? We''re currently using Flyway but exploring alternatives. Looking for something that plays well with MySQL.', NOW() - INTERVAL 2 DAY),
(4, 'Just published my first technical blog post on Medium! It covers how to build a real-time data pipeline with Apache Kafka and Python. Would love your feedback! 📝', NOW() - INTERVAL 1 DAY),
(5, 'Completed the Advent of Code challenge this year using Dart! Great way to learn a new language while solving fun puzzles. Already looking forward to next year.', NOW() - INTERVAL 12 HOUR),
(6, 'Infrastructure as Code is not just a buzzword — it''s saved our team countless hours. If you''re still manually configuring servers, do yourself a favor and learn Terraform. Your future self will thank you.', NOW() - INTERVAL 8 HOUR),
(7, 'Unpopular opinion: Most "10x developers" are actually just developers who write better tests. Comprehensive test coverage gives you confidence to refactor aggressively and ship faster.', NOW() - INTERVAL 6 HOUR),
(8, 'Pro tip: Use CSS custom properties (variables) for theming. Combined with prefers-color-scheme media query, you can implement dark mode in under 30 lines of CSS. No JavaScript required! 🌙', NOW() - INTERVAL 4 HOUR),
(9, 'Just open-sourced my WebGL particle system library! Check it out on GitHub. It supports instanced rendering for up to 1 million particles at 60fps. Feedback welcome!', NOW() - INTERVAL 2 HOUR),
(10, 'Remember: The best code is the code you don''t write. Before building a custom solution, check if there''s a well-maintained open-source alternative. Your time is valuable. ⏰', NOW() - INTERVAL 1 HOUR);

-- ============================================
-- PROJECTS (10+ portfolio projects)
-- ============================================
INSERT INTO projects (user_id, title, description, technologies, github_url, live_url, image_url) VALUES
(1, 'CloudDeploy', 'A one-click deployment platform for containerized applications. Supports Docker Compose and Kubernetes manifests with automatic SSL certificate provisioning.', 'React,Node.js,Docker,Kubernetes,PostgreSQL', 'https://github.com/alexrivera/clouddeploy', 'https://clouddeploy.demo.dev', 'https://placehold.co/600x400/1a1a2e/7c3aed?text=CloudDeploy'),
(1, 'DevMetrics', 'Analytics dashboard for development teams. Tracks code quality, deployment frequency, and team velocity using data from GitHub, Jira, and CI/CD pipelines.', 'React,D3.js,Express,MySQL,Redis', 'https://github.com/alexrivera/devmetrics', 'https://devmetrics.demo.dev', 'https://placehold.co/600x400/1a1a2e/06b6d4?text=DevMetrics'),
(2, 'DesignKit', 'Open-source React component library with 50+ accessible, themeable components. Built with TypeScript and documented in Storybook.', 'React,TypeScript,Storybook,CSS,Jest', 'https://github.com/samchen/designkit', 'https://designkit.demo.dev', 'https://placehold.co/600x400/1a1a2e/f59e0b?text=DesignKit'),
(3, 'QueryOptimizer', 'A tool that analyzes MySQL queries and suggests optimizations. Identifies missing indexes, inefficient JOINs, and provides rewrite suggestions.', 'Java,Spring Boot,MySQL,React,Docker', 'https://github.com/marcusjohnson/queryoptimizer', 'https://queryopt.demo.dev', 'https://placehold.co/600x400/1a1a2e/10b981?text=QueryOptimizer'),
(4, 'DataFlow', 'Visual data pipeline builder with drag-and-drop interface. Connect data sources, apply transformations, and visualize results in real-time.', 'Python,React,Apache Kafka,Redis,Docker', 'https://github.com/priyapatel/dataflow', 'https://dataflow.demo.dev', 'https://placehold.co/600x400/1a1a2e/ec4899?text=DataFlow'),
(5, 'FitTrack', 'Cross-platform fitness tracking app with social features. Track workouts, set goals, and compete with friends on leaderboards.', 'React Native,Node.js,MongoDB,Firebase,Redux', 'https://github.com/jordanwilliams/fittrack', NULL, 'https://placehold.co/600x400/1a1a2e/8b5cf6?text=FitTrack'),
(6, 'InfraWatch', 'Real-time infrastructure monitoring dashboard. Collects metrics from Prometheus, displays alerts, and provides automated incident response workflows.', 'Go,React,Prometheus,Grafana,Kubernetes', 'https://github.com/elenarodriguez/infrawatch', 'https://infrawatch.demo.dev', 'https://placehold.co/600x400/1a1a2e/ef4444?text=InfraWatch'),
(7, 'SecureVault', 'Password manager with end-to-end encryption. Features include password generation, breach detection, and secure sharing between team members.', 'Python,React,SQLite,Cryptography,Docker', 'https://github.com/davidkim/securevault', 'https://securevault.demo.dev', 'https://placehold.co/600x400/1a1a2e/14b8a6?text=SecureVault'),
(8, 'PixelPerfect', 'Browser extension that overlays design mockups on live websites for pixel-perfect comparison. Supports Figma and Sketch file imports.', 'JavaScript,Chrome API,React,Canvas API,CSS', 'https://github.com/aishathompson/pixelperfect', NULL, 'https://placehold.co/600x400/1a1a2e/f97316?text=PixelPerfect'),
(9, 'VoxelWorld', 'Browser-based voxel engine built with WebGL. Features procedural terrain generation, real-time lighting, and multiplayer support via WebSockets.', 'JavaScript,WebGL,Three.js,Node.js,WebSockets', 'https://github.com/ryanobrien/voxelworld', 'https://voxelworld.demo.dev', 'https://placehold.co/600x400/1a1a2e/6366f1?text=VoxelWorld'),
(10, 'LearnPath', 'Adaptive learning platform that creates personalized coding curricula based on skill assessments. Includes interactive coding challenges and progress tracking.', 'React,Node.js,MongoDB,Express,TensorFlow.js', 'https://github.com/ninakowalski/learnpath', 'https://learnpath.demo.dev', 'https://placehold.co/600x400/1a1a2e/a855f7?text=LearnPath');

-- ============================================
-- COMMENTS (30+ comments)
-- ============================================
INSERT INTO comments (post_id, user_id, content, created_at) VALUES
(1, 2, 'Congrats Alex! Docker + K8s is such a powerful combo. Did you use Helm charts for your deployments?', NOW() - INTERVAL 13 DAY),
(1, 3, 'Great work! I remember my first microservice migration — it''s a game changer for scalability.', NOW() - INTERVAL 13 DAY),
(1, 6, 'Nice! If you need help with the CI/CD side of things, happy to share our ArgoCD setup.', NOW() - INTERVAL 12 DAY),
(2, 1, 'Interesting take! I still use Flexbox for one-dimensional layouts but Grid for anything 2D. They complement each other well.', NOW() - INTERVAL 12 DAY),
(2, 8, 'Totally agree! Grid + subgrid is going to be amazing once it has full browser support.', NOW() - INTERVAL 12 DAY),
(3, 1, 'The power of proper indexing! 20x improvement is insane. Would love to see a blog post about this.', NOW() - INTERVAL 11 DAY),
(3, 4, 'Database optimization is underrated. Most devs jump to caching before even looking at their queries.', NOW() - INTERVAL 11 DAY),
(4, 3, 'That accuracy is impressive! What features did you use for the model? Commit history, file changes?', NOW() - INTERVAL 10 DAY),
(4, 10, 'This could be incredibly useful for open source maintainers. Would love to test it on our repos!', NOW() - INTERVAL 10 DAY),
(5, 1, 'Great comparison! We went with React Native because our team already knew React. No regrets so far.', NOW() - INTERVAL 9 DAY),
(5, 9, 'Flutter''s hot reload is unbeatable though. Makes iteration so much faster during development.', NOW() - INTERVAL 9 DAY),
(6, 3, 'Zero manual intervention is the dream. How do you handle database migrations in the pipeline?', NOW() - INTERVAL 8 DAY),
(6, 7, 'Make sure your pipeline includes security scanning! A fast pipeline that ships vulnerabilities is worse than a slow one.', NOW() - INTERVAL 8 DAY),
(7, 6, 'This is why software supply chain security is so important. Thanks for the responsible disclosure!', NOW() - INTERVAL 7 DAY),
(7, 3, 'npm audit should be part of every CI pipeline. Good catch, David!', NOW() - INTERVAL 7 DAY),
(8, 2, 'A complete design system in 3 months? That''s impressive! Did you use Figma tokens for the design-to-code workflow?', NOW() - INTERVAL 6 DAY),
(8, 5, 'Accessibility compliance is huge. Kudos for making it a priority from the start!', NOW() - INTERVAL 6 DAY),
(9, 1, 'WebSockets + Three.js is such a fun combo! Did you handle physics on the server or client side?', NOW() - INTERVAL 5 DAY),
(9, 5, 'This sounds amazing! Any plans to open-source it?', NOW() - INTERVAL 5 DAY),
(10, 8, 'Teaching recursion is an art. I always start with the Russian nesting dolls analogy. Works every time!', NOW() - INTERVAL 4 DAY),
(10, 4, 'Mentoring is so rewarding. I''ve learned more from teaching than from any course I''ve taken.', NOW() - INTERVAL 4 DAY),
(11, 3, 'Design patterns changed the way I think about code. Factory and Strategy are my most-used patterns.', NOW() - INTERVAL 3 DAY),
(11, 10, 'I''d add SOLID principles to that list too. They go hand-in-hand with design patterns.', NOW() - INTERVAL 3 DAY),
(12, 8, 'Thank you for saying this! Accessibility is everyone''s responsibility, not just the design team''s.', NOW() - INTERVAL 2 DAY),
(12, 1, 'Semantic HTML is the foundation. So many devs use divs for everything when there are perfectly good nav, main, and article elements.', NOW() - INTERVAL 2 DAY),
(13, 6, 'We use Liquibase. It integrates well with Spring Boot and supports rollbacks. Worth a look!', NOW() - INTERVAL 1 DAY),
(13, 1, 'Have you tried Prisma Migrate? It''s great for Node.js projects, though for MySQL specifically Flyway is solid.', NOW() - INTERVAL 1 DAY),
(14, 2, 'Shared and bookmarked! Real-time data pipelines are a topic I want to learn more about.', NOW() - INTERVAL 12 HOUR),
(15, 9, 'Dart is underrated! Great choice for Advent of Code. The collection methods are so clean.', NOW() - INTERVAL 6 HOUR),
(16, 7, 'Terraform is life-changing. Once you go IaC, you never go back to clicking around in the console.', NOW() - INTERVAL 4 HOUR),
(17, 2, 'Not unpopular at all! Tests give you the confidence to move fast. Totally agree with this.', NOW() - INTERVAL 3 HOUR),
(18, 1, 'CSS custom properties are amazing! Combined with container queries, you can build incredibly responsive components.', NOW() - INTERVAL 2 HOUR);

-- ============================================
-- LIKES (40+ likes)
-- ============================================
INSERT INTO likes (post_id, user_id) VALUES
(1, 2), (1, 3), (1, 4), (1, 6), (1, 10),
(2, 1), (2, 3), (2, 8), (2, 5),
(3, 1), (3, 2), (3, 4), (3, 6), (3, 7), (3, 10),
(4, 1), (4, 2), (4, 3), (4, 10),
(5, 1), (5, 2), (5, 9),
(6, 1), (6, 3), (6, 7), (6, 4),
(7, 3), (7, 6), (7, 1), (7, 2), (7, 5), (7, 8),
(8, 2), (8, 5), (8, 1),
(9, 1), (9, 5), (9, 10),
(10, 4), (10, 8), (10, 1), (10, 2),
(11, 3), (11, 10), (11, 2),
(12, 8), (12, 5), (12, 1),
(14, 2), (14, 10),
(17, 2), (17, 6), (17, 1),
(18, 1), (18, 2),
(19, 1), (19, 5),
(20, 1), (20, 4), (20, 8);

-- ============================================
-- CONNECTIONS (20+ follow relationships)
-- ============================================
INSERT INTO connections (follower_id, following_id) VALUES
(1, 2), (1, 3), (1, 4), (1, 6),
(2, 1), (2, 3), (2, 8),
(3, 1), (3, 2), (3, 4), (3, 6), (3, 7),
(4, 1), (4, 3), (4, 10),
(5, 1), (5, 2), (5, 9),
(6, 1), (6, 3), (6, 7),
(7, 3), (7, 6),
(8, 2), (8, 1), (8, 5),
(9, 1), (9, 5),
(10, 1), (10, 4), (10, 8);
