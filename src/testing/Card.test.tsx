import { screen } from '@testing-library/react';
import CardComponent from '../components/Card/card';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import {render} from "./render.tsx";

describe('CardComponent', () => {
  test('renders with subtitle and footer', () => {
    render(
        <CardComponent
            title="Only Title"
            subtitle="Test Subtitle"
            content={<div>Only Content</div>}
            footer={<div>Test Footer</div>}
        />
    );

    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.getByText('Only Content')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  test('renders without subtitle and footer', () => {
    render(
        <CardComponent
            title="Only Title"
            content={<div>Only Content</div>}
        />
    );

    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.getByText('Only Content')).toBeInTheDocument();
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Footer')).not.toBeInTheDocument();
  });
});
