// Hàm hiển thị danh sách sản phẩm ra giao diện
function renderProducts(data) {
  const resultDiv = document.getElementById("results");

  if (!data || data.length === 0) {
    resultDiv.innerHTML = "<p>❌ Không tìm thấy sản phẩm nào.</p>";
    return;
  }

  let html = "";
  data.forEach(item => {
    html += `
      <div class="product">
        <div class="product-name">${item.TenSP || "Tên SP không có"}</div>
        <div>Mã SP: ${item.MaSP || "-"}</div>
        <div class="product-price">Giá: ${item.Gia ? item.Gia.toLocaleString() + "₫" : "Liên hệ"}</div>
      </div>
    `;
  });

  resultDiv.innerHTML = html;
}

// Hàm tải toàn bộ sản phẩm (khi chưa nhập gì)
async function loadAllProducts() {
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "<p>⏳ Đang tải danh sách sản phẩm...</p>";

  try {
    const response = await fetch("http://localhost:1880/timkiem"); // Không có query => Node-RED trả toàn bộ
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Lỗi tải tất cả sản phẩm:", error);
    resultDiv.innerHTML = "<p>⚠️ Không thể tải danh sách sản phẩm.</p>";
  }
}

// Xử lý khi người dùng nhấn nút tìm kiếm
document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const keyword = document.getElementById("keyword").value.trim();
  const resultDiv = document.getElementById("results");

  resultDiv.innerHTML = "<p>⏳ Đang tìm kiếm...</p>";

  try {
    let url = "http://localhost:1880/timkiem";
    if (keyword !== "") {
      url += `?q=${encodeURIComponent(keyword)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm:", error);
    resultDiv.innerHTML = "<p>⚠️ Lỗi kết nối đến API Node-RED.</p>";
  }
});

// Khi trang được tải lần đầu → tự động hiển thị tất cả sản phẩm
window.addEventListener("DOMContentLoaded", loadAllProducts);
