import { bubbles_count, display_count_result, clear_filter } from "./accordion.js";

const popup_wrapper = document.querySelector(".popup-wrapper");
const popup_wrapper_all = document.querySelectorAll(".popup-wrapper");

const popup_button_watcher = (inputs, btn) => {
    if(!inputs.length) return;

    let isDisabled = true;

    inputs.forEach(input => {
        if(input.value.length === 0) {
            isDisabled = false;
        };
    });

    if(!isDisabled){
        btn.setAttribute("disabled", "");
        btn.classList.add("btn__primary--disabled");
        return;
    };

    btn.removeAttribute("disabled");
    btn.classList.remove("btn__primary--disabled");
};

const popup_input_watcher = (inputs, btn) => {
    if(!inputs.length) return;

    inputs.forEach(input => {
        if(input.classList.contains("input-dropdown")){
            input.parentNode.querySelectorAll(".datalist-item").forEach(item => item.addEventListener("click", (e) => {
                input.value = e.target.dataset?.value !== "all" ? e.target.dataset?.value : "";
                popup_button_watcher(inputs, btn);
            }));

            input.parentNode.querySelector(".btn__input--remove").addEventListener("click", () => popup_button_watcher(inputs, btn));
        };
    });

    inputs.forEach(input => input.addEventListener("change", () => popup_button_watcher(inputs, btn)));
    inputs.forEach(input => input.addEventListener("keyup", () => popup_button_watcher(inputs, btn)));
};

const popup_inputs = () => {
    const popup_active = document.querySelector(".popup-wrapper--active");

    const popup_content_step = popup_active.querySelector(".popup__content--active");

    if(popup_content_step){
        const fields = popup_content_step.querySelectorAll("input.input").length ? popup_content_step.querySelectorAll("input.input") : popup_content_step.querySelectorAll("textarea.input");
        const continue_btn = popup_content_step.querySelector(".next_btn") || popup_content_step.querySelector(".confirm_btn");
        popup_input_watcher(fields, continue_btn);
        popup_button_watcher(fields, continue_btn);
        return;
    };
    const fields = popup_active.querySelectorAll("input.input").length ? popup_active.querySelectorAll("input.input") : popup_active.querySelectorAll("textarea.input");
    const continue_btn = popup_active.querySelector(".next_btn") || popup_active.querySelector(".confirm_btn");
    popup_input_watcher(fields, continue_btn);
    popup_button_watcher(fields, continue_btn);
};

export const popup_show = (e) => {
    e.preventDefault();

    const name_popup = e.target.dataset?.name;

    if(name_popup) {
        const other_popup = document.getElementById(`${name_popup}`);

        if(!other_popup) return;

        other_popup.classList.add("popup-wrapper--active");

        popup_inputs();

        return;
    };

    if(!popup_wrapper) return;

    popup_wrapper.classList.add("popup-wrapper--active");

    popup_inputs();
};

const popup_close= (e) => {
    e.preventDefault();

    if(!popup_wrapper_all.length) return;

    popup_wrapper_all.forEach(popup =>  popup.classList.remove("popup-wrapper--active"));
};

const apply_filter = () => {
    const main_box = document.querySelector(".main_box");
    const search_box = document.querySelector(".search_box");
    const search_title = document.querySelector(".search_box__content-title");
    const results_box = document.querySelector(".search_box__content-result");
    const subtitle = document.querySelector(".search_box__content-subtitle");
    const filter_box = document.querySelector(".search_box__content__filter-box");

    search_title.innerText = "Nothing was found matching your criteria";
    subtitle.style.display = "none";
    main_box.style.display = "none";
    search_box.style.display = "block";
    results_box.style.display = "none";
    filter_box.style.display = "block";
};

let STEP = 0;

const popup_steps = (e, status) => {
    e.preventDefault();

    const popup_step = document.querySelectorAll(".popup__content");

    if(!popup_step.length) return;

    popup_step[STEP].classList.remove("popup__content--active");

    if(status === "next") STEP += 1;
    else STEP -= 1;

    popup_step[STEP].classList.add("popup__content--active");
    popup_inputs();
};

const popup = (() => {
    if(!popup_wrapper) return;

    const popup_close_btn = document.querySelectorAll(".popup__btn-close");
    const clear_btn = document.querySelector(".clear_btn");
    const cancel_btn = document.querySelectorAll(".cancel_btn");

    const next_btn = document.querySelectorAll(".next_btn");
    const prev_btn = document.querySelectorAll(".prev_btn");

    const filter_btn = document.querySelector(".filter_result");

    popup_close_btn.forEach(btn_close => btn_close.addEventListener("click", popup_close));

    if(clear_btn){
        clear_btn.addEventListener("click", (e) => {
            e.preventDefault();
            Object.keys(bubbles_count).forEach(name => bubbles_count[name] = 0);
            display_count_result();
            clear_filter();
        });
    };

    if(cancel_btn.length){
        cancel_btn.forEach(cancel => cancel.addEventListener("click", popup_close));
    };

    if(next_btn.length){
        next_btn.forEach(btn => btn.addEventListener("click", (e) => popup_steps(e, "next")));
    };

    if(prev_btn.length){
        prev_btn.forEach(btn => btn.addEventListener("click", (e) => popup_steps(e, "prev")));
    };

    if(filter_btn) filter_btn.addEventListener('click', (e) => {
        apply_filter();
        popup_close(e);
    });

})();

export default popup;