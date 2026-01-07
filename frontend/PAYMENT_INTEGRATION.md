# Hướng dẫn tích hợp thanh toán Sepay - Frontend

## 1. Flow thanh toán

```
User chọn khóa học → Tạo Order → Hiển thị thông tin CK → User chuyển khoản → 
Sepay webhook → Backend xử lý → Auto enroll → Thông báo thành công
```

## 2. API Endpoints

### 2.1. Tạo Order
```javascript
POST /api/Orders
Authorization: Bearer <token>

Request:
{
  "orderDetails": [
    {
      "courseId": "course-id-1",
      "price": 500000
    }
  ]
}

Response:
{
  "orderId": "abc123",
  "totalPrice": 500000,
  "status": "pending",
  "createdAt": "2026-01-06T10:00:00Z"
}
```

### 2.2. Lấy thông tin ngân hàng
```javascript
GET /api/Payment/bank-info/{orderId}
Authorization: Bearer <token>

Response:
{
  "orderId": "abc123",
  "amount": 500000,
  "bankAccount": "0972229142",
  "bankName": "MB",
  "accountHolder": "NGUYEN VAN A",
  "transferContent": "ELNabc123",
  "qrCodeUrl": "https://img.vietqr.io/image/MB-0972229142-compact2.jpg?amount=500000&addInfo=ELNabc123"
}
```

### 2.3. Kiểm tra trạng thái Order
```javascript
GET /api/Orders/{orderId}
Authorization: Bearer <token>

Response:
{
  "orderId": "abc123",
  "status": "paid", // hoặc "pending"
  "totalPrice": 500000,
  "createdAt": "2026-01-06T10:00:00Z",
  "updatedAt": "2026-01-06T10:05:00Z"
}
```

## 3. Component mẫu - PaymentModal.jsx

```jsx
import { useState, useEffect } from 'react';
import { http } from '../utils/http';

export default function PaymentModal({ orderId, onClose, onSuccess }) {
  const [bankInfo, setBankInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchBankInfo();
    // Poll để check payment status
    const interval = setInterval(checkPaymentStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchBankInfo = async () => {
    try {
      const res = await http(`/api/Payment/bank-info/${orderId}`);
      const data = await res.json();
      setBankInfo(data);
    } catch (error) {
      console.error('Error fetching bank info:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (checking) return;
    setChecking(true);
    try {
      const res = await http(`/api/Orders/${orderId}`);
      const data = await res.json();
      if (data.status === 'paid') {
        onSuccess();
      }
    } catch (error) {
      console.error('Error checking payment:', error);
    } finally {
      setChecking(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Đã copy!');
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>
        
        {/* QR Code */}
        <div className="mb-4 text-center">
          <img 
            src={bankInfo.qrCodeUrl} 
            alt="QR Code" 
            className="mx-auto w-64 h-64 object-contain"
          />
          <p className="text-sm text-gray-600 mt-2">
            Quét mã QR để thanh toán tự động
          </p>
        </div>

        {/* Thông tin chuyển khoản */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ngân hàng:</span>
            <span className="font-semibold">{bankInfo.bankName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Số tài khoản:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{bankInfo.bankAccount}</span>
              <button 
                onClick={() => copyToClipboard(bankInfo.bankAccount)}
                className="text-blue-600 text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Chủ tài khoản:</span>
            <span className="font-semibold">{bankInfo.accountHolder}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Số tiền:</span>
            <span className="font-semibold text-red-600">
              {bankInfo.amount.toLocaleString('vi-VN')} đ
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nội dung CK:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-red-600">
                {bankInfo.transferContent}
              </span>
              <button 
                onClick={() => copyToClipboard(bankInfo.transferContent)}
                className="text-blue-600 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Lưu ý */}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Lưu ý:</strong> Vui lòng ghi chính xác nội dung chuyển khoản 
            để hệ thống tự động xác nhận thanh toán.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={checkPaymentStatus}
            disabled={checking}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {checking ? 'Đang kiểm tra...' : 'Kiểm tra thanh toán'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
```

## 4. Sử dụng trong trang Course Detail

```jsx
import { useState } from 'react';
import PaymentModal from './PaymentModal';
import { http } from '../utils/http';

export default function CourseDetail({ course }) {
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleEnroll = async () => {
    try {
      // Tạo order
      const res = await http('/api/Orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDetails: [{
            courseId: course.id,
            price: course.price
          }]
        })
      });
      
      const data = await res.json();
      setOrderId(data.orderId);
      setShowPayment(true);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng');
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    alert('Thanh toán thành công! Bạn đã được ghi danh vào khóa học.');
    // Redirect hoặc reload
    window.location.href = '/s/enrollments';
  };

  return (
    <div>
      <h1>{course.title}</h1>
      <p>Giá: {course.price.toLocaleString('vi-VN')} đ</p>
      
      <button 
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Đăng ký học
      </button>

      {showPayment && (
        <PaymentModal
          orderId={orderId}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
```

## 5. Polling vs WebSocket

### Polling (đơn giản hơn):
```javascript
// Check mỗi 5 giây
const interval = setInterval(checkPaymentStatus, 5000);
```

### WebSocket (real-time hơn):
```javascript
// Backend cần implement SignalR hub
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/payment")
  .build();

connection.on("PaymentConfirmed", (orderId) => {
  if (orderId === currentOrderId) {
    onSuccess();
  }
});
```

## 6. Testing

1. Tạo order test
2. Copy thông tin chuyển khoản
3. Dùng Postman gửi webhook giả:

```bash
POST http://localhost:5102/api/Payment/webhook/sepay
Content-Type: application/json

{
  "id": 92704,
  "gateway": "MB Bank",
  "transactionDate": "2026-01-06 14:02:37",
  "accountNumber": "0972229142",
  "code": null,
  "content": "ELN<your-order-id>",
  "transferType": "in",
  "transferAmount": 500000,
  "accumulated": 19077000,
  "subAccount": null,
  "referenceCode": "MBVCB.3278907687",
  "description": ""
}
```

4. Kiểm tra order status đã chuyển sang "paid"
5. Kiểm tra enrollment đã được tạo

## 7. Error Handling

```javascript
try {
  const res = await http('/api/Payment/bank-info/' + orderId);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Có lỗi xảy ra');
  }
  const data = await res.json();
  // ...
} catch (error) {
  console.error(error);
  toast.error(error.message);
}
```
