export const bubbles_count = {
    size: 0,
    genre: 0,
    price: 0
};

const filter_count = document.querySelector(".input__filter-count");

export const clear_filter = () => {
    const countes = document.querySelectorAll(".__count");
    if(!countes.length) return;
    
    countes.forEach(count => {
        count.innerText = "";
        count.style.display = "none";
    });
    
    const all_checkbox = document.querySelectorAll("input[type='checkbox']");
    
    if(!all_checkbox.length) return;
    
    all_checkbox.forEach(checkbox => checkbox.checked = false);

    if(filter_count) {
        const filter_box = document.querySelector(".search_box__content__filter-box");
        filter_count.style.display = "none";
        filter_box.style.display = "none";
    };
};

export const display_count_result = () => {
    const filter_result_btn = document.querySelector(".filter_result");

    if(!filter_result_btn) return;

    const result = Object.values(bubbles_count).reduce((acc, next) => acc += next, 0);

    filter_result_btn.innerText = `Show ${result > 0 ? result : 12} Results`;

    if(filter_count) {
        filter_count.style.display = "flex";
        filter_count.innerText = result;
    }
};

const display_count_bubble = (checkbox, status) => {
    const bubble_name = checkbox.getAttribute("id").split("-")[0];

    if(status) bubbles_count[bubble_name] += 1;
    else bubbles_count[bubble_name] -= 1;

    const btn = document.querySelector(`button[data-name=${bubble_name}]`);

    if(!btn) return;

    const current_btn = btn.querySelector(".__count");

    if(bubbles_count[bubble_name] === 0){
        current_btn.style.display = "none";
    }else{
        current_btn.style.display = "block";
        current_btn.innerHTML = bubbles_count[bubble_name];
    };

    display_count_result();
};

const on_checkbox_handler = () => {
    const all_checkbox = document.querySelectorAll("input[type='checkbox']");
    
    if(!all_checkbox.length) return;
    
    all_checkbox.forEach(checkbox => checkbox.addEventListener("change", (e) => display_count_bubble(checkbox, e.target.checked)));
};

const expand_accordion = (e, btn) => {
    e.preventDefault();

    const accordion_content = btn.parentNode.querySelector(".accordion-content");

    if(!accordion_content) return;
    
    accordion_content.classList.toggle("accordion-content--active");

    if(accordion_content.classList.contains("accordion-content--active")) {
        btn.querySelector(".accordion-icon-arrow-down").style.display = "none";
        btn.querySelector(".accordion-icon-arrow-up").style.display = "block";
    }else{
        btn.querySelector(".accordion-icon-arrow-up").style.display = "none";
        btn.querySelector(".accordion-icon-arrow-down").style.display = "block";
    };
};

const accordion = (() => {
    const accordion__btns = document.querySelectorAll(".accordion__btn");

    if(!accordion__btns.length) return;

    accordion__btns.forEach(btn => {
        btn.addEventListener("click", (e) => expand_accordion(e, btn));
    });

    on_checkbox_handler();

})();

export default accordion;