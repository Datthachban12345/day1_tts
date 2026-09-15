# 📋 TÀI LIỆU YÊU CẦU NGƯỜI DÙNG THEO CHUẨN INVEST (USER STORIES)
## Dự án: Home Viewing Booking System (Hệ thống Đặt lịch Xem Nhà)
* **Phiên bản:** Phase 1 (MVP)
* **Tiêu chuẩn áp dụng:** INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) & Gherkin (Given-When-Then)

---

## 📌 Bảng tóm tắt ma trận User Stories (MVP Scope)

| Story ID | Nhóm vai trò | Tên User Story | Độ ưu tiên | Điểm Story Point (Est) |
| :--- | :--- | :--- | :---: | :---: |
| **US-CUST-01** | Customer | Đăng ký & Đăng nhập tài khoản | High | 3 |
| **US-CUST-02** | Customer | Tìm kiếm & Lọc bất động sản | High | 5 |
| **US-CUST-03** | Customer | Xem thông tin chi tiết BĐS & Media | High | 3 |
| **US-CUST-04** | Customer | Đặt lịch xem nhà theo khung giờ rảnh | High | 8 |
| **US-CUST-05** | Customer | Xem danh sách & Lịch sử trạng thái booking | Medium | 3 |
| **US-CUST-06** | Customer | Hủy yêu cầu đặt lịch xem nhà | Medium | 3 |
| **US-CUST-07** | Customer | Nhận thông báo biến động trạng thái booking | Medium | 3 |
| **US-SALE-01** | Sales Staff | Thiết lập lịch làm việc / Ca rảnh (Availability) | High | 5 |
| **US-SALE-02** | Sales Staff | Tiếp nhận & Phê duyệt / Từ chối lịch hẹn | High | 5 |
| **US-SALE-03** | Sales Staff | Xác nhận hoàn thành buổi xem nhà | Medium | 2 |
| **US-SALE-04** | Sales Staff | Quản lý danh sách lịch hẹn & Ghi chú khách hàng | Medium | 3 |
| **US-ADMN-01** | Administrator | Quản lý tài khoản người dùng & Phân quyền RBAC | High | 5 |
| **US-ADMN-02** | Administrator | Quản lý thông tin & Media bất động sản | High | 5 |
| **US-ADMN-03** | Administrator | Giám sát toàn bộ booking và lịch sử kiểm toán | Medium | 3 |

---

## 👤 1. Phân hệ Khách hàng (Customer User Stories)

### 🔹 US-CUST-01: Đăng ký & Đăng nhập tài khoản
* **User Story:**  
  Là một **Khách hàng mới**,  
  Tôi muốn **đăng ký tài khoản bằng email/mật khẩu và đăng nhập vào hệ thống**,  
  Để **tôi có thể sử dụng các tính năng đặt lịch và lưu trữ lịch sử cá nhân**.
* **Đánh giá theo tiêu chí INVEST:**
  * **I (Independent):** Độc lập với việc tìm kiếm hay đặt lịch xem nhà.
  * **N (Negotiable):** Có thể mở rộng xác thực qua Google/Facebook trong các phase sau.
  * **V (Valuable):** Cung cấp định danh để bảo mật thông tin và cá nhân hóa lịch hẹn.
  * **E (Estimable):** Ước lượng rõ ràng (3 Story Points).
  * **S (Small):** Gói gọn trong việc xác thực JWT và lưu thông tin User.
  * **T (Testable):** Có thể kiểm thử tự động (Unit Test / API Test).
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Đăng ký thành công**
    * *Given* Khách hàng chưa có tài khoản trên hệ thống.
    * *When* Khách hàng nhập họ tên, email hợp lệ, số điện thoại và mật khẩu (tối thiểu 6 ký tự).
    * *Then* Hệ thống tạo tài khoản mới với vai trò `CUSTOMER`, mã hóa mật khẩu bằng bcrypt và trả về thông báo thành công kèm JWT token.
  * **Scenario 2: Đăng ký thất bại do trùng email**
    * *Given* Email `user@example.com` đã tồn tại trong hệ thống.
    * *When* Khách hàng đăng ký với email này.
    * *Then* Hệ thống từ chối và trả về lỗi HTTP 409 Conflict với thông báo "Email đã được sử dụng".

---

### 🔹 US-CUST-02: Tìm kiếm & Lọc bất động sản
* **User Story:**  
  Là một **Khách hàng**,  
  Tôi muốn **tìm kiếm và lọc danh sách bất động sản theo tiêu chí (quận/huyện, khoảng giá, diện tích, số phòng ngủ, loại BĐS)**,  
  Để **tôi nhanh chóng tìm được căn nhà phù hợp với nhu cầu và ngân sách**.
