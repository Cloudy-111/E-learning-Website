// src/pages/shared/BecomInstructor/BecomInstructor.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {
    isLoggedIn,
    authHeader,
    clearAllAuth,
    getRefreshToken,
    setTokens,
} from "../../../utils/auth";
import { API_BASE } from "./utils/constants";
import { safeErr } from "./utils/helpers";
import { HeroSection, UpgradeForm, UpgradeResult } from "./components";

export default function BecomInstructor() {
    const navigate = useNavigate();
    const location = useLocation();

    // ===== Guard: chỉ cho phép truy cập khi đã đăng nhập =====
    useEffect(() => {
        if (!isLoggedIn()) {
            const redirect = encodeURIComponent(location.pathname + location.search);
            navigate(`/login?redirect=${redirect}`, { replace: true });
        }
    }, [location.pathname, location.search, navigate]);

    const [employeeCode, setEmployeeCode] = useState("");
    const [instruction, setInstruction] = useState("");

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0); // 0 idle, 1 register, 2 refresh
    const [error, setError] = useState("");

    const [result, setResult] = useState(null); // dữ liệu sau refresh-token
    const [completedAt, setCompletedAt] = useState(null);
    const [loginData, setLoginData] = useState(null); // Added missing state

    const canSubmit = useMemo(
        () => !!employeeCode.trim() && !!instruction.trim() && !loading,
        [employeeCode, instruction, loading]
    );

    const resetAll = () => {
        setEmployeeCode("");
        setInstruction("");
        setLoading(false);
        setStep(0);
        setError("");
        setResult(null);
        setCompletedAt(null);
        setLoginData(null);
    };

    const handleUnauthorized = () => {
        clearAllAuth?.();
        const redirect = encodeURIComponent(location.pathname + location.search);
        navigate(`/login?redirect=${redirect}`, { replace: true });
    };

    const runFlow = async () => {
        setError("");
        setResult(null);
        setCompletedAt(null);
        setLoginData(null);
        setLoading(true);

        try {
            // ===== B1: register-teacher (cần Authorization) =====
            setStep(1);
            const regRes = await fetch(`${API_BASE}/Auth/register-teacher`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify({
                    employeeCode: employeeCode.trim(),
                    instruction: instruction.trim(),
                }),
                mode: "cors",
            });

            if (regRes.status === 401) return handleUnauthorized();
            if (!regRes.ok)
                throw new Error(
                    (await safeErr(regRes)) ||
                    `Register teacher failed (HTTP ${regRes.status})`
                );

            // ===== B2: refresh-token bằng refreshToken đang lưu =====
            const storedRefresh = getRefreshToken();
            if (!storedRefresh) {
                throw new Error(
                    "Không tìm thấy refreshToken trong trình duyệt. Vui lòng đăng nhập lại rồi thử nâng cấp."
                );
            }

            setStep(2);
            const refRes = await fetch(`${API_BASE}/Auth/refresh-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: storedRefresh }),
                mode: "cors",
            });
            if (refRes.status === 401) return handleUnauthorized();
            if (!refRes.ok)
                throw new Error(
                    (await safeErr(refRes)) ||
                    `Refresh token failed (HTTP ${refRes.status})`
                );

            const refJson = await refRes.json();

            // Ghi lại token mới vào localStorage để phiên FE cập nhật ngay
            setTokens({
                accessToken: refJson?.token,
                refreshToken: refJson?.refreshToken,
            });

            setResult(refJson);
            setCompletedAt(new Date());

            // Cập nhật app_user để Header thấy ngay teacherId
            try {
                const cur = JSON.parse(localStorage.getItem("app_user") || "null") || {};
                const next = {
                    ...cur,
                    userId: refJson.userId ?? cur.userId ?? null,
                    fullName: refJson.fullName ?? cur.fullName ?? cur.name ?? "User",
                    name: refJson.fullName ?? cur.name ?? "User",
                    studentId: refJson.studentId ?? cur.studentId ?? null,
                    teacherId: refJson.teacherId ?? cur.teacherId ?? null,
                    roles: Array.isArray(cur.roles) ? cur.roles : [],
                };
                localStorage.setItem("app_user", JSON.stringify(next));
                window.dispatchEvent(new Event("app_user_updated"));
            } catch { }
        } catch (e) {
            const msg = String(e?.message || e || "");
            if (msg.toLowerCase().includes("cors")) {
                setError(
                    "CORS bị chặn. Hãy bật CORS trên API (AllowOrigin http://localhost:5173) và chắc chắn endpoint tồn tại (/api/Auth/register-teacher)."
                );
            } else {
                setError(msg || "Đã có lỗi xảy ra trong quá trình nâng cấp.");
            }
        } finally {
            setLoading(false);
            setStep(0);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <HeroSection />
            <main className="w-full max-w-3xl mx-auto px-6 lg:px-0 py-8 space-y-8">
                <UpgradeForm
                    employeeCode={employeeCode}
                    setEmployeeCode={setEmployeeCode}
                    instruction={instruction}
                    setInstruction={setInstruction}
                    loading={loading}
                    canSubmit={canSubmit}
                    runFlow={runFlow}
                    resetAll={resetAll}
                    error={error}
                    step={step}
                />
                <UpgradeResult
                    result={result}
                    completedAt={completedAt}
                    loginData={loginData}
                />
            </main>
            <Footer />
        </div>
    );
}
