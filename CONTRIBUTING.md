# Contributing to SPECIAL Tracker

Thank you for your interest in contributing to SPECIAL Tracker! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful** and inclusive in all interactions
- **Be constructive** when giving feedback
- **Focus on the code**, not the person
- **Help others learn** and grow in the community

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- Git for version control

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then:
   git clone https://github.com/your-username/special-tracker.git
   cd special-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🔄 Development Workflow

### Branch Strategy

- **`main`** - Production-ready code
- **`develop`** - Integration branch for new features
- **`feature/feature-name`** - Individual feature development
- **`bugfix/bug-description`** - Bug fixes
- **`hotfix/critical-fix`** - Critical production fixes

### Creating a Feature Branch

```bash
# Always start from the latest develop branch
git checkout develop
git pull origin develop

# Create and switch to your feature branch
git checkout -b feature/your-feature-name

# Work on your feature...
# Commit your changes regularly
git add .
git commit -m "feat: add new feature"

# Push your branch
git push origin feature/your-feature-name
```

## 📝 Code Standards

### TypeScript Guidelines

- **Use TypeScript for all new code**
- **Define proper interfaces and types**
- **Avoid `any` type unless absolutely necessary**
- **Use strict TypeScript configuration**

```typescript
// ✅ Good
interface SpecialAttribute {
  name: string;
  value: number;
  maxValue: number;
}

const updateAttribute = (attribute: SpecialAttribute): SpecialAttribute => {
  return { ...attribute, value: Math.min(attribute.value + 1, attribute.maxValue) };
};

// ❌ Bad
const updateAttribute = (attribute: any): any => {
  return { ...attribute, value: attribute.value + 1 };
};
```

### React Native/Expo Guidelines

- **Use functional components with hooks**
- **Follow React Native performance best practices**
- **Use proper prop types and default values**
- **Implement proper error boundaries**

```typescript
// ✅ Good
interface SpecialBarProps {
  attribute: SpecialAttribute;
  animated?: boolean;
  onPress?: () => void;
}

const SpecialBar: React.FC<SpecialBarProps> = ({ 
  attribute, 
  animated = true, 
  onPress 
}) => {
  // Component implementation
};

export default SpecialBar;
```

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── special/        # SPECIAL-specific components
│   └── forms/          # Form components
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── main/          # Main app screens
│   └── settings/      # Settings screens
├── services/          # API and external service integration
├── utils/             # Helper functions and utilities
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
├── store/             # State management (Zustand)
└── constants/         # App constants and configuration
```

### Naming Conventions

- **Components**: PascalCase (`SpecialBar.tsx`)
- **Files**: camelCase (`userService.ts`)
- **Variables**: camelCase (`currentUser`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

## 🧪 Testing Guidelines

### Test Requirements

- **Unit tests** for all utility functions
- **Component tests** for UI components
- **Integration tests** for API interactions
- **E2E tests** for critical user flows

### Writing Tests

```typescript
// Component test example
import { render, fireEvent } from '@testing-library/react-native';
import SpecialBar from '../SpecialBar';

describe('SpecialBar Component', () => {
  const mockAttribute = {
    name: 'strength',
    value: 15,
    maxValue: 30
  };

  it('renders correctly', () => {
    const { getByTestId } = render(
      <SpecialBar attribute={mockAttribute} />
    );
    
    expect(getByTestId('special-bar')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <SpecialBar attribute={mockAttribute} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByTestId('special-bar'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📝 Commit Message Format

We use conventional commits for clear and consistent commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(auth): add social login integration
fix(special-bar): resolve animation performance issue
docs(readme): update installation instructions
test(user-service): add unit tests for profile updates
```

## 🔍 Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

2. **Update documentation** if needed
3. **Add tests** for new functionality
4. **Follow code standards** and formatting

### PR Template

When creating a pull request, please include:

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] E2E tests updated (if applicable)

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass (tests, linting, type checking)
2. **At least one approval** from a maintainer
3. **All feedback addressed** before merging
4. **Squash and merge** for clean commit history

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template and include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Device/platform information**
- **Screenshots or logs** if applicable

### Feature Requests

Use the feature request template and include:

- **Clear description** of the proposed feature
- **Use case and motivation**
- **Possible implementation approach**
- **Alternatives considered**

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issue

## 🏷 Development Phases

Current development is organized into phases:

- **Phase 1**: Core Foundation (Current)
- **Phase 2**: AI Integration
- **Phase 3**: Planner & Social Features
- **Phase 4**: Premium & Monetization
- **Phase 5**: Polish & Launch

Check the [project roadmap](docs/SPECIAL_TRACKER_PLAN.md) for detailed information.

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord**: Community chat (link coming soon)

## 🎉 Recognition

Contributors will be recognized in:

- **CONTRIBUTORS.md** file
- **Release notes** for significant contributions
- **Community highlights** in project updates

Thank you for contributing to SPECIAL Tracker! 🚀 