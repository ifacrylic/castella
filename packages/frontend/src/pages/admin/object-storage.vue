<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header><XHeader :tabs="headerTabs"/></template>
	<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
		<FormSuspense :p="init">
			<div class="_gaps_m">
				<MkFolder>
					<template #label>{{ i18n.ts.objectStorage }}</template>

					<div class="_gaps_m">
						<MkSwitch v-model="useObjectStorage">{{ i18n.ts.useObjectStorage }}</MkSwitch>

						<template v-if="useObjectStorage">
							<MkInput v-model="objectStorageBaseUrl" :placeholder="'https://example.com'">
								<template #label>{{ i18n.ts.objectStorageBaseUrl }}</template>
								<template #caption>{{ i18n.ts.objectStorageBaseUrlDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageBucket">
								<template #label>{{ i18n.ts.objectStorageBucket }}</template>
								<template #caption>{{ i18n.ts.objectStorageBucketDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStoragePrefix">
								<template #label>{{ i18n.ts.objectStoragePrefix }}</template>
								<template #caption>{{ i18n.ts.objectStoragePrefixDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageEndpoint" :placeholder="'example.com'">
								<template #label>{{ i18n.ts.objectStorageEndpoint }}</template>
								<template #prefix>https://</template>
								<template #caption>{{ i18n.ts.objectStorageEndpointDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageRegion">
								<template #label>{{ i18n.ts.objectStorageRegion }}</template>
								<template #caption>{{ i18n.ts.objectStorageRegionDesc }}</template>
							</MkInput>

							<FormSplit :minWidth="280">
								<MkInput v-model="objectStorageAccessKey">
									<template #prefix><i class="ti ti-key"></i></template>
									<template #label>Access key</template>
								</MkInput>

								<MkInput v-model="objectStorageSecretKey" type="password">
									<template #prefix><i class="ti ti-key"></i></template>
									<template #label>Secret key</template>
								</MkInput>
							</FormSplit>

							<MkSwitch v-model="objectStorageUseSSL">
								<template #label>{{ i18n.ts.objectStorageUseSSL }}</template>
								<template #caption>{{ i18n.ts.objectStorageUseSSLDesc }}</template>
							</MkSwitch>

							<MkSwitch v-model="objectStorageUseProxy">
								<template #label>{{ i18n.ts.objectStorageUseProxy }}</template>
								<template #caption>{{ i18n.ts.objectStorageUseProxyDesc }}</template>
							</MkSwitch>

							<MkSwitch v-model="objectStorageSetPublicRead">
								<template #label>{{ i18n.ts.objectStorageSetPublicRead }}</template>
							</MkSwitch>

							<MkSwitch v-model="objectStorageS3ForcePathStyle">
								<template #label>s3ForcePathStyle</template>
								<template #caption>{{ i18n.ts.s3ForcePathStyleDesc }}</template>
							</MkSwitch>
						</template>
					</div>
				</MkFolder>

				<MkFolder>
					<template #label>{{ i18n.ts.objectStorage }} (Remote)</template>

					<div class="_gaps_m">
						<MkSwitch v-model="useObjectStorageRemote">{{ i18n.ts.useObjectStorage }}</MkSwitch>

						<template v-if="useObjectStorageRemote">
							<MkInput v-model="objectStorageRemoteBaseUrl" :placeholder="'https://example.com'">
								<template #label>{{ i18n.ts.objectStorageBaseUrl }}</template>
								<template #caption>{{ i18n.ts.objectStorageBaseUrlDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageRemoteBucket">
								<template #label>{{ i18n.ts.objectStorageBucket }}</template>
								<template #caption>{{ i18n.ts.objectStorageBucketDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageRemotePrefix">
								<template #label>{{ i18n.ts.objectStoragePrefix }}</template>
								<template #caption>{{ i18n.ts.objectStoragePrefixDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageRemoteEndpoint" :placeholder="'example.com'">
								<template #label>{{ i18n.ts.objectStorageEndpoint }}</template>
								<template #prefix>https://</template>
								<template #caption>{{ i18n.ts.objectStorageEndpointDesc }}</template>
							</MkInput>

							<MkInput v-model="objectStorageRemoteRegion">
								<template #label>{{ i18n.ts.objectStorageRegion }}</template>
								<template #caption>{{ i18n.ts.objectStorageRegionDesc }}</template>
							</MkInput>

							<FormSplit :minWidth="280">
								<MkInput v-model="objectStorageRemoteAccessKey">
									<template #prefix><i class="ti ti-key"></i></template>
									<template #label>Access key</template>
								</MkInput>

								<MkInput v-model="objectStorageRemoteSecretKey" type="password">
									<template #prefix><i class="ti ti-key"></i></template>
									<template #label>Secret key</template>
								</MkInput>
							</FormSplit>

							<MkSwitch v-model="objectStorageRemoteUseSSL">
								<template #label>{{ i18n.ts.objectStorageUseSSL }}</template>
								<template #caption>{{ i18n.ts.objectStorageUseSSLDesc }}</template>
							</MkSwitch>

							<MkSwitch v-model="objectStorageRemoteUseProxy">
								<template #label>{{ i18n.ts.objectStorageUseProxy }}</template>
								<template #caption>{{ i18n.ts.objectStorageUseProxyDesc }}</template>
							</MkSwitch>

							<MkSwitch v-model="objectStorageRemoteSetPublicRead">
								<template #label>{{ i18n.ts.objectStorageSetPublicRead }}</template>
							</MkSwitch>

							<MkSwitch v-model="objectStorageRemoteS3ForcePathStyle">
								<template #label>s3ForcePathStyle</template>
								<template #caption>{{ i18n.ts.s3ForcePathStyleDesc }}</template>
							</MkSwitch>
						</template>
					</div>
				</MkFolder>
			</div>
		</FormSuspense>
	</MkSpacer>
	<template #footer>
		<div :class="$style.footer">
			<MkSpacer :contentMax="700" :marginMin="16" :marginMax="16">
				<MkButton primary rounded @click="save"><i class="ti ti-check"></i> {{ i18n.ts.save }}</MkButton>
			</MkSpacer>
		</div>
	</template>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { } from 'vue';