* **Đánh giá theo tiêu chí INVEST:**
  * **I:** Độc lập với chức năng đặt lịch.
  * **N:** Có thể thay đổi các bộ lọc linh hoạt.
  * **V:** Tăng trải nghiệm và tiết kiệm thời gian tìm kiếm của khách hàng.
  * **E:** 5 Story Points.
  * **S:** Vừa vặn trong 1 Sprint.
  * **T:** Kiểm thử qua các bộ tham số query params khác nhau.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Lọc BĐS với nhiều tiêu chí kết hợp**
    * *Given* Khách hàng đang ở trang danh sách BĐS.
    * *When* Khách hàng chọn Quận "Cầu Giấy", mức giá từ "2 tỷ" đến "5 tỷ", số phòng ngủ ">= 2".
    * *Then* Hệ thống trả về danh sách các BĐS đang ở trạng thái `AVAILABLE` thỏa mãn tất cả các điều kiện trên kèm thông tin phân trang.
  * **Scenario 2: Không tìm thấy kết quả phù hợp**
    * *Given* Bộ tiêu chí tìm kiếm không khớp với bất kỳ BĐS nào trong DB.
    * *When* Khách hàng thực hiện lọc.
    * *Then* Hệ thống hiển thị danh sách rỗng kèm thông điệp hướng dẫn điều chỉnh bộ lọc.

---

### 🔹 US-CUST-03: Xem chi tiết bất động sản
* **User Story:**  
  Là một **Khách hàng**,  
  Tôi muốn **xem đầy đủ thông tin chi tiết, hình ảnh gallery, địa chỉ chính xác và mô tả của căn nhà**,  
  Để **tôi có đủ cơ sở đánh giá trước khi quyết định đặt lịch xem nhà**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Xem chi tiết BĐS thành công**
    * *Given* BĐS có ID hợp lệ tồn tại trong hệ thống.
    * *When* Khách hàng nhấn vào thẻ BĐS.
    * *Then* Hệ thống hiển thị đầy đủ: Tiêu đề, giá bán/thuê, diện tích, số phòng ngủ, phòng tắm, địa chỉ chi tiết, danh sách hình ảnh (media) và nút hành động "Đặt lịch xem nhà".

---

### 🔹 US-CUST-04: Đặt lịch xem nhà (Core Booking Workflow)
* **User Story:**  
  Là một **Khách hàng đã đăng nhập**,  
  Tôi muốn **chọn ngày, khung giờ (dựa trên ca rảnh của Sale phụ trách) và nhập ghi chú để gửi yêu cầu đặt lịch xem nhà**,  
  Để **tôi được nhân viên kinh doanh tiếp đón và hướng dẫn xem nhà thực tế**.
* **Đánh giá theo tiêu chí INVEST:**
  * **I:** Độc lập với quy trình quản lý BĐS hay phê duyệt của Admin.
  * **N:** Có thể đàm phán về thời gian tối thiểu được phép đặt trước (e.g. trước 2 tiếng).
  * **V:** Giá trị cốt lõi số 1 của toàn bộ hệ thống.
  * **E:** 8 Story Points (do bao gồm Transaction và kiểm tra xung đột lịch).
  * **S:** Chia nhỏ thành: Check ca rảnh $\rightarrow$ Kiểm tra trùng lịch $\rightarrow$ Ghi DB Transaction.
  * **T:** Kiểm thử tự động kịch bản thành công và kịch bản Race Condition / Trùng lịch.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Tạo lịch xem nhà thành công (Transaction trọn vẹn)**
    * *Given* Khách hàng đã đăng nhập, chọn BĐS X, ngày xem trong tương lai, khung giờ 09:00 - 10:00 (nằm trong ca rảnh của Sale Y và chưa có ai đặt).
    * *When* Khách hàng nhấn "Xác nhận đặt lịch".
    * *Then* Trong 1 Database Transaction:
      1. Tạo bản ghi `bookings` mới với trạng thái `PENDING`.
      2. Ghi bản ghi khởi tạo vào `booking_status_history` (`old_status = NULL`, `new_status = 'PENDING'`, `actor_id = customer.id`).
      3. Tạo bản ghi thông báo trong `notifications` gửi đến Sale Y.
      4. Trả về mã booking và thông báo thành công cho Khách hàng.
  * **Scenario 2: Đặt lịch thất bại do khung giờ bị trùng (Conflict Detection)**
    * *Given* Sale Y đã có một booking khác ở trạng thái `CONFIRMED` hoặc `PENDING` vào khung giờ 09:00 - 10:00 ngày Z.
    * *When* Khách hàng cố gắng đặt cùng khung giờ này.
    * *Then* Hệ thống từ chối yêu cầu, rollback dữ liệu và trả về lỗi HTTP 409 Conflict: "Khung giờ này đã có người đặt, vui lòng chọn khung giờ khác".
  * **Scenario 3: Đặt lịch ngoài ca rảnh của Sale**
    * *Given* Khung giờ khách chọn không nằm trong danh sách `sale_availability` của Sale phụ trách.
    * *When* Khách hàng gửi yêu cầu.
    * *Then* Hệ thống từ chối và trả về lỗi HTTP 400 Bad Request: "Nhân viên không có ca rảnh trong khung giờ này".

