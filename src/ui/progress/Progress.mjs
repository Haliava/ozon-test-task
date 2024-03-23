import { xmlns } from "../../shared/constants.mjs";
// type Options = {
//     value: number,
//     shouldAnimate?: boolean,
//     shouldHide?: boolean,
//     radius?: number,
// }

// Progress: (props: Options) => HtmlDivElement
export const Progress = ({value, shouldAnimate = true, shouldHide = false, radius = 50}) => {
    const progressContainer = document.createElementNS(xmlns, "svg");
    progressContainer.setAttributeNS(null, "viewBox", "0 0 " + (3 * radius) + " " + (3 * radius));
    progressContainer.setAttributeNS(null, "width", 5 * radius);
    progressContainer.setAttributeNS(null, "height", 5 * radius);
    progressContainer.classList.add('svg-container');
    progressContainer.id = 'progress-container';

    const progressCircle = document.createElementNS(xmlns, 'circle');
    progressCircle.setAttributeNS(null, 'cx', '50%');
    progressCircle.setAttributeNS(null, 'cy', '50%');
    progressCircle.setAttributeNS(null, 'r', radius);
    progressCircle.style.strokeDasharray = `${value / 100 * 2 * Math.PI * radius} ${2 * Math.PI * radius}`;
    progressCircle.classList.add('svg-progress-circle');
    progressCircle.id = 'progress-circle';

    const bgCircle = document.createElementNS(xmlns, 'circle');
    bgCircle.setAttributeNS(null, 'cx', '50%');
    bgCircle.setAttributeNS(null, 'cy', '50%');
    bgCircle.setAttributeNS(null, 'r', radius);
    bgCircle.classList.add('svg-bg-circle');

    progressContainer.appendChild(bgCircle);
    progressContainer.appendChild(progressCircle);

    return progressContainer;
}

export const setProgressValue = (newValue) => {
    const circle = document.getElementById('progress-circle');
    const r = circle.r.baseVal.value;
    circle.style.strokeDasharray =`${newValue / 100 * 2 * Math.PI * r} ${2 * Math.PI * r}`;
}