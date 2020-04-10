import { cleanup } from 'react-testing-library';
import Point from "./point";

afterAll(cleanup);

describe('Point class domain', () => {
  it('create class point without crashing', () => {
    const point = new Point(-5.851303,  -5.851303, 300);
    expect(point.latitude === 43.354831);
    expect(point.longitude === -5.851303);
    expect(point.altitude === 300);
    expect(point.getIdPoint() === "-5.851303_-5.851303");
  });
});
