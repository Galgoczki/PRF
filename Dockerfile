FROM node

RUN apt-get -y update
RUN apt-get -y install git
RUN git config --global http.sslVerify false

WORKDIR /opt
RUN git clone https://github.com/Galgoczki/PRF.git
WORKDIR /opt/PRF

RUN npm install

EXPOSE 3000

CMD node index