# Changelog

All notable changes to the QuickCals project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2023-05-18

### Added

- Supabase integration for backend functionality
  - Created database schema with types for user profiles, meals, weight logs, and chat messages
  - Implemented Row Level Security (RLS) policies for data protection
  - Set up authentication flows with Supabase Auth
- API Routes implementation
  - Authentication endpoints for login, register and logout
  - User profile management endpoints
  - BMR calculation endpoint with personalized nutrition targets
  - Weight tracking with CRUD operations
  - Meal logging with CRUD operations and date filtering
  - AI nutrition assistant using OpenAI
  - Chat history retrieval
- Database utilities
  - User profile CRUD operations
  - Weight logs management
  - Meal tracking functions
  - Chat messaging functions
- Environment setup
  - Example environment variables
  - Comprehensive README with setup instructions 