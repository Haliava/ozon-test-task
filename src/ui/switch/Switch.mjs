export const Switch = (switchId) => {
    const container = document.createElement('div');
    container.classList.add('switch-container');

    const switchInput = document.createElement('input');
    switchInput.type = 'checkbox';
    switchInput.id = `switch-${switchId}`;

    const switchLabel = document.createElement('label');
    switchLabel.setAttribute('for', `switch-${switchId}`);

    container.appendChild(switchInput);
    container.appendChild(switchLabel);
    return container;
}