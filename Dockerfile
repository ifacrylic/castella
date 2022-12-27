FROM node:18.12.1-bullseye AS builder

ARG NODE_ENV=production

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    tini build-essential ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /misskey

COPY [".yarnrc.yml", "package.json", "yarn.lock", "./"]
COPY [".yarn", "./.yarn"]
COPY ["scripts", "./scripts"]
COPY ["packages/backend/package.json", "./packages/backend/"]
COPY ["packages/frontend/package.json", "./packages/frontend/"]
COPY ["packages/sw/package.json", "./packages/sw/"]

RUN yarn install --immutable

COPY . ./

RUN git submodule update --init
RUN yarn build

FROM gcr.io/distroless/nodejs18:latest AS runner
WORKDIR /misskey

COPY --from=builder /usr/bin/tini /usr/bin/tini
COPY --from=builder /etc/ssl/certs /etc/ssl/certs

COPY --from=busybox:stable-uclibc /bin/sh /bin/sh
COPY --from=busybox:stable-uclibc /bin/ln /bin/ln

COPY --from=busybox:stable-uclibc /bin/grep /bin/grep

COPY --from=busybox:stable-uclibc /bin/df /bin/df
COPY --from=busybox:stable-uclibc /bin/cat /bin/cat

COPY --from=mwader/static-ffmpeg:latest /ffmpeg /usr/local/bin/ffmpeg
COPY --from=mwader/static-ffmpeg:latest /ffprobe /usr/local/bin/ffprobe

COPY --from=builder /misskey/.yarn ./.yarn
COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY --from=builder /misskey/packages/backend/node_modules ./packages/backend/node_modules
COPY --from=builder /misskey/packages/backend/built ./packages/backend/built
COPY --from=builder /misskey/packages/frontend/node_modules ./packages/frontend/node_modules
COPY --from=builder /misskey/packages/backend/assets ./packages/backend/assets
COPY --from=builder /misskey/packages/frontend/assets ./packages/frontend/assets

COPY .node-version .yarnrc.yml package.json yarn.lock ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/ormconfig.js ./packages/backend/
COPY packages/backend/migration ./packages/backend/migration

RUN ln -s /bin/env /usr/bin/env
RUN ln -s /nodejs/bin/node /usr/bin/node

ENV NODE_ENV=production
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", ".yarn/releases/yarn-3.3.0.cjs", "run", "migrateandstart"]
