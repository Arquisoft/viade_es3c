import React from "react";
import { shallow } from "enzyme";
import NewRoute from "./NewRoute";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("NewRoute", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<NewRoute onClick={mockSubmit}/>);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleChange", () => {
    it("should call setState on title", () => {
      const mockEvent = {
        target: {
          markers: null,
          value: [
            { position: { lat: 43.354831, lng: -5.851303 } },
            { position: { lat: 43.35644, lng: -5.854693 } },
            { position: { lat: 43.361836, lng: -5.850547 } }
          ]
        }
      };
      const expected = {
        markers: null,
        value: [
          { position: { lat: 43.354831, lng: -5.851303 } },
          { position: { lat: 43.35644, lng: -5.854693 } },
          { position: { lat: 43.361836, lng: -5.850547 } }
        ]
      };
      wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state()).toEqual(expected);
    });
  });


});

