class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        this.newGameBtn = document.querySelector('#new-game');

        // Event Listener
        this.tbodyTag.addEventListener('click', this._handleClick.bind(this));
        this.newGameBtn.addEventListener('click', this._newGame.bind(this));

        this._newGame();

    }

    _newGame () {
        this.arCells = [];
        // object for now
        this.cellMap = {};
        
        this._init();
    }

    _init() {
        document.querySelectorAll('td').forEach( cell => {
            // This will solve the requery DOM issue 
            this.cellMap[cell.dataset.row] = cell;
        });

        this._handlePuzzleGenerator();
    }

    _handleClick ({target}) {
        if (target.classList.contains('lights')) {
            this._getCells(target.dataset.row);
            this._handleChangeLights();

            this._checkLights();

        }
    }

    _handleChangeLights () {
        this.arCells.forEach(cell => {
            const rowElement = this.cellMap[cell];

            this._changeCellColor(rowElement);
        });

        this.arCells = [];
    }

    _getCells (selectedRow) {
        let location = {
            row: parseInt(selectedRow)
        };

        const clickedId = location;

        this.arCells.push(clickedId.row);

        // Left
        (clickedId.row - 1) > 0 && this.arCells.push(clickedId.row - 1);
        // Right
        (clickedId.row + 1) < 6 && this.arCells.push(clickedId.row + 1);
    }

    _changeCellColor (targetElement) {
        targetElement.dataset.isOn = targetElement.dataset.isOn === "true" ? "false" : "true";       
    }

    _handlePuzzleGenerator () {
        const randomizer = () => Math.floor((Math.random() * 5) + 1);
        let arPuzzleCells = [randomizer(), randomizer(), randomizer(), randomizer(), randomizer()];

        arPuzzleCells.forEach( randomCell => {
            this._getCells(randomCell);
            this._handleChangeLights();

            this.arCells = [];
        });
    }

    _checkLights () {
        let lightsOff = document.querySelectorAll(`td[data-is-on="false"]`);

        lightsOff.length === 5 && alert('You Win');
    }
}

const app = new LightsOff();