# Use an appropriate base image
FROM ubuntu:20.04

# Install necessary packages
RUN apt-get update && apt-get install -y \
    nginx \
    mysql-server \
    php-fpm \
    php-mysql \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Copy configuration files
COPY ./nginx.conf /etc/nginx/nginx.conf

# Setup MySQL Database
COPY ./init_db.sql /docker-entrypoint-initdb.d/

# Copy application source code
COPY ./src /var/www/html

# Expose ports
EXPOSE 80 3306

# Start services
CMD ["sh", "-c", "service mysql start && service nginx start && tail -f /dev/null"]
