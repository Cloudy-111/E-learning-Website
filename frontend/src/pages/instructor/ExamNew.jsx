// src/pages/instructor/ExamNew.jsx
"use client";

import { useEffect, useState } from "react";

import Hero from "./CreateExam/Components/Hero";
import ExamInformation from "./CreateExam/Components/ExamInformation";
import ListQuestion from "./CreateExam/Components/ListQuestion/ListQuestion";

import { useCreateExam } from "./CreateExam/Components/CustomCreateExamHook/useCreateExam";

export default function ExamNew() {
  useEffect(() => window.scrollTo(0,0), []);
  const createExamState = useCreateExam();

  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleOptions, setShuffleOptions] = useState(true);

  // const onImportCSV = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   alert(`Đã chọn file: ${file.name}\n(Demo) Bạn sẽ parse CSV ở backend/worker để tạo batch câu hỏi.`);
  //   e.target.value = "";
  // };

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Hero />

      <main className="w-full px-6 lg:px-12 py-8 grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">
        <ExamInformation 
          shuffleQuestions={shuffleQuestions} setShuffleQuestions={setShuffleQuestions}
          shuffleOptions={shuffleOptions} setShuffleOptions={setShuffleOptions}
          {...createExamState}
        />

        <ListQuestion
          {...createExamState}
        />
      </main>
    </div>
  );
}
