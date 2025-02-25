/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { genAid, parseAid } from '@libnare/mk-square';
import { DI } from '@/di-symbols.js';
import type { Config } from '@/config.js';
import { genAidx, parseAidx } from '@/misc/id/aidx.js';
import { genMeid, parseMeid } from '@/misc/id/meid.js';
import { genMeidg, parseMeidg } from '@/misc/id/meidg.js';
import { genObjectId, parseObjectId } from '@/misc/id/object-id.js';
import { bindThis } from '@/decorators.js';
import { parseUlid } from '@/misc/id/ulid.js';

@Injectable()
export class IdService {
	private method: string;

	constructor(
		@Inject(DI.config)
		private config: Config,
	) {
		this.method = config.id.toLowerCase();
	}

	@bindThis
	public genId(date?: Date): string {
		if (!date || (date > new Date())) date = new Date();

		switch (this.method) {
			case 'aid': return genAid(date);
			case 'aidx': return genAidx(date);
			case 'meid': return genMeid(date);
			case 'meidg': return genMeidg(date);
			case 'ulid': return ulid(date.getTime());
			case 'objectid': return genObjectId(date);
			default: throw new Error('unrecognized id generation method');
		}
	}

	@bindThis
	public parse(id: string): { date: Date; } {
		switch (this.method) {
			case 'aid': return parseAid(id);
			case 'aidx': return parseAidx(id);
			case 'objectid': return parseObjectId(id);
			case 'meid': return parseMeid(id);
			case 'meidg': return parseMeidg(id);
			case 'ulid': return parseUlid(id);
			default: throw new Error('unrecognized id generation method');
		}
	}
}
