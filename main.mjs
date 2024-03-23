import {Progress as createProgressElement, setProgressValue} from "./src/ui/progress/Progress.mjs";
import {Switch as createSwitchElement} from "./src/ui/switch/Switch.mjs";
import {keys} from "./src/shared/constants.mjs";

const createControlElementWrapper = (element, label) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('control-wrapper');

    const labelElement = document.createElement('p');
    labelElement.textContent = label;

    wrapper.appendChild(element);
    wrapper.appendChild(labelElement);

    return wrapper;
}

const createControlElements = () => {
    const controlElementsContainer = document.createElement('div');
    controlElementsContainer.classList.add('controls-container')

    const valueInput = document.createElement('input');
    valueInput.value = 60;
    valueInput.classList.add('value-input');
    valueInput.id = 'value-input';

    const shouldAnimateToggle = createSwitchElement('animate');
    shouldAnimateToggle.setAttribute('active', 0);
    shouldAnimateToggle.id = 'animate-toggle';

    const shouldHideToggle = createSwitchElement('hide');
    shouldHideToggle.setAttribute('active', 0);
    shouldHideToggle.id = 'hide-toggle';

    controlElementsContainer.append(
        createControlElementWrapper(valueInput, 'Value'),
        createControlElementWrapper(shouldAnimateToggle, 'Animate'),
        createControlElementWrapper(shouldHideToggle, 'Hide'),
    );
    return controlElementsContainer;
}

const generatePageStructure = () => {
    const mainContainer = document.getElementById('root');
    const container = document.createElement('div');
    container.classList.add('main-container');

    const progressText = document.createElement('p');
    progressText.classList.add('progress-text');
    progressText.textContent = 'Progress';

    const progress = createProgressElement({
        value: 60,
        shouldAnimate: true,
        shouldHide: false,
    });
    const controlElements = createControlElements();

    container.appendChild(progress);
    container.appendChild(controlElements);
    container.appendChild(progressText);
    mainContainer.appendChild(container);
}


const setupEventListeners = () => {
    const progress = document.querySelector('circle');
    const valueInput = document.getElementById('value-input');
    const shouldAnimateToggle = document.getElementById('animate-toggle');
    const shouldHideToggle = document.getElementById('hide-toggle');

    valueInput.addEventListener('keydown', (e) => {
        let currentInput = Number(e.target.value);

        if (isNaN(e.key) && e.key !== keys.backspace) {
            e.preventDefault();
            return;
        }
        if (currentInput <= 0) {
            e.preventDefault();
            e.target.value = 0;
            currentInput = 0;
        } 
        if (currentInput > 100) {
            e.preventDefault();
            e.target.value = 100;
            currentInput = 100;
            return;
        }

        if (e.key === keys.backspace && String(currentInput).length <= 1) {
            e.preventDefault();
            e.target.value = 0;
            currentInput = 0;
            return;
        }

        if (currentInput === 0) {
            e.preventDefault();
            e.target.value = e.key;
        }
    });

    valueInput.addEventListener('keyup', (e) => {
        console.log(e.target.value);
        if (e.key === keys.backspace && Number(e.target.value) < 0) {
            e.preventDefault();
            return;
        }

        if (Number(e.target.value) > 100) {
            e.preventDefault();
            e.target.value = 100;
        }
        setProgressValue(e.target.value);
    })

    shouldAnimateToggle.addEventListener('focusin', () => {
        const progressContainer = document.getElementById('progress-container');
        progressContainer.classList.toggle('animated');
    });

    shouldHideToggle.addEventListener('focusin', () => {
        const progressContainer = document.getElementById('progress-container');
        progressContainer.classList.toggle('hidden');
    })
}


export const generatePage = () => {
    generatePageStructure();
    setupEventListeners();
}