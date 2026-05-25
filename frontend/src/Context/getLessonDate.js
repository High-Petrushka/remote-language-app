export function getLessonDate(lessonDate) {
    let formatDate = lessonDate.slice(0, 10).split("-").reverse();

    switch (formatDate[1]) {
        case "01":
            formatDate[1] = "Jan";
            break;
        case "02":
            formatDate[1] = "Feb";
            break;
        case "03":
            formatDate[1] = "Mar";
            break;
        case "04":
            formatDate[1] = "Apr";
            break;
        case "05":
            formatDate[1] = "May";
            break;
        case "06":
            formatDate[1] = "Jun";
            break;
        case "07":
            formatDate[1] = "Jul";
            break;
        case "08":
            formatDate[1] = "Aug";
            break;
        case "09":
            formatDate[1] = "Sep";
            break;
        case "10":
            formatDate[1] = "Oct";
            break;
        case "11":
            formatDate[1] = "Nov";
            break;
        case "12":
            formatDate[1] = "Dec";
            break;
    }

    return formatDate.join(" ");
}