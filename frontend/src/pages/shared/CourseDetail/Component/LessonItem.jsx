function LessonItem({lesson, idx}){
    const order = lesson.order ?? lesson.index ?? idx + 1
    const title = lesson.title ?? lesson.name ?? 'Untitled'
    const duration = lesson.duration ?? lesson.length ?? ''

    return (
        <li key={lesson.id ?? `${order}-${idx}`} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-slate-100 font-medium text-slate-700 text-lg px-3 py-1 rounded-full">
                    Lesson {order}
                </div>
                <div>
                    <div className="text-slate-800 font-medium">{title}</div>
                    {lesson.description && (
                        <div className="text-sm text-slate-500">{lesson.description}</div>
                    )}
                </div>
            </div>

            <div className="text-sm text-slate-500">Duration: {duration} min</div>
        </li>
    )
}

export default LessonItem;