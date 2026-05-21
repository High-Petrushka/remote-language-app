import { AddInfo } from "../Typography/AddInfo";
import { Bage } from "../Typography/Bage";
import { Hero } from "../Typography/Hero";

function getLessonDate(lessonDate) {
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

export function ProfileLesson({ title, imgSrc, type, language, lessonDate }) {
    return (
        <div className="p-4 lg:p-8 flex flex-col lg:flex-row gap-12 border-b border-l border-r border-zinc-900 first:border-t lg:even:border-l-0 lg:nth-[2]:border-t">
            <div>
                {
                    imgSrc ?
                        <img src={imgSrc} alt="Lesson poster" />
                    :
                        <img src="/src/assets/icons/lesson-default.svg" alt="Lesson poster" className="w-37.5 h-auto max-w-37.5 mx-auto" />
                }
            </div>
            <div className="grow flex flex-col justify-center gap-4">
                <Hero level={5}>{ title }</Hero>
                <div className="flex items-center justify-between">
                    <AddInfo title="Date">{ getLessonDate(lessonDate) }</AddInfo>
                    <div className="flex gap-2">
                        <Bage>{ type }</Bage>
                        <Bage>{ language }</Bage>
                    </div>
                </div>
            </div>
        </div>
    );
}