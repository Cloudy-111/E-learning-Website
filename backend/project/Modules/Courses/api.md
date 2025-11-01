## Các API dùng trong Module Course

### Course

- GET api/courses
- GET api/courses/{id}
- GET api/courses/search
- POST api/courses
- POST api/courses/{id}/request-update
- PATCH api/courses/{id} ------- Only When Draft
- PATCH api/courses/{id}/request-publish ------- When published

### CourseContent

- GET api/courses/{courseId}/content
- POST api/course/{courseId}/content
- POST api/course/{courseId}/content/request-update ------- When published
- PATCH api/course/{courseId}/content ------- Only When Draft

### Lesson

- GET api/course-content/{courseContentId}/lessons
- GET api/course-content/{courseContentId}/lessons/{lessonId}
- POST api/course-content/{courseContentId}/lessons
- POST api/course-content/{courseContentId}/lessons/order
- POST api/course-content/{courseContentId}/lessons/{lessonId}/request-update ------- When published
- PATCH api/course-content/{courseContentId}/lessons/{lessonId} ------- Only When Draft

### CourseReview

- GET api/{courseId}/reviews
- POST api/{courseId}/reviews
- PATCH api/{courseId}/reviews/{reviewId}

### Category

- POST api/categories

### Enrollments

- GET api/courses/{courseId}/enrollments
- GET api/courses/{courseId}/enrollments/{enrollmentId}
- POST api/courses/{courseId}/enrollments
- PATCH api/courses/{courseId}/enrollments/{enrollmentId}/progress
