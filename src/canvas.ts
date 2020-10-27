class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');

    constructor() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = "fixed";

        this.canvas.style.top = "0";
        this.canvas.style.left = "0";

        document.body.appendChild(this.canvas);
    }
}

export const canvas = new Canvas();