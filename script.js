

function ready() {
    let instructions = Array.from(document.getElementsByClassName('instruction-text'));

    instructions.forEach(instruction => {
        instruction.addEventListener('click', () => {
            instruction.classList.remove('visible');
        });
    });
}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}