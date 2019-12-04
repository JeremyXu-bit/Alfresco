FROM node:carbon-alpine

WORKDIR /home/node/app

COPY dist/ .
COPY cmd.sh .

RUN apk add --no-cache bash
RUN chmod +x /home/node/app/cmd.sh
RUN npm install -g http-server

EXPOSE 80

CMD ["/home/node/app/cmd.sh"]
