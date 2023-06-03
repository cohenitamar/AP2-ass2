

function HandleSteps() {

    const multiStepForm = document.querySelector("[data-multi-step]");
    const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];


    function showCurrent(formSteps, currentStep) {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep)
        })
    }

    function getCurrentStep(formSteps) {
        return formSteps.findIndex(function (step) {
            return step.classList.contains("active");
        });
    }


    let currentStep = getCurrentStep(formSteps);
    if (currentStep < 0) {
        currentStep = 0
        showCurrent(formSteps, currentStep);
    }


    multiStepForm.addEventListener("click", e => {
        if (e.target.matches("[data-step-next]")) {
            currentStep++;
        } else if (e.target.matches("[data-step-previous]")) {
            currentStep--;
        }
        showCurrent();
    })

}

export default HandleSteps;


