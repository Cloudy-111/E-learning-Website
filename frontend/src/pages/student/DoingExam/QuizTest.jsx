// src/pages/QuizTest.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchExamById } from "../../../api/exams.api";

import HeaderExam from "./Components/HeaderExam";
import ExamBody from "./Components/ExamBody/ExamBody";

function QuizTest() {
  const { id } = useParams();
  
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const attemptId = sessionStorage.getItem("attemptId");

  useEffect(() => {
    if(!attemptId) {
      setErr("No attemptId found. Please start the exam first.");
    }
  }, [attemptId]);

  // fetch data exam
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetchExamById(id);
        const data = res.data;
        setExamData(data);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id])

  useEffect(() => {
    if (!examData) return;
    const time = parseInt(examData.durationMinutes, 10) * 60;
    setTotalTime(time);
    setTimeLeft(time);
  }, [examData]);

  useEffect(() => {
    console.log("examId =", id);
  }, [id]);

  /* ===== UI ===== */
  if(loading) {
    return <div>Loading...</div>;
  }
  if(err) {
    return <div>Error: {err}</div>;
  }

  return (
    <div className="min-h-screen w-screen max-w-none bg-white text-gray-900">
      {/* Sticky bar */}
      <HeaderExam exam={examData} timeLeft={timeLeft} doSubmit={() => {console.log("Submit")}} />

      {/* MAIN */}
      <ExamBody 
        attemptId={attemptId}
        loading={loading}
        err={err}
        examId={id}
        submitted={submitted}
      />

    </div>
  );
}

export default QuizTest;