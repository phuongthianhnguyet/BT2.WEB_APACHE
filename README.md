# BT2.WEB_APACHE
# Phương Thị Ánh Nguyệt-K225480106098
### 1. Mục tiêu của bài
Mục tiêu của bài là giúp sinh viên hiểu và thực hành quy trình xây dựng một hệ thống web hoàn chỉnh, bao gồm:

- Cài đặt và cấu hình Apache Web Server để chạy website.

- Thiết lập Node.js và Node-RED để tạo API back-end xử lý dữ liệu.

- Kết nối Node-RED với SQL Server để truy vấn cơ sở dữ liệu.

- Thiết kế giao diện front-end bằng HTML, CSS, JavaScript và tương tác với API.
## YÊU CẦU:
### 2. Nội dung bài tập
### 2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này. Ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
  
### 2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
`@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*`
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
    
### 2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
    
### 2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
  
### 2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
  
### 2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.

### 2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
##                             BÀI LÀM 

### 2. Nội dung bài tập.
### 2.1. Cài đặt Apache web server:
#### Bước 1: Kiểm tra IIS 
- Mục đích của vô hiệu hoá IIS là để tránh xung cổng 80 giữa IIS và Apache
- Nhấn `Start -> gõ " cmd " -> chọn "Run as administrator"`
- Gõ lệnh `iisreset /stop` để vô hiệu hoá IIS
#### Bước 2: Tải và cài Apache
- Truy cập trang chính thức `https://www.apachelounge.com/download/`
- Sau khi down về, phải giải nén thư mục `D:\Apache\Apache24`
#### Bước 3: Cấu hình Apache

Để tạo website có domain: `phuonganhnguyet.com` ta phải tạo domain cục bộ:

##### Cấu hình file `httpd.conf` 

- Mở file `D:\Apache\Apache24\conf\httpd.conf` rồi thực hiện:
- Sửa đường link gốc:

<img width="933" height="251" alt="image" src="https://github.com/user-attachments/assets/a0e93c63-2480-413f-b11d-1acb57922341" />


- Kích hoạt file Virtual Hosts: Tìm dòng `#Include conf/extra/httpd-vhosts.conf` và bỏ dấu # ở đầu dòng.

##### Cấu hình file virtualHost (httpd-vhosts.conf)

- Mở file `D:\Apache\Apache24\conf\extra\httpd-vhosts.conf`
- Đổi tên server:

<img width="966" height="479" alt="image" src="https://github.com/user-attachments/assets/aa6bdfa6-59a1-45d4-870f-17c0db684c67" />


****Tạo thư mục chứa website tại `D:\Apache24\Apache24\phuonganhnguyet`****

- Tạo 1 file inder trong thư mục này

#### Bước 4: Fake IP trong file hosts

- Mở file `c:\Windows\System32\drivers\etc\hosts` bằng notepad và thêm dòng `127.0.0.1 phuonganhnguyet.com` sau đó lưu lại.

#### Bước 5: Cài đặt và khởi động lại Apache

****Mở CMD quyền Administrator sau đó gõ lệnh cài đặt và khởi động Apache:****
- Lệnh cài đặt: `D:\Apache\Apache24\bin\httpd.exe -k install`
- Lệnh khởi động: `D:\Apache\Apache24\bin\httpd.exe -k start`

<img width="1268" height="357" alt="image" src="https://github.com/user-attachments/assets/2a640a1b-6d85-4168-9fef-ebaeeaa9f16c" />


- Kết quả sau khi cài đặt và chạy:

<img width="1903" height="1023" alt="image" src="https://github.com/user-attachments/assets/50378e8b-b584-477e-a694-d17c1e20d283" />


### 2.2. Cài đặt nodejs và nodered => Dùng làm backend 

#### Cài đặt nodejs

- Truy cập vào `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi` để download nodejs về máy.
- Sau khi download về máy, cài đặt nodejs vào thư mục `D:\nodejs`

#### Cài đặt Node-Red
****Bước 1: Mở CMD quyền Administrator****

- Trỏ vào thư mục `D:\nodejs`
- Chạy lệnh: `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"` để cài đặt Node-Red

<img width="1016" height="225" alt="image" src="https://github.com/user-attachments/assets/8d6c752d-d575-477e-849f-3f23cdbffa4f" />

****Bước 2: Cài đặt NSSM****

