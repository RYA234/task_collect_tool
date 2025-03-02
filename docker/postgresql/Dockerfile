FROM postgres:14.0-bullseye

# pgtap
RUN apt-get update \
    && apt-get install -y build-essential git-core libv8-dev curl postgresql-server-dev-$PG_MAJOR unzip  make sudo libaio1 nmap iputils-ping net-tools libkrb5-dev clang\
    && rm -rf /var/lib/apt/lists/*

ENV UNAME=postgres
ENV GID=0
ENV UID=1000

RUN usermod -aG root  $UNAME

RUN echo "Defaults:$UNAME !env_reset" > /etc/sudoers && \
echo "$UNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers


# install pg_prove
RUN curl -LO http://xrl.us/cpanm \
    && chmod +x cpanm \
    && ./cpanm TAP::Parser::SourceHandler::pgTAP

# install pgtap
RUN git clone https://github.com/theory/pgtap.git \
    && cd /pgtap \
    && make \
    && make install

# pldebbuger
RUN git clone https://github.com/EnterpriseDB/pldebugger.git \
    && cd /pldebugger \
    && env USE_PGXS=1 make \
    && env USE_PGXS=1 make install

 

COPY ./sdk /tmp

USER $UNAME

# oracle instant clientの設定
# zipを解凍して　環境変数を通す
# RUN unzip /tmp/instantclient-basic-linux.x64-23.6.0.24.10.zip -d /tmp
# RUN unzip -o /tmp/instantclient-sdk-linux.x64-23.6.0.24.10.zip -d /tmp
# RUN unzip -o /tmp/instantclient-sqlplus-linux.x64-23.6.0.24.10.zip -d /tmp
# RUN unzip -o /tmp/instantclient-odbc-linux.x64-23.6.0.24.10.zip -d /tmp 

# RUN sudo sh -c "echo /tmp/instantclient_23_6 > /etc/ld.so.conf.d/oracle-instantclient.conf"
# RUN sudo ldconfig

# ENV ORACLE_HOME=/tmp/instantclient_23_6
# ENV LD_LIBRARY_PATH=/tmp/instantclient_23_6:$LD_LIBRARY_PATH
# ENV PATH=/tmp/instantclient_23_6:$PATH
# ENV NLS_LANG=Japanese_Japan.AL32UTF8
# ENV ORACLE_SID=FREE
# COPY ./sdk/tnsnames.ora /tmp/instantclient_23_6/network/admin/tnsnames.ora
# oracle_fdwを解凍してビルドする
# RUN unzip /tmp/oracle_fdw-ORACLE_FDW_2_5_0.zip -d /tmp
#RUN pg_ctl restart -D /var/lib/postgresql/data/pgdata
# RUN cd /tmp/oracle_fdw-ORACLE_FDW_2_5_0 && make && sudo make install
EXPOSE 5432