import XHeader from './_header_.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkInput from '@/components/MkInput.vue';
import FormSuspense from '@/components/form/suspense.vue';
import FormSplit from '@/components/form/split.vue';
import * as os from '@/os.js';
import { fetchInstance } from '@/instance.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import MkButton from '@/components/MkButton.vue';

let useObjectStorage: boolean = $ref(false);
let objectStorageBaseUrl: string | null = $ref(null);
let objectStorageBucket: string | null = $ref(null);
let objectStoragePrefix: string | null = $ref(null);
let objectStorageEndpoint: string | null = $ref(null);
let objectStorageRegion: string | null = $ref(null);
let objectStoragePort: number | null = $ref(null);
let objectStorageAccessKey: string | null = $ref(null);
let objectStorageSecretKey: string | null = $ref(null);
let objectStorageUseSSL: boolean = $ref(false);
let objectStorageUseProxy: boolean = $ref(false);
let objectStorageSetPublicRead: boolean = $ref(false);
let objectStorageS3ForcePathStyle: boolean = $ref(true);
let useObjectStorageRemote: boolean = $ref(false);
let objectStorageRemoteBaseUrl: string | null = $ref(null);
let objectStorageRemoteBucket: string | null = $ref(null);
let objectStorageRemotePrefix: string | null = $ref(null);
let objectStorageRemoteEndpoint: string | null = $ref(null);
let objectStorageRemoteRegion: string | null = $ref(null);
let objectStorageRemotePort: number | null = $ref(null);
let objectStorageRemoteAccessKey: string | null = $ref(null);
let objectStorageRemoteSecretKey: string | null = $ref(null);
let objectStorageRemoteUseSSL: boolean = $ref(false);
let objectStorageRemoteUseProxy: boolean = $ref(false);
let objectStorageRemoteSetPublicRead: boolean = $ref(false);
let objectStorageRemoteS3ForcePathStyle: boolean = $ref(true);

