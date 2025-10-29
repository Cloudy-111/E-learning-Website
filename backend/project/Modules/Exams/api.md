## Các API dùng trong Module Exam

### Exam

- GET api/exam
- GET api/exam/{id}
- POST api/exam
- POST api/exam/{id}/order
- PATCH api/exam/{id}

### QuestionExam

- GET api/{examId}/question-exams/for-exam
- GET api/{examId}/question-exams/for-review
- GET api/{examId}/question-exams/for-exam/{id}
- GET api/{examId}/question-exams/for-review/{id}
- POST api/{examId}/question-exams

### Choice

- POST api/{questionExamId}/choices
- DELETE api/{questionExamId}/choices/{id}

### Submit

- POST api/submit/{examId}
