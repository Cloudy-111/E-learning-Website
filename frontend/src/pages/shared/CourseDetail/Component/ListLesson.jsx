import LessonItem from "./LessonItem";

function ListLesson({ listLesson }) {
    if (!Array.isArray(listLesson) || listLesson.length === 0) {
        return (
            <div className="lg:col-span-2 rounded-2xl border p-4 bg-white">
                <p className="text-slate-600">Không có bài học nào.</p>
            </div>
        )
    }

    return (
        <div className="lg:col-span-2 rounded-2xl border bg-white">
            <ul className="divide-y">
                {listLesson.map((lesson, idx) => 
                    <LessonItem 
                        key={lesson.id ?? `${lesson.order ?? lesson.index ?? idx + 1}-${idx}`} 
                        lesson={lesson} 
                        idx={idx} 
                    />
                )}
            </ul>
        </div>
    )
}

export default ListLesson