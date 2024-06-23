#!/bin/bash

apt-get update && apt-get install -y \
    jq \
    vim \
    iputils-ping \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

cd ~/

git clone https://github.com/kngnkg/dotfiles.git

~/dotfiles/install.sh