- Truy cập vào `https://nssm.cc/release/nssm-2.24.zip` để download file. Sau đó giải nén và được file nssm.exe
- Copy file  `nssm.exe` vào thư mục `D:\nodejs\nodered`
- Tạo file `D:\nodejs\nodered\run-nodered.cmd` với 5 dòng sau để khởi động nodered:

<img width="1244" height="601" alt="image" src="https://github.com/user-attachments/assets/cce56ba8-6ef3-4c3b-8896-63d3f9f6d771" />

<img width="1237" height="676" alt="image" src="https://github.com/user-attachments/assets/d1de0fb2-9447-4050-a228-780a65b2c4fc" />

****Bước 3: Cài đặt Node red thành Windows Service****

- Mở CMD, run as administrator sau đó trỏ đến thư mục: `D:\nodejs\nodered`
- Chạy lệnh `nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"` để chạy servide `a1-nodered`
- Chạy lệnh `nssm start a1-nodered`

<img width="993" height="351" alt="image" src="https://github.com/user-attachments/assets/c6a7409f-142e-46f1-9327-bb97f59182e7" />


- Sau khi cài đặt xong, node red sẽ hoạt động ở `http://localhost:1880`

<img width="1909" height="1080" alt="image" src="https://github.com/user-attachments/assets/ac98cf22-66e4-4d21-9d4f-d0c0d5c9e4fe" />


### 2.3. Tạo CSDL tuỳ ý trên mssql (SQL Server 2022)
#### Thiết kế CSDL chứa các thông tin về shop Mỹ Phẩm trên hệ thống.

****Server_name: DESKTOP-3223L00\NGUYET****

****DB_name:QLShop_MyPham****

****Table_name:SPMyPham****



### Tạo bảng CSDL: 

<img width="1880" height="942" alt="image" src="https://github.com/user-attachments/assets/9349ed09-c52e-4a74-b4f0-dd7bf0d69584" />

#### Nhập dữ liệu demo:

<img width="1920" height="667" alt="image" src="https://github.com/user-attachments/assets/75649755-b1f7-41f3-8362-6680c0f36d22" />

### 2.4. Cài đặt thư viện trên Node-Red
#### Bước 1. Mở Node-Red trên trình duyệt bằng url http://localhost:1880, chọn Manage palette và mở tap Install

#### Cài các thư viện sau:

****node-red-contrib-mssql-plus: Kết nối SQL Server****

****node-red-node-mysql: Kết nối MySQL****

****node-red-contrib-telegrambot: Gửi thông báo qua Telegram****

****node-red-contrib-moment: Xử lí thời gian dễ dàng****

****node-red-contrib-influxdb: Kết nối cơ sở dữ liệu InfluxDB****

****node-red-contrib-duckdns: Cập nhật IP cho tên miền DuckDNS****

****node-red-contrib-cron-plus: Lập lịch công việc tự động (Cron jobs)****

<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/3f4ace05-2bc3-4b96-9f99-f9cddcb50a8d" />

#### Bước 2: Thêm đăng nhập Admin
  - Mở file cấu hình settings.js: `D:\nodejs\nodered\work\settings.js`
  - Tìm đến chỗ adminAuth, bỏ // ở đầu dòng (8 dòng) và thay chuỗi mã hóa mật khẩu bằng chuỗi mới:

<img width="932" height="214" alt="image" src="https://github.com/user-attachments/assets/324054f6-c231-44c3-a068-0a4f80db588a" />

- Mã hoá mật khẩu có thể thiết lập bằng tool: `https://tms.tnut.edu.vn/pw.php`
- Chạy lại nodered bằng cách: mở cmd, vào thư mục: `D:\nodejs\nodered` và chạy lệnh: `nssm restart a1-nodered`
  
<img width="1228" height="256" alt="image" src="https://github.com/user-attachments/assets/e731d4a1-893e-40a3-8467-b31e67f5db7c" />
  
- khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: `http://localhost:1880`

  <img width="1915" height="923" alt="image" src="https://github.com/user-attachments/assets/319e2ff9-8f6a-43dc-ab61-f84fa0151be0" />

### 2.5. Tạo API back-end bằng nodered

- Tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- Thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- Logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây):
  
****1.http in: dùng GET cho đơn giản:****

