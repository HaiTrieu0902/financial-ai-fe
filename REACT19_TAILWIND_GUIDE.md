# React 19 + Tailwind CSS Integration Guide

This project now uses React 19 with Tailwind CSS alongside Material-UI for a powerful and flexible styling approach.

## What's New

### React 19 Features

- **React Compiler**: Optimized rendering and better performance
- **Actions**: Simplified form handling and server interactions
- **Enhanced Suspense**: Better loading states and streaming
- **New Hooks**: `use()`, `useActionState()`, `useOptimistic()`

### Tailwind CSS Integration

- **Utility-First**: Rapid UI development with utility classes
- **Custom Design System**: Extended color palette and animations
- **Material-UI Compatible**: Tailwind works alongside MUI components
- **Responsive Design**: Mobile-first responsive utilities

## Usage Examples

### 1. Hybrid Approach (Recommended)

Combine Material-UI components with Tailwind utilities:

```tsx
import { Button } from '@mui/material';

function HybridButton() {
  return (
    <Button variant="contained" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-300">
      Hybrid Button
    </Button>
  );
}
```

### 2. Pure Tailwind Components

For custom components where you need full control:

```tsx
function CustomCard({ children }) {
  return <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">{children}</div>;
}
```

### 3. Utility Helper

Use the `cn()` utility for combining classes:

```tsx
import { cn } from '@/utils/cn';

function ConditionalComponent({ isActive, className }) {
  return <div className={cn('base-styles', isActive && 'active-styles', className)}>Content</div>;
}
```

## Available Utilities

### Custom Colors

- `bg-primary-600` - Main brand color
- `text-primary-700` - Darker brand color
- `bg-gradient-to-r from-blue-600 to-purple-600` - Brand gradient

### Animations

- `animate-fade-in` - Smooth fade in effect
- `animate-slide-up` - Slide up from bottom
- `animate-bounce-in` - Bounce in effect
- `hover:scale-105` - Hover scale effect

### Common Patterns

```tsx
// Card with hover effect
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200">

// Button with gradient
<button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300">

// Container with responsive padding
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## File Structure

```
src/
├── components/
│   ├── HybridComponents.tsx     # Example hybrid components
│   ├── auth/
│   │   ├── LoginForm.tsx        # Original MUI form
│   │   └── ModernLoginForm.tsx  # Modern hybrid form
├── utils/
│   └── cn.ts                    # Class utility functions
└── app/[lang]/globals.css       # Tailwind directives + custom styles
```

## Configuration Files

### tailwind.config.js

- Custom color palette based on Material-UI
- Extended animations and utilities
- `preflight: false` to avoid conflicts with MUI

### postcss.config.js

- PostCSS configuration for Tailwind
- Autoprefixer for browser compatibility

## Best Practices

### 1. When to Use What

- **Material-UI**: Complex components (DataGrid, DatePicker, Autocomplete)
- **Tailwind**: Layout, spacing, colors, simple styling
- **Hybrid**: MUI structure with Tailwind styling

### 2. Performance Tips

- Use `cn()` utility for conditional classes
- Leverage Tailwind's JIT compiler for optimal bundle size
- Use React 19's compiler for automatic optimization

### 3. Responsive Design

```tsx
// Mobile-first responsive classes
<div className="px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
```

### 4. Dark Mode Ready

```tsx
// Dark mode classes (when implemented)
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

## React 19 Specific Features

### Actions (for forms)

```tsx
'use client';
import { useActionState } from 'react';

function LoginForm() {
  const [state, submitAction] = useActionState(loginAction, { error: null });

  return <form action={submitAction}>{/* form fields */}</form>;
}
```

### Optimistic Updates

```tsx
import { useOptimistic } from 'react';

function MessageList({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state, newMessage) => [...state, newMessage]);

  // UI with optimistic updates
}
```

## Migration Notes

### From React 18 to 19

- Update `@types/react` and `@types/react-dom` to v19
- Remove React 18 specific workarounds
- Consider using new React 19 APIs for better UX

### Installing Dependencies

```bash
npm install
# This will install React 19, Tailwind CSS, and all utilities
```

### Building and Running

```bash
npm run dev     # Development server
npm run build   # Production build
npm run start   # Production server
```

## Examples in the Codebase

Check out these files for implementation examples:

- `src/components/HybridComponents.tsx` - Various hybrid patterns
- `src/components/auth/ModernLoginForm.tsx` - Modern form with animations
- `src/utils/cn.ts` - Utility functions and common styles

## Troubleshooting

### Tailwind Classes Not Working

- Ensure PostCSS is configured correctly
- Check that file paths are included in `tailwind.config.js`
- Verify Tailwind directives are in `globals.css`

### Style Conflicts with Material-UI

- Use `preflight: false` in Tailwind config
- Use the `cn()` utility to merge classes properly
- Prefer Tailwind for layout, MUI for complex components
