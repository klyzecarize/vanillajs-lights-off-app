class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        this.adjacentCells = [];
        
        this.tbodyTag.addEventListener('click', this._handleClick.bind(this));
    }

    _handleClick ({target}) {
        if (target.classList.contains('lights')) {
            this._changeCellColor(target);
            this._getAdjacentCells(target);
        }
    }

    _getAdjacentCells (targetElement) {
        console.log(targetElement.id);
        const clickedId = parseInt(targetElement.id);

        // Left
        (clickedId - 1) > 0 && this.adjacentCells.push(clickedId - 1);
        // Right
        (clickedId + 1) < 6 && this.adjacentCells.push(clickedId + 1);

        this.adjacentCells.forEach(cell => {
            const rowElement = document.getElementById(cell);

            this._changeCellColor(rowElement);
        });

        this.adjacentCells = [];
    }

    _changeCellColor (targetElement) {
        targetElement.dataset.isOn === "true" ? targetElement.classList.remove("bg-success")
            : targetElement.classList.add('bg-success');

        targetElement.dataset.isOn = targetElement.dataset.isOn === "true" ? "false" : "true";
    }
}

const app = new LightsOff();