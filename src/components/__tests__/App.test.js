import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Views', ()=>{
  
  beforeEach( () => render(<App />) )
  
  it('should render the nav element', () => {
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });

});
