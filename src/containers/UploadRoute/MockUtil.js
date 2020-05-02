export const setHookState = (newState: {}) => jest.fn().mockImplementation((state: {}) => [
  newState,
  (newState: {}) => {}
])
