# companion-module-directout-audioprocessors

See [HELP.md](./companion/HELP.md) and [LICENSE](./LICENSE)  
See the issues section for known bugs or feature requests.

## Description

This modules interfaces the audio processors of the PRODIGY and MAVEN series with Companion.

## Fork change log

This fork (therealjackiewelles/companion-module-directout-audioprocessors) adds offline editing and rotary fader control on top of the official DirectOut module. Newest entries first. Times are UTC.

### 2026-09-26 00:37 UTC: offline snapshot and fader curve merged into main

Commit `d352e0a` (written 2026-09-26 00:27 UTC), merged via PR #1 as `5bd8ade`. Not yet tested on a real PRODIGY/MAVEN or in Companion.

- feature: **offline snapshot**. Each time the module connects to a device it saves the device state (device type, channel names, settings) in the connection configuration. With no device connected it loads that snapshot, so dropdowns show your named channels and you can build pages offline (e.g. in a hotel). Leave the Device IP empty to work fully offline. Actions are not sent while offline. The snapshot travels with Companion config exports. New connection settings: _Use saved snapshot when offline_ and _Delete saved snapshot on save_.
- feature: **fader curve for rotary encoders**. The gain actions (Output, Sum Bus, Flex Channel and Group gain) get a _Step along fader curve_ option in incremental mode. The increment becomes a percentage of fader travel instead of dB: big steps at the bottom, fine steps near 0 dB. Use `1` on _rotate right_ and `-1` on _rotate left_. The curve shape is the new connection setting _Rotary fader curve_ (1 = linear dB, default 3, which puts 0 dB at about 70 % of fader travel).
- Files changed: `src/config.ts`, `src/main.ts`, `src/parameters.ts`, `src/utils.ts`, `companion/HELP.md`.

### 2026-09-26: fork created

Forked from bitfocus/companion-module-directout-audioprocessors at v1.1.0 plus dependency updates up to `09e468a` (2026-09-11).

## Building and importing into Companion

Requires Companion 4.0 or newer, Node.js 22 and Yarn 4 (run `corepack enable` once to get Yarn).

1. Clone this repository and run `yarn install` in it.
2. Run `yarn package`. This builds the module and writes a `.tgz` package into the repository folder.
3. In Companion, open the **Modules** page, choose **Import module package**, and select the `.tgz` file.
4. Add or edit a DirectOut connection and pick the imported version of the module.

Alternative for development: in the Companion launcher settings, set a **Developer modules path** to the folder that contains this repository, run `yarn build` (or `yarn dev` to rebuild on every change), and Companion loads the module from that folder.

The fork keeps the module id `directout-audioprocessors`, so it shows up as another version of the DirectOut module rather than a separate module.

## :rocket: Version History

### 1.1.0 (2026-06-04)

- notice: :link: This version requires at least Companion 4.0.0

- feature: add an incremental entry mode for all numeric options additionally to the absolut entry. This is very convenient for use on rotary encoders.
- feature: add a routing option by selecting and take operation including various variables
- bugfix: use correct endpoint for check patch feedback on PRODIGY.MC
- bugfix: use correct slot IDs for EARS actions and variables on MAVEN.A (Network was Madi and Madi was unavailable)
- bugfix: correct assignment for sources of the network ports beyond the first 128 in sum bus assignment for PRODIGY.MX
- bugfix: clamp to correct minimal value even for minimum of 0
- chore: update dependency @companion-module/base from 1.11.3 to 1.12.1
- chore: update dependency @companion-module/tools from 2.6.1 to 2.7.2
- chore: update dependency @types/node from 22.14.1 to 22.19.19
- chore: update dependency ajv from 6.12.6 to 6.14.0
- chore: update dependency eslint from 9.36.0 to 9.39.4
- chore: update dependency flatted from 3.3.3 to 3.4.2
- chore: update dependency glob from 11.0.3 to 11.1.0
- chore: update dependency js-yaml from 4.1.0 to 4.1.1
- chore: update dependency nanoid from 3.3.11 to 3.3.12
- chore: update dependency picomatch from 2.3.1 to 2.3.2
- chore: update dependency prettier from 3.6.2 to 3.8.3
- chore: update dependency rimraf from 6.0.1 to 6.1.3
- chore: update dependency tar from 7.5.2 to 7.5.11
- chore: update dependency typescript-eslint from 8.45.0 to 8.60.0
- chore: update dependency zx from 8.8.4 to 8.8.5

### 1.0.1 (2025-11-09)

- bugfix: use correct endpoint for routing at PRODIGY.MC

### 1.0.0 (2025-10-01)

- major: initial Release
- feat: initial actions with learn functionality for many parameters
- feat: initial feedbacks with learn functionality for many parameters
- feat: variables including custom variables functionality
- feat: presets
- feat: action recorder for all device state changes
- feat: expression support for text inputs
- feat: dynamic update of dropdown values
- feat: toggle functionality for boolean parameters
- feat: next/previous functionality for list parameters
