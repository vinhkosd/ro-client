# Cài đặt môi trường node modules để làm việc
### `npm install`

tạo file config
### `cp .env.example .env`

## Lệnh cơ bản

Chạy với môi trường develop

### `npm start`

Chạy cùng với PORT
Centos/Ubuntu/Linux
### `PORT=YOUR_PORT npm start`
Windows
### `set PORT=YOUR_PORT && npm start`
Build thành file static html
### `npm run build`
#### Build Kèm theo public_link
### `set PUBLIC_URL=YOUR_LINK&&npm run build`

App sẽ được build ra thư mục `build`.

Lệnh mẫu để copy file đã build vào thư mục web host
### `sudo cp -rf build/* /var/www/pay.ragnarok.mobi/html`
với /var/www/pay.ragnarok.mobi/html là thư mục web host của bạn
