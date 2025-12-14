import { Check, X } from "lucide-react";
import CourseItem from "./CourseItem";

function CourseList({ courses, statusFilter, actionLoading, handleRejectClick }) {
    return (
        <div className="space-y-4">
            {courses.map((course) => (
                <CourseItem
                    key={course.id}
                    course={course}
                    statusFilter={statusFilter}
                    actionLoading={actionLoading}
                    handleRejectClick={handleRejectClick}
                />
            ))}
        </div>
    )
}

export default CourseList;