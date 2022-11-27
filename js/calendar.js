const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const date_picked = {
    start: null,
    end: null,
};

const datepick = document.querySelector(".datepicker");

const show_datepicker = (e) => {
    e.preventDefault();
    e.stopPropagation();

    datepick.classList.toggle("datepicker--active");
};

const hide_datepicker = () => {
    datepick.classList.remove("datepicker--active");
};

const input_datepick = document.querySelector(".input__datepick");

if (input_datepick) {
    input_datepick.addEventListener("click", show_datepicker);
    document.addEventListener("click", hide_datepicker);
    datepick.addEventListener("click", (e) => e.stopPropagation());
}

const create_matrix_calendar = (days, start_index) => {
    const row_count = 6;
    const column_count = 7;

    const current_matrix = [],
        neighboring_matrix = [];

    start_index = Object.values(start_index);
    Object.values(days).forEach((days, index) => {
        let count = 1;
        for (let i = 0; i < row_count; i++) {
            const row = [];
            for (let j = 0; j < column_count; j++) {
                if ((i === 0 && start_index[index] > j) || count > days) {
                    row.push(null);
                } else {
                    row.push(count);
                    count++;
                }
            }

            if (index === 0) current_matrix.push(row);
            else neighboring_matrix.push(row);
        }
    });

    return { current: current_matrix, neighboring: neighboring_matrix };
};

const prev_date_btn = document?.querySelector(".datepicker__btn--prev");
const next_date_btn = document?.querySelector(".datepicker__btn--next");

const date = new Date(Date.now());
let current_month = date.getMonth(),
    neighboring_month;
let current_year = date.getFullYear(),
    neighboring_year;

// status : "current", "prev", "next"
const calendar = (status = "current") => {
    date_picked.start = null;
    date_picked.end = null;
    input_datepick.value = "";

    current_month =
        status === "prev"
            ? current_month - 1
            : status === "next"
            ? current_month + 1
            : current_month;
    neighboring_month =
        status === "prev"
            ? current_month + 1
            : status === "next"
            ? current_month + 1
            : current_month + 1;
    neighboring_year = current_year;

    if (current_month > 11) {
        current_month = 0;
        current_year = current_year + 1;
    }

    if (neighboring_month > 11) {
        neighboring_month = current_month === 0 ? 1 : 0;
        neighboring_year = neighboring_year + 1;
    }

    if (current_month < 0) {
        current_month = 11;
        current_year = current_year - 1;
    }

    if (neighboring_month < 0) {
        neighboring_month = 11;
        neighboring_year = current_year - 1;
    }

    const current_month_days = new Date(current_year, current_month + 1, 0).getDate();
    const neighboring_month_days = new Date(neighboring_year, neighboring_month + 1, 0).getDate();

    const current_first_day = new Date(current_year, current_month, 0).getDay();
    const neighboring_first_day = new Date(neighboring_year, neighboring_month, 0).getDay();

    date_picked.start = {
        ...date_picked.start,
        month: current_month,
        year: current_year
    };

    date_picked.end = {
        ...date_picked.end,
        month: neighboring_month,
        year: neighboring_year
    };

    render(
        { current: current_month, neighboring: neighboring_month },
        { current: current_year, neighboring: neighboring_year },
        { curren: current_month_days, neighboring: neighboring_month_days },
        { current: current_first_day, neighboring: neighboring_first_day }
    );
};

const datepicker_left_date = document
    ?.querySelector(".datepicker-left")
    ?.querySelector(".datepicker__date");
const datepicker_right_date = document
    ?.querySelector(".datepicker-right")
    ?.querySelector(".datepicker__date");

const table_left = document.querySelector(".datepicker-left");
const table_right = document.querySelector(".datepicker-right");

