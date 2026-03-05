import { render, screen } from '@testing-library/react';
import Button from '../components/Button';
import '@testing-library/jest-dom';

test('Le bouton affiche le bon texte', () => {
	render(<Button label="Cliquez-moi" />);
	expect(screen.getByText('Cliquez-moi')).toBeInTheDocument();
});
