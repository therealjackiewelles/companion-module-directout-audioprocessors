import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	defaultcolor_bg: string
	defaultcolor_inactive: string
	defaultcolor_active: string
	defaultcolor_ok: string
	defaultcolor_warn: string
	defaultcolor_bad: string
	/** use the saved device snapshot to populate choices when no device is connected */
	offline_mode: boolean
	/** discard the saved device snapshot on next save of the config */
	offline_clear: boolean
	/** JSON of the last full device state, saved automatically, not shown as a field */
	offline_snapshot?: string
	/** exponent of the fader curve used by the rotary fader actions */
	fader_curve: number
}

/** The saved device state used for offline editing */
export interface OfflineSnapshot {
	model: string
	savedAt: string
	payload: any
}

/**
 * Parse the saved offline snapshot from the config
 * @param config
 * @returns the snapshot or undefined if there is no valid snapshot
 */
export function readOfflineSnapshot(config: Partial<ModuleConfig>): OfflineSnapshot | undefined {
	if (typeof config.offline_snapshot !== 'string' || config.offline_snapshot === '') return undefined
	try {
		const snapshot = JSON.parse(config.offline_snapshot)
		if (typeof snapshot?.model !== 'string' || typeof snapshot?.payload !== 'object') return undefined
		return snapshot as OfflineSnapshot
	} catch (_error) {
		return undefined
	}
}

export function GetConfigFields(config?: Partial<ModuleConfig>): SomeCompanionConfigField[] {
	const snapshot = config ? readOfflineSnapshot(config) : undefined
	const snapshotInfo = snapshot
		? `Saved snapshot: ${snapshot.model}, captured ${new Date(snapshot.savedAt).toLocaleString()}`
		: 'No snapshot saved yet. Connect to the device once to capture one.'
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Device IP',
			width: 4,
			regex: Regex.IP,
			default: '',
		},
		{
			id: 'coltext',
			type: 'static-text',
			label: 'Colors',
			value: 'The colors are used as default colors for presets, actions and feedbacks',
			width: 12,
		},
		{
			type: 'colorpicker',
			id: 'defaultcolor_bg',
			label: 'background',
			default: '#000000',
			width: 4,
		},
		{
			type: 'colorpicker',
			id: 'defaultcolor_inactive',
			label: 'inactive',
			default: '#828282',
			width: 4,
		},
		{
			type: 'colorpicker',
			id: 'defaultcolor_active',
			label: 'active',
			default: '#3a00db',
			width: 4,
		},
		{
			type: 'colorpicker',
			id: 'defaultcolor_ok',
			label: 'ok',
			default: '#00ea27',
			width: 4,
		},
		{
			type: 'colorpicker',
			id: 'defaultcolor_warn',
			label: 'warn',
			default: '#ff8000',
			width: 4,
		},
		{
			type: 'colorpicker',
			id: 'defaultcolor_bad',
			label: 'bad',
			default: '#cc0000',
			width: 4,
		},
		{
			id: 'offlinetext',
			type: 'static-text',
			label: 'Offline editing',
			value: `Every time the module connects, it saves a snapshot of the device (channel names, device type, settings). When no device is connected, the snapshot is used so you can build buttons with your named channels. The snapshot is stored in this connection and travels with Companion config exports. ${snapshotInfo}`,
			width: 12,
		},
		{
			type: 'checkbox',
			id: 'offline_mode',
			label: 'Use saved snapshot when offline',
			default: true,
			width: 4,
		},
		{
			type: 'checkbox',
			id: 'offline_clear',
			label: 'Delete saved snapshot on save',
			default: false,
			width: 4,
		},
		{
			type: 'number',
			id: 'fader_curve',
			label: 'Rotary fader curve (1 = linear dB, higher = finer near 0 dB)',
			tooltip:
				'Used by the "Rotary Fader" action. The encoder moves a fader position from 0 to 100 %, which is mapped to dB with this exponent.',
			min: 1,
			max: 6,
			step: 0.1,
			default: 3,
			width: 4,
		},
	]
}
