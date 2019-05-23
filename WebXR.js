/**
 * Based on @tojiro's vr-samples-utils.js
 * and @mrdoob WebVR.js
 */

function WebXR(renderer, options) {

	let currentSession = null;
	const button = createButton();

	if (options && options.frameOfReferenceType) {
		renderer.vr.setFrameOfReferenceType(options.frameOfReferenceType);
	}

	if ('xr' in navigator && 'supportsSessionMode' in navigator.xr) {
		navigator.xr.supportsSessionMode('immersive-ar')
			.then(showEnterXR)
			.catch(showXRNotFound);
	} else {
		showXRNotFound();
	}

	function onSessionStarted(session) {
		session.addEventListener('end', onSessionEnded);

		renderer.vr.setSession(session);
		renderer.vr.enabled = true;
		button.textContent = 'EXIT WEBXR';

		currentSession = session;
	}

	function onSessionEnded() {
		currentSession.removeEventListener('end', onSessionEnded);

		renderer.vr.setSession(null);
		renderer.vr.enabled = false;
		button.textContent = 'ENTER WEBXR';

		currentSession = null;
	}

	function showEnterXR(device) {
		if (device) renderer.vr.setDevice(device);
		button.textContent = 'ENTER WEBXR';

		button.onclick = function () {
			if (currentSession === null) {
				navigator.xr.requestSession({
						mode: 'immersive-ar'
					})
					.then(onSessionStarted);
			} else {
				currentSession.end();
			}
		};
	}

	function showXRNotFound() {
		button.textContent = 'WEBXR NOT FOUND';
		renderer.vr.setDevice(null);

		button.onclick = function () {
			location.href = 'https://github.com/immersive-web/webxr/blob/master/explainer.md';
		}
	}

	function createButton() {
		const button = document.createElement('button');

		button.textContent = `ENTER`;
		button.style.position = 'absolute';
		button.style.bottom = '20px';
		button.style.padding = '12px 6px';
		button.style.border = '1px solid #fff';
		button.style.borderRadius = '4px';
		button.style.background = 'rgba(0,0,0,0.1)';
		button.style.color = '#fff';
		button.style.font = 'normal 13px sans-serif';
		button.style.textAlign = 'center';
		button.style.opacity = '0.5';
		button.style.outline = 'none';
		button.style.zIndex = '999';
		button.style.transform = 'translate(-50%, -50%)';
		button.style.left = '50%';
		button.style.cursor = 'pointer';

		button.onmouseenter = function () {
			button.style.opacity = '1.0'
		};
		button.onmouseleave = function () {
			button.style.opacity = '0.5'
		};

		return button;
	}

	return button;

}