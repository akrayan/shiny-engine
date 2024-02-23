
export class Vector2{
    x: number = 0
    y: number = 0

    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    static multiply(...vectors: Vector2[]): Vector2 {
        return vectors.reduce((prev, current) => {
            prev.x *= current.x
            prev.y *= current.y
            return prev
        }, new Vector2(1,1))
    }
}

export type Color = {
    r: number
    g: number
    b: number
    a: number
}

export class Transform {
    position: Vector2 = { x: 0, y: 0 }
    scale: Vector2 = { x: 1, y: 1 }
}
