# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.202.3/containers/debian/.devcontainer/base.Dockerfile

# [Choice] Debian version (use bullseye or stretch on local arm64/Apple Silicon): bullseye, buster, stretch
ARG VARIANT="buster"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# ** [Optional] Uncomment this section to install additional packages. **
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends vim python3-pip

# Install pre-commit
RUN pip install pre-commit

# Install Node.js from NodeSource (https://git.io/JMtoP)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Install the AWS CDK
RUN npm install -g aws-cdk

# Install the AWS SAM CLI
RUN wget https://github.com/aws/aws-sam-cli/releases/download/sam-cli-beta-cdk/aws-sam-cli-linux-x86_64.zip -P /tmp/ \
    && unzip /tmp/aws-sam-cli-linux-x86_64.zip -d /tmp/sam-installation \
    && /tmp/sam-installation/install
