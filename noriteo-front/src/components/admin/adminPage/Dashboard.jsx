import React, { useEffect, useState } from "react";
import axios from "@/auth/AxiosConfig";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/metrics", { withCredentials: true })
      .then(res => setMetrics(res.data))
      .catch(err => console.error("대시보드 통계 로딩 실패:", err));
  }, []);

  if (!metrics) return <p>로딩 중…</p>;

  const Card = ({ title, value }) => (
    <div className="flex-1 border rounded p-6 text-center">
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="mt-2 text-gray-600">{title}</p>
    </div>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>
      <div className="flex gap-4">
        <Card title="총 회원수"   value={metrics.userCount} />
        <Card title="총 게시글수" value={metrics.boardCount} />
        <Card title="총 댓글수"   value={metrics.commentCount} />
        <Card title="오늘 방문자" value={metrics.todayVisitorCount} />
      </div>
    </>
  );
}
