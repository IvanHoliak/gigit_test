import * as accordion from "./accordion.js";
import { popup_show } from "./popup.js";
import * as sign from "./sign.js";

const inputs_dropdown = document.querySelectorAll(".input-dropdown");
const clear_btns = document.querySelectorAll(".btn__input--remove");

const change_icon = (input, status) => {
    const input_remove_btn = input.parentNode.querySelector(".btn__input--remove");
    const input_up_btn = input.parentNode.querySelector(".btn__input--up");
    const input_down_btn = input.parentNode.querySelector(".btn__input--down");

    if(input_remove_btn && input_up_btn && input_down_btn) {
        if(input.value.length > 0){
            input_remove_btn.style.display = "block";
            input_up_btn.style.display = "none";
            input_down_btn.style.display = "none";
    
            return;
        };
    
        if(status === "active") {
            input_remove_btn.style.display = "none";
            input_up_btn.style.display = "block";
            input_down_btn.style.display = "none";
    
            return;
        };
    
        input_remove_btn.style.display = "none";
        input_up_btn.style.display = "none";
        input_down_btn.style.display = "block";
    };
};

const clear_input = (e, btn) => {
    e.preventDefault();
    
    const input = btn.parentNode.querySelector(".input");
    const datalist = btn.parentNode.querySelector(".datalist");

    input.value = "";
    datalist.querySelectorAll(".datalist-item").forEach(item => item.style.display = "block");

    change_icon(input);
};

const on_datalist_click = (e, input) => {
    const value = e.target.dataset?.value ?? "all";

    if(value === "all") input.value = "";
    else input.value = value;

    change_icon(input);
};

const show_dropdown_list = (input, datalist_name, isHide) => {
    if(datalist_name){
        const datalist = document.querySelector(`.${datalist_name}`);
        datalist.classList.add("datalist--active");

        change_icon(input, "active");
        
        datalist.querySelectorAll(".datalist-item").forEach(item => item.style.display = "block");
        
        if(isHide) {
            document.addEventListener("click", e => {
                if(!e.target.classList.contains("datalist-item")) {
                    datalist.classList.remove("datalist--active");
                    change_icon(input);
                };
            }, {once: true});
        };
        
        datalist.addEventListener("click", e => {
            on_datalist_click(e, input);
            datalist.classList.remove("datalist--active");
            change_icon(input);
        }, {once: true});

    };
};

const dropdown_list_filter = (input, datalist_name) => {
    if(datalist_name){
        change_icon(input);
        const datalist = document.querySelector(`.${datalist_name}`);
        datalist.querySelectorAll(".datalist-item").forEach(item => {
            if(!item.dataset?.value.toLowerCase().includes(input.value.toLowerCase()) && item.dataset?.value !== "all") item.style.display = "none";
            else item.style.display = "block";
        });
    };
};

inputs_dropdown.forEach(input => {
    input.addEventListener("focus", e => show_dropdown_list(input, e.target.dataset?.datalist));
    input.addEventListener("blur", e => show_dropdown_list(input, e.target.dataset?.datalist, true));
    input.addEventListener("keyup", e => dropdown_list_filter(e.target, e.target.dataset?.datalist));
});

clear_btns.forEach(btn => btn.addEventListener("click", (e) => clear_input(e, btn)))

//SHOW POPUP 

const filter = document.querySelector("input[name='filter']");
const upgrade_plan_btn = document.querySelector(".profile__upgrade-plan");
const show_popup = document.querySelectorAll(".btn_show_popup");
const calendar_cells = document.querySelectorAll(".calendar__body-cell");

if(filter) {
    filter.addEventListener("click", popup_show);
};

if(upgrade_plan_btn) {
    upgrade_plan_btn.addEventListener("click", popup_show);
};

if(show_popup.length) {
    show_popup.forEach(btn => btn.addEventListener("click", popup_show));
};

if(calendar_cells.length) {
    calendar_cells.forEach(cell => cell.addEventListener("click", popup_show));
};

// SEARCH

const search_input = document.querySelector("input[name='search']");
const main_box = document.querySelector(".main_box");
const search_box = document.querySelector(".search_box");
const search_list = document.querySelector(".search-list");

const search_content = (e) => {
    const value = e.target.value;
    const search_title = document.querySelector(".search_box__content-title");
    const results_box = document.querySelector(".search_box__content-result");
    const subtitle = document.querySelector(".search_box__content-subtitle");
    const filter_box = document.querySelector(".search_box__content__filter-box");

    if(value.length > 0) show_dropdown_list(e.target, e.target.dataset?.datalist, true);
    else search_list.classList.remove("datalist--active");
    
    if(value.toLowerCase() === "li"){
        search_title.innerText = `"Li" Results`;
        main_box.style.display = "none";
        search_box.style.display = "block";
        results_box.style.display = "flex";
        filter_box.style.display = "none";
        return;
    }else if(value.toLowerCase() === "lii"){
        results_box.style.display = "none"
        subtitle.style.display = "block";
        search_title.innerText = `No Results for "Lii"`;
        filter_box.style.display = "none";
        return;
    };
    
    main_box.style.display = "block";
    search_box.style.display = "none";
    results_box.style.display = "flex";
    subtitle.style.display = "none";
};

if(search_input && main_box && search_box && search_list) {
    search_input.addEventListener("keyup", search_content);
};

// ACTIVE SIDE BAR 
// ****** RIGHT ******

const sidebar_right_btn = document.querySelector(".aside-right__hidden_btn");
const sidebar_right = document.querySelector(".aside-right");

const toggle_sidebar = (e) => {
    e.preventDefault();
    
    sidebar_right.classList.toggle("aside-right--active");
    sidebar_right_btn.classList.toggle("aside-right__hidden_btn--active");
};

if(sidebar_right_btn && sidebar_right) {
    sidebar_right_btn.addEventListener("click", toggle_sidebar);
};

// MOB MENU

const burger_menu = document.querySelector(".navigation__mob__burger-menu");
const mob_menu = document.querySelector(".navigation__mob");

const toggle_menu = (e) => {
    e.preventDefault();

    burger_menu.classList.toggle("navigation__mob__burger-menu--active");
    mob_menu.classList.toggle("navigation__mob--active");
}

if(burger_menu && mob_menu) {
    burger_menu.addEventListener("click", toggle_menu);
}

// SHOW CHATS

const show_chats_btn = document.querySelector(".aside-left__chat-show-btn");
const chats_list = document.querySelector(".aside-left__content");
const aside_left = document.querySelector(".aside-left");

const show_chats = (e) => {
    e.preventDefault();

    aside_left.classList.toggle("aside-left--active");
};

if(show_chats_btn && chats_list && aside_left) {
    show_chats_btn.addEventListener("click", show_chats);
};

// SHOW CALENDAR ACCORDION 

const btn_show_calendar = document.querySelectorAll(".btn_show_calendar");

const show_calendar_accordion = (e) => {
    e.preventDefault();
    const target_day = e.target.dataset?.day || null;

    if(!target_day) return;

    const target_calendar_accordion = document.getElementById(target_day);

    if(!target_calendar_accordion) return;

    target_calendar_accordion.classList.toggle("calendar__accordion--active");
};

if(btn_show_calendar.length) {
    btn_show_calendar.forEach(btn => btn.addEventListener("click", show_calendar_accordion));
};