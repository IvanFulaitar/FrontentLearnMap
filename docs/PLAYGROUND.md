# Playground Architecture

The coding experience lives in `src/features/playground`. Lesson pages use the thin `CodePractice` adapter, while the feature owns editor state, persistence, preview rendering and extension points.

## Components

- `Playground` composes the complete practice surface.
- `PlaygroundProvider` stores files, active tab, editor settings, cursor position and console output.
- `MonacoCodeEditor` lazy-loads `@monaco-editor/react`.
- `EditorTabs`, `FileExplorer`, `EditorToolbar` and `EditorStatusBar` provide reusable editor chrome.
- `Preview`, `ConsolePanel`, `OutputPanel` and `HintPanel` render execution feedback.

## Supported Files

Lessons can provide files in these languages:

- `html`
- `css`
- `javascript`
- `typescript`
- `tsx`
- `json`
- `markdown`
- `bash`

Each file should include `language`, `label`, `code`, and preferably a stable `path`. Optional `readOnly` files are shown but cannot be edited.

```ts
starterCode: [
  {
    path: "src/App.tsx",
    label: "App.tsx",
    language: "tsx",
    code: "export function App() {\n  return <h1>Hello</h1>;\n}",
  },
]
```

## Persistence

Playground state is autosaved to `localStorage` per lesson:

- files
- active file
- cursor position
- editor settings

Reset restores the lesson starter files.

## Execution

The current browser adapter can run HTML/CSS/JavaScript in an iframe preview and captures basic console messages through an injected script. The TSX adapter currently keeps a stable abstraction and returns guidance output until a runtime such as Sandpack, StackBlitz, CodeSandbox or WebContainer is connected.

Adapters implement this shape:

```ts
interface PlaygroundAdapter {
  id: string;
  run: (files: PlaygroundFile[]) => Promise<{
    previewDocument: string;
    messages: ConsoleMessage[];
    output: string;
  }>;
}
```

## Shortcuts

- `Ctrl+Enter` runs the current playground.
- `Ctrl+S` keeps focus and relies on autosave.
- `Ctrl+/` toggles a simple line comment for the active file.
- `F11` toggles fullscreen.
- `Escape` clears console output.

## Future Runtime Integration

To add a real React runtime, implement a new adapter in `src/features/playground/services/adapters.ts` and route `tsx` mode to it. The UI, lesson contract and persisted state do not need to change.
