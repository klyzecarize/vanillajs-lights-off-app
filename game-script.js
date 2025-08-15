class LightsOff {
    constructor() {
        this.tbodyTag = document.querySelector('tbody');
        
        this.tbodyTag.addEventListener('click', this._changeCellColor.bind(this));
    }

    _changeCellColor ({target}) {
        if (target.classList.contains('lights')) {
            target.dataset.isOn === "true" ? target.classList.remove("bg-success")
                : target.classList.add('bg-success');

            target.dataset.isOn = target.dataset.isOn === "true" ? "false" : "true";
        }
    }
}

const app = new LightsOff();