interface CanvasStyleOptions {
	width: number;
	height: number;
	style?: Partial<CSSStyleDeclaration>;
}

export class Canvas {
	public readonly canvas = document.createElement('canvas');
	public readonly c = this.canvas.getContext('2d');

	constructor(options: CanvasStyleOptions) {
		this.canvas.width = options.width;
		this.canvas.height = options.height;

		Object.assign(this.canvas.style, options.style || {})

		document.body.appendChild(this.canvas);
	}

	getSize() {
		const { width, height } = this.canvas;

		return {
			width, height
		}
	}
}

