class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        this.newGameBtn = document.querySelector('#new-game');
        this.scoreTag = document.querySelector('#score');

        // object for now
        this.cellMap = new Map();

        // Event Listener
        this.tbodyTag.addEventListener('click', this._handleClick.bind(this));
        this.newGameBtn.addEventListener('click', this._newGame.bind(this));

        this._newGame();
    }

    _newGame () {
        this.arCells = [];

        this.score = 0;

        this.maxCells = 5;
        
        this._init();
    }

    _init() {
        this.scoreTag.innerHTML = this.score;

        (this.cellMap.size > 0) ?  this.cellMap.forEach( 
                cell => {
                    cell.dataset.isOn = "false";
                }
            ) : this._renderCells();

        this._handlePuzzleGenerator();
    }

    _handleClick ({target}) {
        if (target.classList.contains('lights')) {
            let location = {
                col: parseInt(target.dataset.col),
                row: parseInt(target.dataset.row)
            };

            this._getCells(location);
            this._handleChangeLights();

            this._checkLights();

            this.score++;

            this.scoreTag.innerHTML = this.score;
        }
    }

    _handleChangeLights () {
        this.arCells.forEach(cell => {
            const rowElement = this.cellMap.get(`${cell.col}-${cell.row}`);

            this._changeCellColor(rowElement);
        });

        this.arCells = [];
    }

    _getCells (selectedCell) {
        // The Math.max checks while the Math.min checks the max boundary
        const getAdjacentCells = (value) => {
            return Math.min(Math.max(1, value), this.maxCells);
        };

        const checkNotEqual = (value) => {
            if (selectedCell.col !== value.col || selectedCell.row !== value.row){
                this.arCells.push(value);
            }
        };

        this.arCells.push(selectedCell);

        // Left
        checkNotEqual({
            col: getAdjacentCells(selectedCell.col),
            row: getAdjacentCells(selectedCell.row - 1)
        });
        
        // Right
        checkNotEqual({
            col: getAdjacentCells(selectedCell.col),
            row: getAdjacentCells(selectedCell.row + 1)
        });

        // Up
        checkNotEqual({
            col: getAdjacentCells(selectedCell.col + 1),
            row: getAdjacentCells(selectedCell.row)
        });

        // Down
        checkNotEqual({
            col: getAdjacentCells(selectedCell.col - 1),
            row: getAdjacentCells(selectedCell.row)
        });       
    }

    _changeCellColor (targetElement) {
        targetElement.dataset.isOn = targetElement.dataset.isOn === "true" ? "false" : "true";       
    }

    _handlePuzzleGenerator () {
        const randomizer = () => Math.floor((Math.random() * this.maxCells) + 1);
        let arPuzzleCells = [
            { col: randomizer(), row: randomizer()}, 
            { col: randomizer(), row: randomizer()}, 
            { col: randomizer(), row: randomizer()}, 
            { col: randomizer(), row: randomizer()}, 
            { col: randomizer(), row: randomizer()}
        ];

        arPuzzleCells.forEach( randomCell => {
            this._getCells(randomCell);
            this._handleChangeLights();
        });

        this.arCells = [];
    }

    _checkLights () {
        let lightsOff = 0;

        this.cellMap.forEach(cell => {
            cell.dataset.isOn === "false" && lightsOff++;
        });

        // let lightsOff = document.querySelectorAll(`td[data-is-on="false"]`);

        lightsOff === this.maxCells * this.maxCells && alert('You Win');
    }

    _renderCells () {
        this.tbodyTag.innerHTML = "";

        for (let colIndex = 1; colIndex <= this.maxCells; colIndex++) {
            this.tbodyTag.insertAdjacentHTML('beforeend', '<tr></tr>');

            for(let rowIndex = 1; rowIndex <= this.maxCells; rowIndex++) {
                const rowHTML = `
                    <td class="lights h-100 p-5 bg-gradient" data-col="${colIndex}" data-row="${rowIndex}" data-is-on="false"></td>
                `;

                // get the last added tr to put the cells
                const getTr = document.querySelector('tr:last-child');
                getTr.insertAdjacentHTML('beforeend', rowHTML);

                // set the cell so that I can call it for a new game
                const getNewCell = getTr.lastElementChild;
                this.cellMap.set(`${colIndex}-${rowIndex}`, getNewCell)
            }
            
        }
    }
}

const app = new LightsOff();