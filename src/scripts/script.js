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

const obstacle = new BarrierPair(700, 400, 100);
document.querySelector('[wm-flappy]').appendChild(obstacle.element);