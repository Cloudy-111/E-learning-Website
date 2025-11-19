
import LessonInformation from "./LessonInformation";
import QuickAccessLesson from "./QuickAccessLesson";
import ListExamLesson from "./ListExamLesson";


function OutlineCourse({ siblings, lesson, idx, exams }){
    return (
        <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
            <QuickAccessLesson siblings={siblings} lesson={lesson} />

            {/* Tóm tắt nhanh */}
            <LessonInformation idx={idx} siblings={siblings} lesson={lesson} />

            <ListExamLesson exams={exams} />
        </aside>
    )
}

export default OutlineCourse;