---

### 🔹 US-CUST-05: Quản lý danh sách & Lịch sử booking cá nhân
* **User Story:**  
  Là một **Khách hàng**,  
  Tôi muốn **xem danh sách tất cả các lịch hẹn tôi đã đặt và lịch sử thay đổi trạng thái của từng lịch hẹn**,  
  Để **tôi dễ dàng theo dõi tiến độ và nắm bắt kết quả phản hồi từ nhân viên kinh doanh**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Xem danh sách booking cá nhân**
    * *Given* Khách hàng đã đăng nhập.
    * *When* Khách hàng truy cập trang "My Bookings".
    * *Then* Hệ thống chỉ trả về danh sách booking của chính khách hàng đó, phân loại theo trạng thái (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `REJECTED`) và sắp xếp theo ngày hẹn gần nhất.

---

### 🔹 US-CUST-06: Hủy lịch hẹn xem nhà
* **User Story:**  
  Là một **Khách hàng**,  
  Tôi muốn **hủy một lịch hẹn xem nhà mà tôi đã đặt kèm lý do hủy**,  
  Để **giải phóng khung giờ rảnh cho nhân viên kinh doanh nếu kế hoạch cá nhân của tôi thay đổi**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Hủy booking hợp lệ**
    * *Given* Lịch hẹn đang ở trạng thái `PENDING` hoặc `CONFIRMED` và thời gian hẹn chưa diễn ra.
    * *When* Khách hàng nhấn "Hủy lịch" và nhập lý do "Bận việc đột xuất".
    * *Then* Hệ thống cập nhật trạng thái booking thành `CANCELLED`, ghi log vào `booking_status_history` kèm lý do, và tạo notification gửi đến Sale phụ trách.
  * **Scenario 2: Hủy thất bại khi booking đã kết thúc**
    * *Given* Lịch hẹn đã ở trạng thái `COMPLETED` hoặc `REJECTED`.
    * *When* Khách hàng cố gắng gửi request hủy.
    * *Then* Hệ thống từ chối với lỗi HTTP 400: "Không thể hủy lịch hẹn đã hoàn thành hoặc bị từ chối".

---

## 👔 2. Phân hệ Nhân viên Kinh doanh (Sales Staff User Stories)

### 🔹 US-SALE-01: Khai báo ca rảnh (Sales Availability)
* **User Story:**  
  Là một **Nhân viên kinh doanh (Sales Staff)**,  
  Tôi muốn **thiết lập các khung giờ rảnh làm việc theo từng ngày trong tuần**,  
  Để **khách hàng chỉ có thể đặt lịch hẹn vào những khoảng thời gian tôi có thể tiếp đón**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Tạo ca rảnh thành công**
    * *Given* Sales đăng nhập tài khoản vai trò `SALE`.
    * *When* Sales chọn Thứ Hai, khung giờ từ 08:30 đến 11:30 và từ 14:00 đến 17:30.
    * *Then* Hệ thống lưu danh sách slot vào bảng `sale_availability` và hiển thị trên lịch làm việc.

---

### 🔹 US-SALE-02: Phê duyệt hoặc Từ chối lịch hẹn
* **User Story:**  
  Là một **Nhân viên kinh doanh**,  
  Tôi muốn **xem chi tiết yêu cầu đặt lịch của khách hàng và chọn Xác nhận (Confirm) hoặc Từ chối (Reject)**,  
  Để **tôi chủ động sắp xếp công việc hoặc giải phóng lịch nếu có lý do bất khả kháng**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Xác nhận lịch hẹn**
    * *Given* Booking ở trạng thái `PENDING` được gán cho Sales này.
    * *When* Sales nhấn "Xác nhận lịch hẹn".
    * *Then* Trạng thái booking chuyển sang `CONFIRMED`, ghi nhận vào `booking_status_history` và gửi thông báo xác nhận tới Khách hàng.
  * **Scenario 2: Từ chối lịch hẹn**
    * *Given* Booking ở trạng thái `PENDING`.
    * *When* Sales nhấn "Từ chối" và nhập lý do "Trùng lịch họp đột xuất".
    * *Then* Trạng thái booking chuyển sang `REJECTED`, ghi nhận lý do vào `booking_status_history` và gửi thông báo giải thích tới Khách hàng.

