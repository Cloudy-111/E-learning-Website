// // src/pages/Payment.jsx
// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/header";
// import Footer from "../components/footer";

// /* ========== helpers: full-width section ========== */
// const Section = ({ id, title, subtitle, action, children }) => (
//   <section id={id} className="w-screen overflow-x-hidden py-10 lg:py-14">
//     <div className="w-screen px-6 lg:px-12">
//       {(title || subtitle || action) && (
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             {title && <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>}
//             {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
//           </div>
//           {action}
//         </div>
//       )}
//       {children}
//     </div>
//   </section>
// );

// const Primary = ({ children, className = "", ...props }) => (
//   <button
//     className={
//       "rounded-full bg-[#54c3be] text-white px-5 py-3 hover:opacity-95 transition " +
//       className
//     }
//     {...props}
//   >
//     {children}
//   </button>
// );

// /* ========== mock cart ========== */
// const CART = [
//   { id: "i1", title: "Lorem ipsum dollar...", note: "sed do eiusmod tempor adipising elit", price: 24.69 },
//   { id: "i2", title: "adipising elit, sed do eiusmod tempor", note: "", price: 24.69 },
// ];

// const OFFERS = Array.from({ length: 3 }).map((_, i) => ({
//   id: i,
//   badge: i === 1 ? "10%" : "50%",
//   title: "Lorem ipsum dolor",
//   lines: [
//     "Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor",
//     "Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor",
//   ],
// }));

// /* ========== components ========== */
// function CheckoutForm({ onSubmit }) {
//   const [type, setType] = useState("visa");
//   const [save, setSave] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     number: "",
//     exp: "",
//     cvc: "",
//   });

//   const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSubmit?.({ ...form, type, save });
//       }}
//       className="rounded-2xl border bg-white p-6 grid gap-5"
//     >
//       <div>
//         <label className="block text-sm font-medium">Cart Type</label>
//         <div className="mt-2 flex flex-wrap gap-3">
//           {["visa", "master", "amex"].map((t) => (
//             <label key={t} className="inline-flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="cardtype"
//                 className="accent-[#54c3be]"
//                 checked={type === t}
//                 onChange={() => setType(t)}
//               />
//               <span className="capitalize">{t}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Name on Card</label>
//         <input
//           value={form.name}
//           onChange={set("name")}
//           placeholder="Enter name on Card"
//           className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Card Number</label>
//         <input
//           value={form.number}
//           onChange={set("number")}
//           placeholder="Enter Card Number"
//           inputMode="numeric"
//           className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium">
//             Expiration Date <span className="text-slate-400">(MM/YY)</span>
//           </label>
//           <input
//             value={form.exp}
//             onChange={set("exp")}
//             placeholder="Enter Expiration Date"
//             className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">CVC</label>
//           <input
//             value={form.cvc}
//             onChange={set("cvc")}
//             placeholder="Enter CVC"
//             inputMode="numeric"
//             className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
//             required
//           />
//         </div>
//       </div>

//       <label className="inline-flex items-center gap-2">
//         <input
//           type="checkbox"
//           className="accent-[#54c3be]"
//           checked={save}
//           onChange={(e) => setSave(e.target.checked)}
//         />
//         <span className="text-sm">Save my information for faster checkout</span>
//       </label>

//       <Primary type="submit" className="w-full">Confirm Payment</Primary>
//     </form>
//   );
// }

// function Summary({ items, couponPct = 0, taxPct = 5 }) {
//   const { subtotal, tax, total } = useMemo(() => {
//     const subtotal = items.reduce((s, it) => s + it.price, 0);
//     const discount = (subtotal * couponPct) / 100;
//     const taxed = subtotal - discount;
//     const tax = (taxed * taxPct) / 100;
//     return { subtotal, tax, total: +(taxed + tax).toFixed(2) };
//   }, [items, couponPct, taxPct]);

//   return (
//     <aside className="lg:sticky lg:top-20 h-fit rounded-2xl border bg-white p-6">
//       <h3 className="text-lg font-semibold mb-4">Summary</h3>

