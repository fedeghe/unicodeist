import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('no tests yet', () => {
    render(<App />);
    const linkElement = screen.getByText(/Width/i);
    expect(linkElement).toBeInTheDocument();
});
