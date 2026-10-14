# New Session Instructions for Copilot and Claude

These instructions apply to both GitHub Copilot and Claude when starting a new session in this repository.

## Project Scope

- This project is a frontend application with mock data only.
- There is no real backend, database, authentication, API server, or deployment service.
- The `Backend/` folder is for static mock data and supporting local data files only.
- The repository may begin empty. References to folders such as `Frontend/`, `Backend/`, `pages/`, `components/`, `services/`, and `data/` are expected structure guidance, even if those folders do not exist yet.

## Access and Editing Permissions

- Both agents may read repository files, including `.github/`, to understand project requirements and structure.
- Implementation work should be limited to the expected project folders once they are created.
- The intended structure is:
  - `Frontend/` for UI code, pages, reusable components, and service-layer utilities.
  - `Backend/` for mock data files and any local static data used by the frontend.
- Do not write or edit files outside the expected project structure unless the user explicitly grants permission.
- Reading code, searching the repository, and running relevant validation commands are allowed before approval, but implementation changes are not.

## Required New-Session Workflow

When the user gives a prompt, complete the following steps before writing or editing implementation code:

1. Briefly restate the requested change and the current understanding of the problem in the conversation window. Include a concise explanation of the reasoning or approach being considered; do not present private hidden chain-of-thought.
2. Inspect the relevant repository context, including applicable files under `.github/`, and identify the code path, tests, or documentation that matters.
3. Provide a report containing:
   - The proposed plan.
   - The files planned for editing or adding.
   - Any discrepancies between the user's prompt and the instructions or guidance found in the `.github/` folder at the repository root.
   - Any questions, assumptions, or decisions that require the user's input.
4. Stop and wait for the user's feedback on every discrepancy and question, plus any additional notes.
5. Do not write implementation code, modify implementation files, or add files until the user explicitly approves starting the work. Approval may be given after the report or in a later message that clearly says the agent is allowed to write code.
6. After approval, implement the agreed plan within the expected project directories, validate the changes, and report what was changed and what checks were run.

## Approval Rule

A report is not approval. Until explicit approval is received, agents must remain in analysis and repository-inspection mode and must not make implementation edits.

## Frontend Guidance

- The frontend should be organized around reusable components, page-level files, and supporting services.
- Reusable UI logic should live in `Frontend/components/` and `Frontend/services/` when those folders exist.
- Page files should be clearly named and kept focused on rendering and composition.
- The application should remain visually consistent across pages.
- Before creating a new frontend component, the agent should check whether a similar component already exists and reuse it when possible.

## Data and Backend Guidance

- `Backend/data/` is the project’s mock-data layer.
- Data should be static and representative of realistic transactions, categories, accounts, and spending patterns.
- The frontend should consume the mock data directly without any backend API layer.
- There should be no server-side business logic, database layer, or API endpoint implementation in this project unless the user explicitly requests one later.
