import { useState, useEffect } from "react";
import { fetchQuestionExamsForReviewByExamId } from "../../../../../../api/questionExams.api";
import { fetchUserSubmissionBySubmissionexamId } from "../../../../../../api/exams.api";
import QuestionReview from "./QuestionReview";

function ReviewDetails( {submissionExam} ) {
    const [listQuestions, setListQuestions] = useState([]);
    const [userResult, setUserResult] = useState([]);

    // fetch list questions
    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                const questions = await fetchQuestionExamsForReviewByExamId(submissionExam.examId);
                setListQuestions(questions.data || []);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        })();

        return () => ac.abort();
    }, [submissionExam.examId]);
    
    // fetch user submission answers
    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                const result = await fetchUserSubmissionBySubmissionexamId(submissionExam.submissionExamId);
                // [{ questionId, choices: [{ id }] }, ...]
                setUserResult(Array.isArray(result.data) ? result.data : (result.data?.savedAnswers ? JSON.parse(result.data.savedAnswers || '[]') : []));
            } catch (error) {
                console.error("Failed to fetch user result:", error);
                setUserResult([]);
            }
        })();
        return () => ac.abort();
    }, [submissionExam.submissionExamId]);

    const findSubmissionFor = (questionId) => {
        if (!Array.isArray(userResult)) return [];
        const entry = userResult.find((e) => String(e.questionId) === String(questionId));
        if (!entry) return [];
        return Array.isArray(entry.choices) ? entry.choices.map((c) => c.id) : [];
    };

    return (
        <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Review Panel</h3>

            {listQuestions.length === 0 && (
                <div className="text-sm text-gray-500">Không có câu hỏi để review.</div>
            )}

            <div className="space-y-6">
                {listQuestions.map((q, idx) => {
                    const userChoiceIds = findSubmissionFor(q.id);
                    // eslint-disable-next-line no-unused-vars
                    const totalCorrect = (q.choices || []).filter(c => c.isCorrect).length;

                    return <QuestionReview key={q.id ?? idx} q={q} userChoiceIds={userChoiceIds} idx={idx} />;
                })}
            </div>
        </div>
    )
}

export default ReviewDetails;