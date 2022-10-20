export function randomIntFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function pickRandomItem<T>(array: Array<T>): T {
        return ma_stuff[Math.floor(Math.random() * array.length)]
}
