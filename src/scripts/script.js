function newElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
}

function Barrier(reverse = false) {
    this.element = newElement('div', 'barrier');

    const border = newElement('div', 'border');
    const pipe = newElement('div', 'pipe');
    this.element.appendChild(reverse ? pipe : border);
    this.element.appendChild(reverse ? border : pipe);

    this.setPipeHeight = pipeHeight => pipe.style.height = `${pipeHeight}px`;
}

function BarrierPair(barrierHeight, barrierOpening, x) {
    this.element = newElement('div', 'barrier-pair');

    this.upperBarrier = new Barrier(true);
    this.lowerBarrier = new Barrier(false);

    this.element.appendChild(this.upperBarrier.element);
    this.element.appendChild(this.lowerBarrier.element);

    this.drawOpening = () => {
        const topHeight = Math.random() * (barrierHeight - barrierOpening);
        const lowerHeight = barrierHeight - barrierOpening - topHeight;

        this.upperBarrier.setPipeHeight(topHeight);
        this.lowerBarrier.setPipeHeight(lowerHeight);
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0]);
    this.setX = x => this.element.style.left = `${x}px`;
    this.getWidth = () => this.element.clientWidth;

    this.drawOpening();
    this.setX(x);
}

function Barriers(barriersHeight, playWidth, barriersOpening, space, pointNotification) {
    this.pairs = [
        new BarrierPair(barriersHeight, barriersOpening, playWidth),
        new BarrierPair(barriersHeight, barriersOpening, playWidth + space),
        new BarrierPair(barriersHeight, barriersOpening, playWidth + space * 2),
        new BarrierPair(barriersHeight, barriersOpening, playWidth + space * 3)
    ]

    const displacement = 3;
    this.animation = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement);

            if (pair.getX() < -pair.getWidth()) {
                pair.setX(pair.getX() + space * this.pairs.length);
                pair.drawOpening();
            }

            const middle = playWidth / 2;
            const crossedTheMiddle = pair.getX() + displacement >= middle &&
                pair.getX() < middle;

            if (crossedTheMiddle) pointNotification();
        });
    }
}

const barriers = new Barriers(800, 800, 520, 400);
const gameArea = document.querySelector('[wm-flappy]');
barriers.pairs.forEach(pair => gameArea.appendChild(pair.element));
setInterval(() => {
    barriers.animation();
}, 20);