import { useState, useEffect } from "react";

import { Check, X } from "lucide-react";
import CourseItem from "./CourseItem";
import CourseItemReview from "./CourseItemReview";

function CourseList({ courses, statusFilter, actionLoading, handleRejectClick }) {
    var [course, setCourse] = useState(null);
    useEffect(() => {
        if (courses && courses.length > 0) {
            setCourse(courses[0]);
        } else {
            setCourse(null);
        }
    }, [courses]);

    const setCourseReview = (course) => {
        setCourse(course);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="lg:col-span-1 space-y-4">
                {courses.map((course) => (
                    <CourseItem
                        key={course.id}
                        course={course}
                        statusFilter={statusFilter}
                        actionLoading={actionLoading}
                        handleRejectClick={handleRejectClick}
                        setCourseReview={setCourseReview}
                    />
                ))}
            </div>
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <CourseItemReview
                        course={course}
                        statusFilter={statusFilter}
                    />
                </div>
            </div>
        </div>
    )
}

export default CourseList;