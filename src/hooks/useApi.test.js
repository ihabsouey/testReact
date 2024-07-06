import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useApi } from './useApi';
import axios from 'axios';

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
  }));
  