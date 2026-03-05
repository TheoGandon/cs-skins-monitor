import { render, screen } from '@testing-library/react';
import Button from '../components/Button';
import '@testing-library/jest-dom';

import { fireEvent } from '@testing-library/react';
import { useState } from 'react';

test('Le bouton affiche le bon texte', () => {
	render(<Button label="Cliquez-moi" />);
	expect(screen.getByText('Cliquez-moi')).toBeInTheDocument();
});

test("Le compteur s'incrémente au clic", () => {
	function CounterTest() {
		const [count, setCount] = useState(0);
		return (
			<Button
				label={`count is ${count}`}
				onClick={() => setCount((c) => c + 1)}
			/>
		);
	}

	render(<CounterTest />);
	const button = screen.getByText('count is 0');
	fireEvent.click(button);
	expect(screen.getByText('count is 1')).toBeInTheDocument();
});
