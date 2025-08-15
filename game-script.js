class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        this.arCells = [];
        
        this.tbodyTag.addEventListener('click', this._handleClick.bind(this));
    }

    _handleClick ({target}) {
        if (target.classList.contains('lights')) {
            this._handleChangeLights(target);
        }
    }

    _handleChangeLights (targetElement) {
        let location = {
            row: parseInt(targetElement.dataset.row)
        }

        this._getCells(location);

        this.arCells.forEach(cell => {
            const rowElement = document.querySelector(`[data-row="${cell}"]`);

            this._changeCellColor(rowElement);
        });

        this.arCells = [];
    }

    _getCells (location) {
        const clickedId = location;

        this.arCells.push(location.row);

        // Left
        (clickedId.row - 1) > 0 && this.arCells.push(clickedId.row - 1);
        // Right
        (clickedId.row + 1) < 6 && this.arCells.push(clickedId.row + 1);
    }

    _changeCellColor (targetElement) {
        targetElement.dataset.isOn = targetElement.dataset.isOn === "true" ? "false" : "true";
    }
}

const app = new LightsOff();