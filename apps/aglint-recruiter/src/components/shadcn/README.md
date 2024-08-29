# ShadCN UI / v0

## Overview

This directory holds the [ShadCN UI](https://ui.shadcn.com/) / [v0](https://v0.dev/) components. All ShadCN components are structured under the `/src/components/shadcn` directory. To ensure consistency and maintainability, we have specific guidelines for working with these components.

## Directory Structure

```bash
/src
└── /components
    └── /shadcn
        └── /ui # Directory for auto-generated ShaCN 'UI' components
            └── uiComponent.tsx # An auto-generated ShaCN 'UI' component
        └── customComponent.tsx # Custom components derived from  ShadCN 'UI' components
```

### `/src/components/shadcn/ui`

- **Purpose**: This folder contains all the auto-generated components from ShadCN UI.
- **Management**: Components here are managed exclusively via the CLI. **Do not manually modify any files in this directory.**
- **How to Add a Component**:
  - Run the following command to add a new component:
    ```bash
    npm run shadcn <component>
    ```
    or
    ```bash
    npx shadcn-ui@latest add <component>
    ```
  - The CLI will automatically generate the component and place it in this folder.

### `/src/components/shadcn`

- **Purpose**: This folder contains custom components that combine one or more ShadCN UI / v0 components.
- **Management**: Feel free to create or modify components here as needed. This is where you should implement any logic that combines ShadCN components into reusable patterns.

## v0 Usage

- v0 components is considered as custom component and must be placed under `/src/components/shadcn`
  - Run the following command to add a new v0 components:
    ```bash
    npm run v0 <component>
    ```
    or
    ```bash
    npx v0@latest add <component>
    ```
  - The CLI will automatically generate the component and place it in `/src/components/shadcn`.

## Rules and Guidelines

1. **Do Not Modify**:

   - Never manually edit any files inside `/shadcn/ui`.
   - All updates to ShadCN UI components should be done through the CLI commands provided.

2. **Use CLI for New Components**:
   - Use the following commands to add new ShadCN components:
     ```bash
     npm run shadcn <component>
     ```
     or
     ```bash
     npx shadcn-ui@latest add <component>
     ```
   - Use the following commands to add new v0 components:
     ```bash
     npm run v0 <component>
     ```
     or
     ```bash
     npx v0@latest add <component>
     ```
3. **Custom Components**:

   - When you need to combine ShadCN components, create a new file inside `/shadcn`.

4. **Component Usage**:
   - All developers can import and use either components from `/shadcn` or `/shadcn/ui` in the application code.