async function init() {
	const meta = await os.api('admin/meta');
	useObjectStorage = meta.useObjectStorage;
	objectStorageBaseUrl = meta.objectStorageBaseUrl;
	objectStorageBucket = meta.objectStorageBucket;
	objectStoragePrefix = meta.objectStoragePrefix;
	objectStorageEndpoint = meta.objectStorageEndpoint;
	objectStorageRegion = meta.objectStorageRegion;
	objectStoragePort = meta.objectStoragePort;
	objectStorageAccessKey = meta.objectStorageAccessKey;
	objectStorageSecretKey = meta.objectStorageSecretKey;
	objectStorageUseSSL = meta.objectStorageUseSSL;
	objectStorageUseProxy = meta.objectStorageUseProxy;
	objectStorageSetPublicRead = meta.objectStorageSetPublicRead;
	objectStorageS3ForcePathStyle = meta.objectStorageS3ForcePathStyle;
	useObjectStorageRemote = meta.useObjectStorageRemote;
	objectStorageRemoteBaseUrl = meta.objectStorageRemoteBaseUrl;
	objectStorageRemoteBucket = meta.objectStorageRemoteBucket;
	objectStorageRemotePrefix = meta.objectStorageRemotePrefix;
	objectStorageRemoteEndpoint = meta.objectStorageRemoteEndpoint;
	objectStorageRemoteRegion = meta.objectStorageRemoteRegion;
	objectStorageRemotePort = meta.objectStorageRemotePort;
	objectStorageRemoteAccessKey = meta.objectStorageRemoteAccessKey;
	objectStorageRemoteSecretKey = meta.objectStorageRemoteSecretKey;
	objectStorageRemoteUseSSL = meta.objectStorageRemoteUseSSL;
	objectStorageRemoteUseProxy = meta.objectStorageRemoteUseProxy;
	objectStorageRemoteSetPublicRead = meta.objectStorageRemoteSetPublicRead;
	objectStorageRemoteS3ForcePathStyle = meta.objectStorageRemoteS3ForcePathStyle;
}

function save() {
	os.apiWithDialog('admin/update-meta', {
		useObjectStorage,
		objectStorageBaseUrl,
		objectStorageBucket,
		objectStoragePrefix,
		objectStorageEndpoint,
		objectStorageRegion,
		objectStoragePort,
		objectStorageAccessKey,
		objectStorageSecretKey,
		objectStorageUseSSL,
		objectStorageUseProxy,
		objectStorageSetPublicRead,
		objectStorageS3ForcePathStyle,
		useObjectStorageRemote,
		objectStorageRemoteBaseUrl,
		objectStorageRemoteBucket,
		objectStorageRemotePrefix,
		objectStorageRemoteEndpoint,
		objectStorageRemoteRegion,
		objectStorageRemotePort,
		objectStorageRemoteAccessKey,
		objectStorageRemoteSecretKey,
		objectStorageRemoteUseSSL,
		objectStorageRemoteUseProxy,
		objectStorageRemoteSetPublicRead,
		objectStorageRemoteS3ForcePathStyle,
	}).then(() => {
		fetchInstance();
	});
}

const headerTabs = $computed(() => []);

definePageMetadata({
	title: i18n.ts.objectStorage,
	icon: 'ti ti-cloud',
});
</script>

<style lang="scss" module>
.footer {
	-webkit-backdrop-filter: var(--blur, blur(15px));
	backdrop-filter: var(--blur, blur(15px));
}
</style>
