# BT2.WEB_APACHE
## 2.1. Cài đặt Apache web server:
### Bước 1: Kiểm tra IIS 
- Mục đích của vô hiệu hoá IIS là để tránh xung cổng 80 giữa IIS và Apache
- Nhấn Start -> gõ " cmd " -> chọn "Run as administrator"
### Bước 2: Tải và cài Apache
### Bước 3: Cấu hình Apache

Để tạo website có domain: `phuonganhnguyet.com` ta phải tạo domain cục bộ:

#### Cấu hình file `httpd.conf` 

Mở file `D:\Apache24\Apache24\conf\httpd.conf` rồi thực hiện:
- Sửa đường link gốc:

<img width="878" height="654" alt="image" src="https://github.com/user-attachments/assets/10bc76f0-6431-4fcb-a1cb-367fbabb2702" />

- Kích hoạt file Virtual Hosts: Tìm dòng `#Include conf/extra/httpd-vhosts.conf` và bỏ dấu # ở đầu dòng.

#### Cấu hình file virtualHost (httpd-vhosts.conf)

- Mở file `D:\Apache24\Apache24\conf\extra\httpd-vhosts.conf`

<img width="726" height="236" alt="image" src="https://github.com/user-attachments/assets/74b0df01-f6fb-4400-84a4-817983c000c3" />

Tạo thư mục chứa website tại `D:\Apache24\Apache24\phuonganhnguyet`

- Tạo 1 file inder trong thư mục này

### Bước 4: Fake IP trong file hosts

- Mở file `c:\Windows\System32\drivers\etc\hosts` bằng notepad và thêm dòng `127.0.0.1 phuonganhnguyet.com` sau đó lưu lại.

### Bước 5: Cài đặt và khởi động lại Apache

- Mở CMD quyền Administrator sau đó gõ lệnh cài đặt và khởi động Apache:
- Lệnh cài đặt: `D:\Apache24\Apache24\bin\httpd.exe -k install`
- Lệnh khởi động: `D:\Apache24\Apache24\bin\httpd.exe -k start`

<img width="1268" height="357" alt="image" src="https://github.com/user-attachments/assets/2a640a1b-6d85-4168-9fef-ebaeeaa9f16c" />


- Kết quả sau khi cài đặt và chạy:

<img width="1903" height="1023" alt="image" src="https://github.com/user-attachments/assets/50378e8b-b584-477e-a694-d17c1e20d283" />


## 2.2. Cài đặt nodejs và nodered => Dùng làm backend 

#### Cài đặt nodejs

- Truy cập vào `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi` để download nodejs về máy.
- Sau khi download về máy, cài đặt nodejs vào thư mục `D:\nodejs`

#### Cài đặt Node-Red
Bước 1: Mở CMD quyền Administrator

- Trỏ vào thư mục `D:\nodejs`
- Chạy lệnh: `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"` để cài đặt Node-Red

<img width="1016" height="225" alt="image" src="https://github.com/user-attachments/assets/8d6c752d-d575-477e-849f-3f23cdbffa4f" />

Bước 2: Cài đặt NSSM

- Truy cập vào `https://nssm.cc/release/nssm-2.24.zip` để download file. Sau đó giải nén và được file nssm.exe
- Copy file  `nssm.exe` vào thư mục
- Tạo file `D:\nodejs\nodered\run-nodered.cmd` với 5 dòng sau để khởi động nodered:

<img width="1244" height="601" alt="image" src="https://github.com/user-attachments/assets/cce56ba8-6ef3-4c3b-8896-63d3f9f6d771" />

<img width="1237" height="676" alt="image" src="https://github.com/user-attachments/assets/d1de0fb2-9447-4050-a228-780a65b2c4fc" />

Bước 3: Cài đặt Node red thành Windows Service

- Mở CMD, run as administrator sau đó trỏ đến thư mục: `D:\nodejs\nodered`
- Chạy lệnh `nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"` để chạy `servide a1-nodered`
- Chạy lệnh `nssm start a1-nodered`

<img width="993" height="351" alt="image" src="https://github.com/user-attachments/assets/c6a7409f-142e-46f1-9327-bb97f59182e7" />

- Sau khi cài đặt xong, node red sẽ hoạt động ở `http://localhost:1880`

<img width="1920" height="1074" alt="image" src="https://github.com/user-attachments/assets/6048251c-6659-4b66-942f-5429a23f80a3" />

## 2.3. Tạo CSDL tuỳ ý trên mssql (SQL Server 2022)
#### Thiết kế CSDL chứa các thông tin về shop Mỹ Phẩm trên hệ thống.
`Server_name: DESKTOP-3223L00\NGUYET
DB_name:QLShop_MyPham
Table_name:SPMyPham
Port 1433`

- Tạo bảng CSDL:

<img width="1880" height="942" alt="image" src="https://github.com/user-attachments/assets/9349ed09-c52e-4a74-b4f0-dd7bf0d69584" />

- Nhập dữ liệu demo:

<img width="1920" height="667" alt="image" src="https://github.com/user-attachments/assets/75649755-b1f7-41f3-8362-6680c0f36d22" />

## 2.4. Cài đặt thư viện trên Node-Red
#### Bước 1. Mở Node-Red trên trình duyệt bằng url http://localhost:1880, chọn Manage palette và mở tap Install
Cài các thư viện sau:

 - node-red-contrib-mssql-plus: Kết nối SQL Server
 - node-red-node-mysql: Kết nối MySQL 
 - node-red-contrib-telegrambot: Gửi thông báo qua Telegram
 - node-red-contrib-moment: Xử lí thời gian dễ dàng
 - node-red-contrib-influxdb: Kết nối cơ sở dữ liệu InfluxDB
 - node-red-contrib-duckdns: Cập nhật IP cho tên miền DuckDNS
 - node-red-contrib-cron-plus: Lập lịch công việc tự động (Cron jobs)
 HÌNH ẢNH
#### Bước 2: Thêm đăng nhập Admin
  - Mở file cấu hình settings.js: `D:\nodejs\nodered\work\settings.js`
  - Tìm đến chỗ adminAuth, bỏ // ở đầu dòng (8 dòng) và thay chuỗi mã hóa mật khẩu bằng chuỗi mới:
 
  HÌNH ẢNH

- Mã hoá mật khẩu có thể thiết lập bằng tool: `https://tms.tnut.edu.vn/pw.php`
- Chạy lại nodered bằng cách: mở cmd, vào thư mục: `D:\nodejs\nodered` và chạy lệnh: `nssm restart a1-nodered`
  HÌNH ẢNH
  
- khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: `http://localhost:1880`
  ÌNH ẢNH

## 2.5. Tạo API back-end bằng nodered

- Tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- Thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- Logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây):
  