//       <div className="space-y-4">
//         {items.map((it) => (
//           <div key={it.id} className="flex items-start justify-between gap-3">
//             <div>
//               <div className="font-medium leading-tight">{it.title}</div>
//               {it.note && <div className="text-xs text-slate-500">{it.note}</div>}
//             </div>
//             <div className="font-semibold">${it.price.toFixed(2)}</div>
//           </div>
//         ))}
//       </div>

//       <div className="h-px bg-slate-200 my-4" />

//       <dl className="space-y-2 text-sm">
//         <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
//         <div className="flex justify-between"><dt>Coupon Discount</dt><dd>{couponPct} %</dd></div>
//         <div className="flex justify-between"><dt>TAX</dt><dd>{taxPct}</dd></div>
//       </dl>

//       <div className="mt-3 flex justify-between text-lg font-bold">
//         <span>Total</span>
//         <span>${total.toFixed(2)}</span>
//       </div>
//     </aside>
//   );
// }

// /* ========== Offers grid ========== */
// function Offers() {
//   return (
//     <Section
//       id="offers"
//       title="Top Education offers and deals are listed here"
//       action={<Link to="#" className="text-[#54c3be]">See all</Link>}
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {OFFERS.map((o) => (
//           <article key={o.id} className="relative rounded-2xl border bg-white p-6">
//             <span className="absolute -top-3 right-4 text-xs rounded-full bg-[#54c3be] text-white px-3 py-1">
//               {o.badge}
//             </span>
//             <h4 className="font-semibold">{o.title}</h4>
//             <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
//               {o.lines.map((L, i) => <li key={i}>{L}</li>)}
//             </ul>
//           </article>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ========== Page ========== */
// export default function Payment() {
//   return (
//     <>
//       {/* HERO */}
//       <Header />
//       <Section id="hero" title="Checkout" />

//       {/* MAIN two columns */}
//       <section className="w-screen overflow-x-hidden">
//         <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <CheckoutForm onSubmit={() => alert("Demo: confirmed!")} />
//           </div>
//           <div className="lg:col-span-1">
//             <Summary items={CART} couponPct={0} taxPct={5} />
//           </div>
//         </div>
//       </section>

//       <Offers />
//       <Footer />
//     </>
//   );
// }




// src/pages/Payment.jsx
"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* ========== helpers: full-width section ========== */
const Section = ({ id, title, subtitle, action, children }) => (
  <section id={id} className="w-screen overflow-x-hidden py-10 lg:py-14">
    <div className="w-screen px-6 lg:px-12">
      {(title || subtitle || action) && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {title && <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{title}</h2>}
            {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  </section>
);

const Primary = ({ children, className = "", ...props }) => (
  <button
    className={
      "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

const Ghost = ({ children, className = "", ...props }) => (
  <button
    className={
      "rounded-full border border-[#2563eb] text-[#2563eb] px-5 py-3 hover:bg-[#2563eb]/10 focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

/* ========== mock cart (VNĐ) ========== */
const CART = [
  { id: "i1", title: "Khoá IELTS Listening Intensive", note: "Trọn đời • Cập nhật miễn phí", price: 699000 },
  { id: "i2", title: "Bộ Flashcards IELTS 3000", note: "Gói 12 tháng", price: 199000 },
];

/* ========== Ưu đãi ========== */
const OFFERS = [
  {
    id: 1,
    badge: "10%",
    title: "Giảm 10% cho HSSV",
    lines: ["Nhập mã HSSV10", "Yêu cầu ảnh thẻ sinh viên khi cần xác minh."],
  },
  {
    id: 2,
    badge: "50%",
    title: "Ưu đãi trung tâm",
    lines: ["Tối thiểu 10 tài khoản", "Liên hệ tư vấn để nhận báo giá nhóm."],
  },
  {
    id: 3,
    badge: "Miễn phí",
    title: "Khóa học dùng thử",
    lines: ["Không cần thẻ thanh toán", "Kích hoạt trong 7 ngày."],
  },
];

/* ========== components ========== */
function CheckoutForm({ onSubmit }) {
  const [method, setMethod] = useState("vnpay"); // vnpay | momo | card
  const [save, setSave] = useState(true);
  const [form, setForm] = useState({
    name: "",
    number: "",
    exp: "",
    cvc: "",
  });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const isCard = method === "card";

  const validate = () => {
    if (isCard) {
      if (!/^\d{12,19}$/.test(form.number.replace(/\s|-/g, ""))) return "Số thẻ không hợp lệ.";
      if (!/^\d{2}\/\d{2}$/.test(form.exp)) return "Hạn thẻ (MM/YY) không hợp lệ.";
      if (!/^\d{3,4}$/.test(form.cvc)) return "CVC không hợp lệ.";
      if (form.name.trim().length < 3) return "Vui lòng nhập tên trên thẻ.";
    }
    return "";
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const msg = validate();
        if (msg) {
          setError(msg);
          return;
        }
        setError("");
        onSubmit?.({ ...form, method, save });
      }}
      className="rounded-2xl border bg-white p-6 grid gap-5"
    >
      <div>
        <label className="block text-sm font-medium text-slate-900">Phương thức thanh toán</label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label className={`inline-flex items-center gap-2 rounded-xl border p-3 cursor-pointer ${method === "vnpay" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-slate-200"}`}>
            <input
              type="radio"
              name="paymethod"
              className="accent-[#2563eb]"
              checked={method === "vnpay"}
              onChange={() => setMethod("vnpay")}
            />
            <span>VNPay</span>
          </label>
          <label className={`inline-flex items-center gap-2 rounded-xl border p-3 cursor-pointer ${method === "momo" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-slate-200"}`}>
            <input
              type="radio"
              name="paymethod"
              className="accent-[#2563eb]"
              checked={method === "momo"}
              onChange={() => setMethod("momo")}
            />
            <span>MoMo</span>
          </label>
          <label className={`inline-flex items-center gap-2 rounded-xl border p-3 cursor-pointer ${method === "card" ? "border-[#2563eb] bg-[#2563eb]/5" : "border-slate-200"}`}>
            <input
              type="radio"
              name="paymethod"
              className="accent-[#2563eb]"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            <span>Thẻ quốc tế (Visa/Master/Amex)</span>
          </label>
        </div>
      </div>

      {isCard ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900">Tên trên thẻ</label>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="VD: NGUYEN VAN A"
                className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                required={isCard}
                aria-label="Tên trên thẻ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Số thẻ</label>
              <input
                value={form.number}
                onChange={set("number")}
                placeholder="#### #### #### ####"
                inputMode="numeric"
                className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                required={isCard}
                aria-label="Số thẻ"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Hạn thẻ <span className="text-slate-500">(MM/YY)</span>
              </label>
              <input
                value={form.exp}
                onChange={set("exp")}
                placeholder="MM/YY"
                className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                required={isCard}
                aria-label="Hạn thẻ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">CVC</label>
              <input
                value={form.cvc}
                onChange={set("cvc")}
                placeholder="3-4 số"
                inputMode="numeric"
                className="mt-2 w-full rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                required={isCard}
                aria-label="CVC"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border p-4 bg-[#2563eb]/5 text-sm text-slate-700">
          {method === "vnpay" && (
            <p>
              Bạn sẽ được chuyển sang cổng <b>VNPay</b> để hoàn tất thanh toán an toàn. Sau khi thanh toán thành
              công, hệ thống tự động kích hoạt khoá học.
            </p>
          )}
          {method === "momo" && (
            <p>
              Bạn sẽ được chuyển sang <b>MoMo</b> để quét mã/ xác nhận thanh toán. Khoá học sẽ được kích hoạt ngay
              sau khi thanh toán.
            </p>
          )}
        </div>
      )}

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-[#2563eb]"
          checked={save}
          onChange={(e) => setSave(e.target.checked)}
        />
        <span className="text-sm">Lưu thông tin cho lần thanh toán sau</span>
      </label>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Primary type="submit" className="flex-1">Xác nhận thanh toán</Primary>
        <Ghost type="button" className="px-5">
          <Link to="/courses">Tiếp tục mua sắm</Link>
        </Ghost>
      </div>

      <p className="text-xs text-slate-500">
        Bằng việc thanh toán, bạn đồng ý với <Link to="#" className="text-[#2563eb] underline">Điều khoản sử dụng</Link> và{" "}
        <Link to="#" className="text-[#2563eb] underline">Chính sách bảo mật</Link>.
      </p>
    </form>
  );
}

function Summary({ items, initialCoupon = "", vatPct = 10 }) {
  const [coupon, setCoupon] = useState(initialCoupon);
  const [applied, setApplied] = useState(0); // % giảm

  const fmtVND = (v) => v.toLocaleString("vi-VN") + " đ";

  const { subtotal, discount, vat, total } = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.price, 0);
    const discount = Math.round((subtotal * applied) / 100);
    const taxedBase = Math.max(0, subtotal - discount);
    const vat = Math.round((taxedBase * vatPct) / 100);
    const total = taxedBase + vat;
    return { subtotal, discount, vat, total };
  }, [items, applied, vatPct]);

  const applyCoupon = (e) => {
    e.preventDefault();
    // Demo rule
    const code = coupon.trim().toUpperCase();
    if (code === "HSSV10") setApplied(10);
    else if (code === "WELCOME5") setApplied(5);
    else if (!code) setApplied(0);
    else setApplied(0);
  };

  return (
    <aside className="lg:sticky lg:top-20 h-fit rounded-2xl border bg-white p-6">
      <h3 className="text-lg font-semibold mb-4 text-slate-900">Tóm tắt đơn hàng</h3>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium leading-tight">{it.title}</div>
              {it.note && <div className="text-xs text-slate-500">{it.note}</div>}
            </div>
            <div className="font-semibold">{fmtVND(it.price)}</div>
          </div>
        ))}
      </div>

      <form onSubmit={applyCoupon} className="mt-4 flex items-center gap-2">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Nhập mã giảm giá (VD: HSSV10)"
          className="flex-1 rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
          aria-label="Mã giảm giá"
        />
        <Ghost type="submit" className="px-4 py-2">Áp dụng</Ghost>
      </form>

      <div className="h-px bg-slate-200 my-4" />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt>Tạm tính</dt><dd>{fmtVND(subtotal)}</dd></div>
        <div className="flex justify-between"><dt>Giảm giá</dt><dd>- {applied}% {applied ? `(${fmtVND(discount)})` : ""}</dd></div>
        <div className="flex justify-between"><dt>VAT</dt><dd>{vatPct}% ({fmtVND(vat)})</dd></div>
      </dl>

      <div className="mt-3 flex justify-between text-lg font-bold">
        <span>Tổng cộng</span>
        <span>{fmtVND(total)}</span>
      </div>

      <p className="text-xs text-slate-500 mt-2">
        Giá đã bao gồm VAT nếu có. Mọi khoá học đều kèm hoá đơn điện tử khi yêu cầu.
      </p>
    </aside>
  );
}

/* ========== Offers grid ========== */
function Offers() {
  return (
    <Section
      id="offers"
      title="Ưu đãi hiện có"
      action={<Link to="#" className="text-[#2563eb]">Xem tất cả</Link>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFERS.map((o) => (
          <article key={o.id} className="relative rounded-2xl border bg-white p-6">
            <span className="absolute -top-3 right-4 text-xs rounded-full bg-[#2563eb] text-white px-3 py-1">
              {o.badge}
            </span>
            <h4 className="font-semibold text-slate-900">{o.title}</h4>
            <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
              {o.lines.map((L, i) => <li key={i}>{L}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ========== Page ========== */
export default function Payment() {
  return (
    <>
      <Header />

      {/* HERO */}
      <Section
        id="hero"
        title="Thanh toán"
        subtitle="Hoàn tất đơn hàng của bạn bằng một trong các phương thức bên dưới."
        action={<Link to="/courses" className="text-[#2563eb]">Tiếp tục xem khoá học</Link>}
      />

      {/* MAIN two columns */}
      <section className="w-screen overflow-x-hidden">
        <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={() => alert("Demo: Thanh toán đã xác nhận!")} />
          </div>
          <div className="lg:col-span-1">
            <Summary items={CART} initialCoupon="" vatPct={10} />
          </div>
        </div>
      </section>

      <Offers />
      <Footer />
    </>
  );
}