<img width="385" height="359" alt="httpin" src="https://github.com/user-attachments/assets/ffa84047-042a-4153-b10b-5173033c1b90" />

****2.Function: để tiền xử lý dữ liệu gửi đến:****

<img width="480" height="313" alt="Capture" src="https://github.com/user-attachments/assets/3eb0eb33-927d-4b20-b2a3-8111d1d8dea8" />

****3.MSSQL: để truy vấn dữ liệu CSDL, nhận tham số từ node tiền xử:****

<img width="392" height="383" alt="ad" src="https://github.com/user-attachments/assets/9dccdbfb-e7fe-4309-a291-12d4d6170acd" />

****4. http response: để phản hồi dữ liệu về client****

<img width="400" height="293" alt="Capture PNGh" src="https://github.com/user-attachments/assets/83b58e81-c169-4c9c-a374-51c567b12511" />

****5: Kết quả****

<img width="1919" height="885" alt="image" src="https://github.com/user-attachments/assets/d9e617c8-b61b-48ac-a46c-8005fc3b77bb" />

****Kiểm tra API tìm kiếm sản phẩm thông qua trình duyệt****

- Ví dụ:http://localhost:1880/timkiem?q=
  
<img width="1801" height="974" alt="image" src="https://github.com/user-attachments/assets/ae8fb214-67c7-4aa1-ad53-9811f9fcf093" />

### 2.6. Tạo giao diện front-end

****HTML gồm các file: `index.html`, `phuonganhnguyet.css`, `phuonganhnguyet.js`. Tất cả đều nằm trong thư mục `D:\Apache\Apache24\phuonganhnguyet`****

<img width="959" height="313" alt="image" src="https://github.com/user-attachments/assets/1606c3eb-bae7-47f8-9f32-70bde69f2acd" />

****Giao diện chạy demo:****

<img width="960" height="503" alt="qq" src="https://github.com/user-attachments/assets/f9e3068c-2c9b-4f08-b29e-27883f167adc" />

****Giao diện khi tìm kiếm sản phẩm:****

<img width="954" height="510" alt="háhá" src="https://github.com/user-attachments/assets/e0740bb2-e24a-49eb-b32e-a5899a8ea0fa" />

### 2.7. Tự đánh giá bài làm cá nhân.
##### Quá trình cài đặt các phần mềm và các thư viện:
- Qua quá trình cài đặt, em hiểu được cách thiết lập môi trường cho một hệ thống web gồm Apache, Node.js, Node-RED và SQL Server.
- Em biết cách cấu hình máy chủ web, tạo domain riêng, cài đặt Node-RED làm dịch vụ và kết nối cơ sở dữ liệu.
- Việc cài thêm các thư viện cần thiết giúp em thấy rõ vai trò của chúng trong việc mở rộng chức năng và hỗ trợ hệ thống hoạt động ổn định.

##### Cách sử dụng nodered để tạo api back-end:
- Qua phần thực hành với Node-RED, em đã hiểu cách tạo một API back-end thông qua các node có sẵn.
- Em biết cách dùng node HTTP In để nhận yêu cầu, node Function để xử lý dữ liệu, node MSSQL để truy vấn cơ sở dữ liệu và node HTTP Response để trả kết quả cho người dùng. Nhờ đó, em hiểu được quy trình hoạt động của một API — từ việc nhận yêu cầu, xử lý, truy vấn dữ liệu đến phản hồi kết quả về cho front-end.
##### Cách frond-end tương tác với back-end:
- Ở phần này, em đã hiểu cách front-end và back-end tương tác với nhau.
Front-end (HTML, CSS, JavaScript) gửi yêu cầu đến API Node-RED thông qua lệnh fetch, nhận dữ liệu trả về dạng JSON, rồi hiển thị kết quả lên giao diện. Vì vậy, em hiểu được quy trình trao đổi dữ liệu giữa giao diện người dùng và máy chủ trong một ứng dụng web.

- Trong cả quá trình làm bài em cũng bị mắc ở nhiều chỗ, phải xoá đi cài lại 3 lần vì không tìm ra lỗi, nhưng khi tìm được ra lỗi thì lại là những cái sai rất không đáng vì nó quá đơn giản. Qua mỗi bài tập em lại rút ra được nhiều kinh nghiệm hơn so với trước đó, có kĩ năng trình bày, cẩn thận hơn.
