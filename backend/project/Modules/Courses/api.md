## Các API dùng trong Module Course

### Course

- GET api/courses
- POST api/courses
- PATCH api/courses/{id}

### CourseContent

- GET api/courses/{courseId}/content
- POST api/course/{courseId}/content

### Lesson

- GET api/course-content/{courseContentId}/lessons
- GET api/course-content/{courseContentId}/lessons/{lessonId}
- POST api/course-content/{courseContentId}/lessons
