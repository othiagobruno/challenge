FROM node:14-alpine

RUN apk add --no-cache git

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add python3 g++ make

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build


## ENVIRONMENT VARIABLES
ENV APP_KEY=E7wUE7wUn5IoVP8wm3NPqRsm8Tn5IoVE7wUn5IoVP8wm3NPqRsm8TP8wm3NPqRsm8T

# DATABASES
ENV DATABASE_URL=postgresql://thiago:show1010@tochique-db.cugjfnaypnpy.us-east-1.rds.amazonaws.com:5432/tochique
ENV MONGO_DB_URL=mongodb+srv://thiago:show1010@test.kbzfodt.mongodb.net/test

# PAGARME
ENV PAGARME_KEY=ak_test_nrtHJvcGRZ4F59WTHbbDqfQoxt1LP3
ENV PAGARME_ENCRYPTION_KEY=ek_test_U0YAGbeD8CAS7KF9iCf2M2bYieobga
ENV PLATFORM_RECIPIENT_ID=re_ckxetrozi0ps30h9tmyoz0hfh

# POSTBACK AND WEBHOOKS
ENV POSTBACK_URL=https://api.tochique.com/v1/order/postback

# STORAGE AND FILES
ENV S3_ENDPOINT=https://605df6910e830a551b154d82c6a139b0.r2.cloudflarestorage.com
ENV S3_KEY=44d0adecbfcfc759f00e63fa7cc4c4f8
ENV S3_SECRET=6ae76ada43da3c750ea9643d7343643476acf40446177248b57602be1047b996
ENV S3_BUCKET=tochique
ENV S3_BUCKET_URL=https://pub-501920dba2844ff68b347853ec2db36a.r2.dev
ENV S3_REGION=auto

# MAIL
ENV MAIL_SMTP=email-smtp.us-east-1.amazonaws.com
ENV MAIL_PORT=587
ENV MAIL_USER=AKIAWBXMH3AGIKY7PMGE
ENV MAIL_PASSWORD=BD3RJKTo5HnpHBf6kfWY4KQmZ3QZAk8zmOBwKCgP4M6x

# ELASTICSEARCH
ENV ELASTICSEARCH_NODE=https://elasticsearch-83455-0.cloudclusters.net:16098
ENV ELASTICSEARCH_USERNAME=elastic
ENV ELASTICSEARCH_PASSWORD=pLV1wJ22

# GOOGLE
ENV GOOGLE_CLIENT_ID=552323885640-3idganrrdut89lfkrs3g2qka5js5hql1.apps.googleusercontent.com

# REDIS
ENV REDIS_HOST=redis-16776.c14.us-east-1-2.ec2.cloud.redislabs.com
ENV REDIS_PORT=16776
ENV REDIS_PASSWORD=m76RBWoulfG5F29vY6f0yZ6S0119zOQF

EXPOSE 3333
CMD [ "node", "dist/src/main.js" ]
