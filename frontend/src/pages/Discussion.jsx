import { useEffect, useState } from "react";
import { getDiscussionThreads } from "../api/mock";
import { useForm } from "react-hook-form";

export default function Discussion() {
  const [threads, setThreads] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getDiscussionThreads().then(setThreads);
  }, []);

  const onCreate = (data) => {
    const t = {
      id: "t_" + Date.now(),
      title: data.title,
      author: data.author || "Ẩn danh",
      replies: 0,
      lastReplyAt: new Date().toISOString(),
    };
    setThreads((arr) => [t, ...arr]);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thảo luận</h1>

      <form
        onSubmit={handleSubmit(onCreate)}
        className="p-4 border rounded space-y-3"
      >
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Tiêu đề chủ đề"
          {...register("title", { required: true })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Tên bạn (tuỳ chọn)"
          {...register("author")}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tạo chủ đề
        </button>
      </form>

      <ul className="space-y-3">
        {threads.map((t) => (
          <li key={t.id} className="p-4 border rounded">
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-gray-600">
              Bởi {t.author} • {t.replies} phản hồi • Cập nhật:{" "}
              {new Date(t.lastReplyAt).toLocaleString("vi-VN")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
