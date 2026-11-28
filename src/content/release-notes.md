## Vivida 0.0.3 — updated installer

Download **vivida-0.0.3-windows-x64-setup.exe** and run it to install or upgrade Vivida for your Windows user account. Administrator access is not required. Your settings in `%APPDATA%\Vivida` are kept.

This release adds a photo map:

- Open a folder and switch from the grid to Map. Vivida reads GPS data from photos in that folder only and places them on the map. Photos without a location are not marked.
- Nearby photos gather into one marker. A marker that can be split zooms in; otherwise it shows a preview. Opening the photo uses the existing viewer and returns to the same map.
- Map tiles are cached in `%LOCALAPPDATA%\Vivida\MapTiles`. In **Settings → Map**, the cache limit is 100–2000 MB, in 50 MB steps, and defaults to 300 MB. Older, less recently used tiles are removed in the background. An older cache in `%LOCALAPPDATA%\CUI\MapTiles` is left untouched.
- Map tiles can use the Windows proxy, a direct connection, or one HTTP proxy. That choice applies only to map tiles. The proxy does not accept a username, password, or SOCKS5.
- If tiles cannot load, the map shows the failure and a Retry control. Photos stay on this computer; tile requests reveal the visible map area to the tile service.

**Reissued installer (same version, 0.0.3):** The installer now offers a desktop shortcut (selected by default) and a Launch Vivida option on completion (selected by default). The app now checks a version manifest on vivida.fynxlab.com rather than the GitHub REST API, avoiding the latter's shared-IP rate limit. Because the version number did not change, users who already installed 0.0.3 will **not** receive an update notification for this reissue; please download and run the installer again to get these changes. Users of 0.0.2 may also need to update manually if the old GitHub API check is rate-limited. Cached downloads may temporarily serve the old installer; verify the SHA-256 if in doubt.

The installer is not code-signed, so Windows SmartScreen may display a warning. It still does not change file associations. After upgrading, use **Settings → File associations → Register** if you want Vivida to remain available for the formats you selected.

Map data: OpenFreeMap © OpenMapTiles Data from OpenStreetMap.

Installer SHA-256 (reissued): `C5B3F057BA738499E0EE98EB5CDB33ADD1608482420810A63946BFF5C05E8880`.
Source revision (private repository): `86c8d405aae665748a844369c2ccc10214e5b1ac`.
CUI map dependency: `0b44ba1725d211c33c9812eedf3d0be9d089407d`.
