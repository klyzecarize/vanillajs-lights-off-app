class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        this.newGameBtn = document.querySelector('#new-game');

        // object for now
        this.cellMap = new Map();

        // Event Listener
        this.tbodyTag.addEventListener('click', this._handleClick.bind(this));
        this.newGameBtn.addEventListener('click', this._newGame.bind(this));

        this._newGame();
    }

    _newGame () {
        this.arCells = [];

        this.maxCells = 5;
        
        this._init();
    }

    _init() {
        (this.cellMap.size > 0) ?  this.cellMap.forEach( 
                cell => {
                    cell.dataset.isOn = "false";
                }
            ) : this._renderCells();

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
            const rowElement = this.cellMap.get(`${cell}`);

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
        (clickedId.row + 1) <= this.maxCells && this.arCells.push(clickedId.row + 1);
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
        });

        this.arCells = [];
    }

    _checkLights () {
        let lightsOff = document.querySelectorAll(`td[data-is-on="false"]`);

        lightsOff.length === 5 && alert('You Win');
    }

    _renderCells () {
        this.tbodyTag.innerHTML = "";

        this.tbodyTag.insertAdjacentHTML('beforeend', '<tr></tr>');

        for(let rowIndex = 1; rowIndex <= this.maxCells; rowIndex++) {
            const rowHTML = `
                <td class="lights h-100 bg-gradient" data-row="${rowIndex}" data-is-on="false"></td>
            `;

            const getTr = document.querySelector('tr');
            getTr.insertAdjacentHTML('beforeend', rowHTML);

            // set the cell so that I can call it for a new game
            const getNewCell = getTr.lastElementChild;
            this.cellMap.set(`${rowIndex}`, getNewCell)
        }
    }
}

const app = new LightsOff();