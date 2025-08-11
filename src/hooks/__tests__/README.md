# useGallerySwipe Hook Tests

This directory contains comprehensive unit tests for the `useGallerySwipe` hook.

## Overview

The `useGallerySwipe` hook provides image gallery navigation functionality with automatic pagination support. These tests ensure all aspects of the hook work correctly with mock data.

## Test Coverage

### ✅ Initialization Tests
- Hook behavior with null parameters
- Successful initialization with valid data
- Error handling during initialization
- Re-initialization optimization (prevents unnecessary API calls)

### ✅ Image Search Across Pages
- Finding images that span multiple pages
- Handling the safety limit for infinite loop prevention
- Proper pagination state management

### ✅ Navigation Tests
**Next Navigation:**
- Navigation within current page
- Loading next page when reaching end of current page
- Handling end of gallery gracefully

**Previous Navigation:**
- Navigation to previous image
- Handling beginning of gallery gracefully

### ✅ Availability Calculations
- `isNextAvailable` logic with and without more pages
- `isPrevAvailable` logic
- Disabling navigation during loading states

### ✅ Error Handling
- Navigation errors (API failures)
- Page loading errors
- Network failures

### ✅ Edge Cases
- Empty image lists
- Rapid navigation calls
- Controller returning null values

### ✅ Parameter Changes
- Re-initialization when `firebaseUid` changes
- Re-initialization when `initImageId` changes
- Proper cleanup and state reset

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Architecture

- **Mock Controllers**: Uses Jest mocks to simulate API responses
- **Mock Data Factories**: Helpers to create consistent test data
- **Async Testing**: Proper handling of async operations with `waitFor` and `act`
- **State Verification**: Comprehensive checks of hook return values
- **Error Simulation**: Testing various failure scenarios

## Console Warnings

The console error messages you see during test runs are expected and part of testing error scenarios. They verify that the hook properly logs errors during failure conditions.

## Test Environment

- **Framework**: Jest with React Testing Library
- **Environment**: jsdom (simulates browser environment)
- **TypeScript**: Full TypeScript support with ts-jest
- **Mocking**: Jest mock functions for controller dependencies
