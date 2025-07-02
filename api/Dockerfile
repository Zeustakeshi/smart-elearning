# Sử dụng một image đa giai đoạn để tạo ra một binary cuối cùng nhỏ gọn
# Giai đoạn builder: Dùng để biên dịch ứng dụng Go
FROM golang:1.22-alpine AS builder

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file go.mod và go.sum để quản lý dependencies
# Đây là bước quan trọng để Docker có thể cache các module
COPY go.mod ./
COPY go.sum ./

# Tải về tất cả các dependencies của ứng dụng
# Nếu các file go.mod và go.sum không thay đổi, Docker sẽ sử dụng cache
RUN go mod download

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Biên dịch ứng dụng Go
# CGO_ENABLED=0 để tạo binary tĩnh, không phụ thuộc vào thư viện C
# GOOS=linux GOARCH=amd64 để đảm bảo binary chạy trên môi trường Linux x64
# -o main để đặt tên cho binary đầu ra là 'main'
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-s -w" -o main ./cmd/main.go

# Giai đoạn production: Dùng một image siêu nhỏ để chứa binary đã biên dịch
FROM alpine:3.18

# Sao chép binary đã biên dịch từ giai đoạn builder
COPY --from=builder /app/main /usr/local/bin/elearning

# Đặt quyền thực thi cho binary
RUN chmod +x /usr/local/bin/elearning

# Cổng mà ứng dụng của bạn sẽ lắng nghe (nếu có)
EXPOSE 8080

# Lệnh mặc định để chạy ứng dụng khi container khởi động
ENTRYPOINT ["/usr/local/bin/elearning"]