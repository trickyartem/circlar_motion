class Utils {
    static randomIntFromRange(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static pick_random_thing<T>(ma_stuff: Array<T>) : T{
        return ma_stuff[Math.floor(Math.random() * ma_stuff.length)]
    }
}

export default Utils;