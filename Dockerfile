FROM nginx
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/html/assets