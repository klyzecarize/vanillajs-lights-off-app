class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        this.newGameBtn = document.querySelector('#new-game');
        this.scoreTag = document.querySelector('#score');
        this.finalScoreTag = document.querySelector('#finalScore');
        this.newGameModal = new bootstrap.Modal('#newGameModal');
        this.titleText = document.querySelector('.modal-title');

        // object for now
        this.cellMap = new Map();

        // Event Listener
        this.tbodyTag.addEventListener('click', this._handleClick.bind(this));
        this.newGameBtn.addEventListener('click', this._newGame.bind(this));

        this._newGame();
    }

    _newGame () {
        this.newGameModal.hide();

        this.titleText.innerHTML = "Retry?";

        this.arCells = [];

        this.score = 0;

        this.maxCells = 5;
        
        this._init();
    }

    _init() {
        this.scoreTag.innerHTML = this.score;
        this.finalScoreTag.innerHTML = this.score;

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

            this.score++;

            this.scoreTag.innerHTML = this.score;
            this.finalScoreTag.innerHTML = this.score;

            this._getCells(location);
            this._handleChangeLights();

            this._checkLights();
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

        // Selected Cell
        this.arCells.push(selectedCell);

        // Left
        (selectedCell.row - 1) > 0 && this.arCells.push({
            col: selectedCell.col,
            row: selectedCell.row - 1
        });
        
        // Right
        (selectedCell.row + 1) <= this.maxCells && this.arCells.push({
            col: selectedCell.col,
            row: selectedCell.row + 1
        });  

        // Up
        (selectedCell.col - 1) > 0 && this.arCells.push({
            col: selectedCell.col - 1,
            row: selectedCell.row
        });
        
        // Down
        (selectedCell.col + 1) <= this.maxCells && this.arCells.push({
            col: selectedCell.col + 1,
            row: selectedCell.row
        });   
    }

    _changeCellColor (targetElement) {
        targetElement.dataset.isOn = targetElement.dataset.isOn === "true" ? "false" : "true";       
    }

    _handlePuzzleGenerator () {
        const randomizer = () => Math.floor((Math.random() * this.maxCells) + 1);
        let arPuzzleCells = [
            { col: randomizer(), row: randomizer()}, 
            // { col: randomizer(), row: randomizer()}, 
            // { col: randomizer(), row: randomizer()}, 
            // { col: randomizer(), row: randomizer()}, 
            // { col: randomizer(), row: randomizer()}
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

        if (lightsOff === this.maxCells * this.maxCells) {
            this.titleText.innerHTML = "YOU WIN!";
            this.newGameModal.show();
        } 
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