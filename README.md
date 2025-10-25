# BT2.WEB_APACHE
## 2.1. Cài đặt Apache web server:
### Bước 1: Kiểm tra IIS 
- Mục đích của vô hiệu hoá IIS là để tránh xung cổng 80 giữa IIS và Apache
- Nhấn Start -> gõ " cmd " -> chọn "Run as administrator"
### Bước 2: Tải và cài Apache
### Bước 3: Cấu hình Apache

Để tạo website có domain: phuonganhnguyet.com ta phải tạo domain cục bộ:

*Cấu hình file httpd.conf

Mở file "D:\Apache24\Apache24\conf\httpd.conf" rồi thực hiện:
- Sửa đường link gốc:

<img width="878" height="654" alt="image" src="https://github.com/user-attachments/assets/10bc76f0-6431-4fcb-a1cb-367fbabb2702" />

- Kích hoạt file Virtual Hosts: Tìm dòng #Include conf/extra/httpd-vhosts.conf và bỏ dấu # ở đầu dòng.

*Cấu hình file virtualHost (httpd-vhosts.conf)

- Mở file 

<img width="726" height="236" alt="image" src="https://github.com/user-attachments/assets/74b0df01-f6fb-4400-84a4-817983c000c3" />

Tạo thư mục chứa website tại D:\Apache24\Apache24\phuonganhnguyet

- Tạo 1 file inder trong thư mục này

### Bước 4: Fake IP trong file hosts

- Mở file c:\Windows\System32\drivers\etc\hosts bằng notepad và thêm dòng 127.0.0.1 phuonganhnguyet.com sau đó lưu lại.

### Bước 5: Cài đặt và khởi động lại Apache

- Mở CMD quyền Administrator sau đó gõ lệnh cài đặt và khởi động Apache:
- Lệnh cài đặt: D:\Apache24\Apache24\bin\httpd.exe -k install
- Lệnh khởi động: D:\Apache24\Apache24\bin\httpd.exe -k start

<img width="1268" height="357" alt="image" src="https://github.com/user-attachments/assets/2a640a1b-6d85-4168-9fef-ebaeeaa9f16c" />


- Kết quả sau khi cài đặt và chạy:

<img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/17732a49-9263-469d-a708-c37056e0409a" />

## 2.2. Cài đặt nodejs và nodered => Dùng làm backend 

*Cài đặt nodejs

- Truy cập vào https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi để download nodejs về máy.
- Sau khi download về máy, cài đặt nodejs vào thư mục D:\nodejs

*Cài đặt Node-Red
*Bước 1: Mở CMD quyền Administrator

- Trỏ vào thư mục D:\nodejs
- Chạy lệnh: npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered" để cài đặt Node-Red

<img width="1016" height="225" alt="image" src="https://github.com/user-attachments/assets/8d6c752d-d575-477e-849f-3f23cdbffa4f" />

*Bước 2: Cài đặt NSSM

- Truy cập vào https://nssm.cc/release/nssm-2.24.zip để download file. Sau đó giải nén và được file nssm.exe
- Copy file nssm.exe vào thư mục
- Tạo file D:\nodejs\nodered\run-nodered.cmd với 5 dòng sau để khởi động nodered:

<img width="1244" height="601" alt="image" src="https://github.com/user-attachments/assets/cce56ba8-6ef3-4c3b-8896-63d3f9f6d771" />

<img width="1237" height="676" alt="image" src="https://github.com/user-attachments/assets/d1de0fb2-9447-4050-a228-780a65b2c4fc" />

*Bước 3: Cài đặt Node red thành Windows Service

- Mở CMD, run as administrator sau đó trỏ đến thư mục: D:\nodejs\nodered
- Chạy lệnh nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd" để chạy servide
