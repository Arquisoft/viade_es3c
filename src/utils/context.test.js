import * as Context from "./context";

describe.only('Generate suffix', () => {
  test('get suffix', async () => {
    expect(Context.expandedProperty('contenido', 'key:value')).toBe('contenido:value');
  });
});