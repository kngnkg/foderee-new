# リリース用のビルドを行うコンテナイメージを作成するステージ
FROM --platform=linux/x86_64 golang:1.22-bullseye as deploy-builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -trimpath -ldflags "-w -s" -o app

# リリース用のコンテナイメージを作成するステージ
FROM --platform=linux/x86_64 debian:bullseye-slim as deploy

COPY --from=deploy-builder /app/app .

ENTRYPOINT ["./app"]

# 開発用のコンテナイメージを作成するステージ
FROM golang:1.22-bullseye as dev

ENV GO111MODULE on

WORKDIR /workspace/backend

RUN apt-get update && apt-get install -y postgresql-client && \
    go install github.com/uudashr/gopkgs/v2/cmd/gopkgs@latest && \
    go install github.com/go-delve/delve/cmd/dlv@latest && \
    go install github.com/ramya-rao-a/go-outline@latest && \
    go install github.com/stamblerre/gocode@latest && \
    go install golang.org/x/tools/gopls@latest && \
    go install honnef.co/go/tools/cmd/staticcheck@latest && \
    go install github.com/sqldef/sqldef/cmd/psqldef@latest && \
    go install github.com/air-verse/air@latest

# $GOPATH/bin を PATH に追加
ENV PATH $PATH:/go/bin

CMD [ "air", "-c", ".air.toml" ]