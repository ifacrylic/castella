/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { secureRndstr } from '@libnare/mk-square';

export default () => secureRndstr(16);
