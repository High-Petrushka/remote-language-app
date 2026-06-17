export function getLessonDate(lessonDate) {
    let formatDate = lessonDate.slice(0, 10).split("-").reverse();

    switch (formatDate[1]) {
        case "01":
            formatDate[1] = "01";
            break;
        case "02":
            formatDate[1] = "02";
            break;
        case "03":
            formatDate[1] = "03";
            break;
        case "04":
            formatDate[1] = "04";
            break;
        case "05":
            formatDate[1] = "05";
            break;
        case "06":
            formatDate[1] = "06";
            break;
        case "07":
            formatDate[1] = "07";
            break;
        case "08":
            formatDate[1] = "08";
            break;
        case "09":
            formatDate[1] = "09";
            break;
        case "10":
            formatDate[1] = "10";
            break;
        case "11":
            formatDate[1] = "11";
            break;
        case "12":
            formatDate[1] = "12";
            break;
    }

    return formatDate.join(".");
}