import { Vector2 } from './ToolTypes';

test('test multiply vectors', () => {
    const result = Vector2.multiply({x:2, y:5}, {x: 10, y:5})
    expect(result.x).toEqual(20);
    expect(result.y).toEqual(25);
  });
  