---

### 🔹 US-SALE-03: Hoàn thành buổi xem nhà
* **User Story:**  
  Là một **Nhân viên kinh doanh**,  
  Tôi muốn **đánh dấu lịch hẹn là Đã hoàn thành (Complete) sau khi đã dẫn khách đi xem nhà**,  
  Để **kết thúc chu trình đặt lịch và lưu trữ lịch sử phục vụ báo cáo hiệu suất**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Hoàn thành buổi xem nhà thành công**
    * *Given* Booking đang ở trạng thái `CONFIRMED`.
    * *When* Sales nhấn "Đánh dấu đã hoàn thành" sau thời gian xem nhà.
    * *Then* Trạng thái booking chuyển sang `COMPLETED`, ghi nhận vào `booking_status_history`.

---

## 👑 3. Phân hệ Quản trị viên (Administrator User Stories)

### 🔹 US-ADMN-01: Quản lý người dùng & Phân quyền RBAC
* **User Story:**  
  Là một **Quản trị viên (Administrator)**,  
  Tôi muốn **quản lý danh sách người dùng, kích hoạt/vô hiệu hóa tài khoản và gán vai trò (`CUSTOMER`, `SALE`, `ADMIN`)**,  
  Để **đảm bảo an ninh hệ thống và cấp quyền chính xác cho nhân sự công ty**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Khóa tài khoản vi phạm**
    * *Given* Tài khoản người dùng đang hoạt động (`is_active = true`).
    * *When* Admin chuyển trạng thái thành `is_active = false`.
    * *Then* Người dùng này bị từ chối khi thực hiện bất kỳ request API nào cần xác thực (HTTP 403 Forbidden).

---

### 🔹 US-ADMN-02: Quản lý Bất động sản & Media
* **User Story:**  
  Là một **Quản trị viên**,  
  Tôi muốn **thêm mới, chỉnh sửa thông tin BĐS và tải lên/xóa hình ảnh gallery**,  
  Để **thông tin nhà đất hiển thị cho khách hàng luôn chính xác và hấp dẫn**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Thêm mới BĐS**
    * *Given* Admin nhập đầy đủ thông tin: Tiêu đề, loại BĐS, giá, diện tích, địa chỉ, số phòng ngủ/tắm và danh sách link ảnh.
    * *When* Admin nhấn "Tạo bất động sản".
    * *Then* Dữ liệu được ghi vào bảng `properties` và `property_media` với trạng thái `AVAILABLE`.

---

### 🔹 US-ADMN-03: Giám sát toàn bộ Booking & Audit Log
* **User Story:**  
  Là một **Quản trị viên**,  
  Tôi muốn **truy cập xem toàn bộ các booking trong hệ thống kèm lịch sử chuyển trạng thái bất biến**,  
  Để **tôi có cái nhìn tổng quan về hoạt động kinh doanh và giải quyết tranh chấp/khiếu nại nếu có**.
* **Tiêu chí chấp nhận (Acceptance Criteria):**
  * **Scenario 1: Tra cứu vết kiểm toán (Audit Trail)**
    * *Given* Admin chọn một booking cụ thể.
    * *When* Admin mở tab "Lịch sử trạng thái".
    * *Then* Hệ thống hiển thị dòng thời gian đầy đủ: Ai đã thay đổi (`actor_id`, role), từ trạng thái nào sang trạng thái nào, vào thời điểm nào (`created_at`) và lý do tương ứng.

---

## 🎯 Tiêu chuẩn Hoàn thành chung (Definition of Done - DoD)
Một User Story chỉ được coi là Hoàn thành (Done) khi thỏa mãn toàn bộ các điều kiện sau:
1. **Source Code:** Mã nguồn Frontend/Backend được viết hoàn chỉnh, tuân thủ Clean Code & TypeScript strict mode.
2. **Database:** Tương thích 100% với schema `database/booking.sql`, đảm bảo ràng buộc khóa ngoại và Index.
3. **Unit Tests:** Đạt độ bao phủ kiểm thử (Coverage) $> 80\%$ cho các hàm xử lý logic nghiệp vụ và chuyển trạng thái.
4. **API Spec:** Endpoint tương ứng được mô tả đầy đủ trong `docs/openapi.yaml`.
5. **Security:** Áp dụng đầy đủ Auth Token (JWT) và Middleware phân quyền RBAC.
