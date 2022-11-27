const disabled_btn = (bool) => {
    const btn = document.querySelector('.btn__primary');

    if(bool){
        btn.classList.add("btn__primary--disabled");
        btn.setAttribute("disabled", "");
        return;
    };

    btn.classList.remove("btn__primary--disabled");
    btn.removeAttribute("disabled");
};

const valid_inputs = (inputs) => {
    let isDisabled = false;

    inputs.forEach(input => {
        if(input.value.length === 0) isDisabled = true;
    });

    disabled_btn(isDisabled);
};

const inputs_handler = () => {
    const sign_inputs = document.querySelectorAll(".input-sign");
    
    if(!sign_inputs.length) return;
    sign_inputs.forEach(input => {
        input.addEventListener("keyup", () => valid_inputs(sign_inputs));
    });
    valid_inputs(sign_inputs);
};

const sign = (() => {
    inputs_handler();
})();

export default sign;