const render = (month, year, days, start_index) => {
    datepicker_left_date.innerText = `${MONTH[month.current]} ${year.current}`;
    datepicker_right_date.innerText = `${MONTH[month.neighboring]} ${year.neighboring}`;

    const matrixes = create_matrix_calendar(days, start_index);

    Object.values(matrixes).forEach((matrix, index) => {
        matrix.forEach((row, row_index) => {
            let html_row = "";
            row.forEach((date) => {
                if (date === null) {
                    html_row += `
                        <td class="datepicker__table-body__item datepicker__table-body__item--disabled"></td>
                    `;
                } else {
                    html_row += `
                        <td class="datepicker__table-body__item" data-time="${new Date(
                            index === 0 ? year.current : year.neighboring,
                            index === 0 ? month.current : month.neighboring,
                            date
                        ).getTime()}">${date}</td>
                    `;
                }
            });

            if (index === 0)
                table_left.querySelectorAll(".datepicker__table-body__row")[row_index].innerHTML =
                    html_row;
            else
                table_right.querySelectorAll(".datepicker__table-body__row")[row_index].innerHTML =
                    html_row;
        });
    });
};

if (prev_date_btn && next_date_btn) {
    prev_date_btn.addEventListener("click", (e) => {
        e.preventDefault();
        calendar("prev");
    });
    next_date_btn.addEventListener("click", (e) => {
        e.preventDefault();
        calendar("next");
    });
};

const display_picked_date = (unix_from, unix_to) => {
    const from = new Date(unix_from),
        from_day = from.getDate() <= 9 ? `0${from.getDate()}` : from.getDate(),
        from_month = from.getMonth() + 1 <= 9 ? `0${from.getMonth() + 1}` : from.getMonth() + 1,
        from_year = from.getFullYear();
    const to = new Date(unix_to),
        to_day = to.getDate() <= 9 ? `0${to.getDate()}` : to.getDate(),
        to_month = to.getMonth() + 1 <= 9 ? `0${to.getMonth() + 1}` : to.getMonth() + 1,
        to_year = to.getFullYear();
    
    input_datepick.value = `${from_day}.${from_month}.${from_year}-${to_day}.${to_month}.${to_year}`;
};

// DATEPICK

const create_line = () => {
    let line = false;
    const all_cell = document.querySelectorAll(".datepicker__table-body__item");
    all_cell.forEach((item, index) => {
        if (item.classList.contains("datepicker__pick-end")) {
            line = false;
            document
                .querySelectorAll(".datepicker__table-body__item")
                [index - 1].classList.add("datepicker__pick-line--end");
        }
        if (line && !item.classList.contains("datepicker__table-body__item--disabled"))
            item.classList.add("datepicker__pick-line");
        if (item.classList.contains("datepicker__pick-start")) {
            line = true;
            document
                .querySelectorAll(".datepicker__table-body__item")
                [index + 1].classList.add("datepicker__pick-line--start");
        }
    });
};

const picker = () => {
    const datepicker__table = document.querySelectorAll(".datepicker__table");

    datepicker__table.forEach((table) =>
        table.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("datepicker__table-body__item") &&
                !e.target.classList.contains("datepicker__table-body__item--disabled")
            ) {
                if (date_picked.start?.unix && date_picked.end?.unix) {
                    document.querySelectorAll(".datepicker__table-body__item").forEach((item) => {
                        item.classList.remove(
                            "datepicker__pick-start",
                            "datepicker__pick-end",
                            "datepicker__pick-line",
                            "datepicker__pick-line--start",
                            "datepicker__pick-line--end",
                        );
                        date_picked.start = {
                            month: date_picked.start.month,
                            year: date_picked.start.year
                        };
                        date_picked.end = {
                            month: date_picked.end.month,
                            year: date_picked.end.year
                        };

                        input_datepick.value = "";
                    });
                }
                if (!date_picked.start?.unix) {
                    date_picked.start = {
                        ...date_picked.start,
                        number: e.target.innerText,
                        unix: e.target.dataset?.time,
                    };
                    e.target.classList.add("datepicker__pick-start");
                }
                if (!date_picked.end?.unix && date_picked.start.unix < e.target.dataset?.time) {
                    date_picked.end = {
                        ...date_picked.end,
                        number: e.target.innerText,
                        unix: e.target.dataset?.time,
                    };
                    e.target.classList.add("datepicker__pick-end");

                    create_line();

                    display_picked_date(+date_picked.start.unix, +date_picked.end.unix)
                }
            }
        })
    );
};

calendar();
picker();
