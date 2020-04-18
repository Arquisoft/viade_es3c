import { cleanup } from 'react-testing-library';
import Multimedia from "./multimedia";
import { v5 as uuidv5 } from "uuid";

afterAll(cleanup);

describe('Multimedia class domain', () => {
  it('create class multimedia without crashing', () => {
    const mm = new Multimedia("url", "03/06/2020", "sara", "foto");
    expect(mm.url === "url");
    expect(mm.date === "03/06/2020");
    expect(mm.author === "sara");
    expect(mm.name === "foto");
    expect(mm.getIdMedia() === uuidv5 (mm.name, '10eadb41-c6bb-4874-b752-13465ec77185'));
    expect(mm.webId === "");
  });
});
