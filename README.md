
# Global Error Handler Sample Project

## Giới thiệu
Project mẫu tích hợp:
- Global Error Handler sử dụng NgZone.
- Bắt lỗi runtime và HTTP.
- Ghi log qua LogService sử dụng NgRx Store.
- Hiển thị thông báo bằng SweetAlert2 và MatSnackBar.
- DemoComponent để test log và lỗi.

## Cài đặt
```bash
npm install
```

## Chạy project
```bash
ng serve
```

## Các chức năng chính
| Button | Chức năng |
|--------|-----------|
| Log Success (Toast) | Ghi log success và hiển thị Toast |
| Log Error (Popup) | Ghi log error và hiển thị Popup |
| Throw Error | Tạo lỗi để test Global Error Handler |

## Thư mục chính
```
src/app/
  ├── global-error-handler/
  ├── demo/
  ├── app.module.ts
  ├── app.component.ts
```

## Lưu ý
- Có thể thay thế SweetAlert2 và MatSnackBar dễ dàng bằng cách sửa trong `NotificationService`.
- Toàn bộ log API được ghi lại tự động qua `ApiLoggingInterceptor`.
