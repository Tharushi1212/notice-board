CREATE DATABASE noticeboard;

CREATE TABLE notice(
    notice_id SERIAL PRIMARY KEY,
    headline VARCHAR(255),
description VARCHAR(255)
);