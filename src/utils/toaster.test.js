import { cleanup } from 'react-testing-library';
import * as Toaster from './toaster';

afterAll(cleanup);

describe('Toasted', () => {
  it('renders without crashing (success)', () => {
    expect(Toaster.errorToaster('soy unbody', 'soy un titulo', 'soy un link')).toBeTruthy();
  });

  it('renders without crashing (success)', () => {
    expect(Toaster.successToaster('soy unbody', 'soy un titulo', 'soy un link')).toBeTruthy();
  });
});
