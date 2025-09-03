# Modern Dev Toolkit

[![npm version](https://badge.fury.io/js/modern-dev-toolkit.svg)](https://badge.fury.io/js/modern-dev-toolkit)
[![Build Status](https://img.shields.io/travis/0xZepeto/modern-dev-toolkit.svg)](https://travis-ci.org/0xZepeto/modern-dev-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependencies](https://img.shields.io/librariesio/release/npm/modern-dev-toolkit.svg)](https://libraries.io/npm/modern-dev-toolkit)

A comprehensive development toolkit for modern applications with 700+ carefully curated dependencies.

## Features

- 🚀 **700+ Dependencies**: All the tools you need in one package
- 🔧 **Utilities**: Array, string, date, object, and validation helpers
- 🎣 **React Hooks**: Custom hooks for common use cases
- 🎨 **UI Components**: Reusable components with TypeScript support
- 🎭 **Styling**: Theme system and CSS utilities
- 📚 **TypeScript**: Full type safety throughout
- 🧪 **Testing**: Comprehensive test coverage
- 📖 **Documentation**: Detailed API documentation

## Installation

```bash
npm install modern-dev-toolkit

Quick Start
import {
  // Utilities
  unique, chunk, shuffle, groupBy,
  // Hooks
  useDebounce, useThrottle, useLocalStorage,
  // Components
  Button, Input, Modal, Select
} from 'modern-dev-toolkit';

// Use utilities
const numbers = [1, 2, 3, 2, 1];
const uniqueNumbers = unique(numbers); // [1, 2, 3]

// Use hooks
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

// Use components
function MyForm() {
  return (
    <form>
      <Input
        label="Email"
        type="email"
        required
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
