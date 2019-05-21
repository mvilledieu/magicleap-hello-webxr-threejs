class WebXR {

	constructor(renderer, options) {
		this.renderer = renderer;
		this.currentSession = null;

		if (options && options.frameOfReferenceType) {
			this.renderer.vr.setFrameOfReferenceType(options.frameOfReferenceType);
		}

		this.button = this.createButton();

		if ('xr' in navigator && 'supportsSessionMode' in navigator.xr) {
			navigator.xr.supportsSessionMode('immersive-ar') //MagicLeap
				.then(this.showEnterXR)
				.catch(this.showXRNotFound);
		} else {
			this.showXRNotFound();
		}
	}

	onSessionStarted = session => {
		session.addEventListener('end', this.onSessionEnded);

		this.renderer.vr.setSession(session);
		this.renderer.vr.enabled = true;
		this.button.textContent = 'EXIT WEBXR';

		this.currentSession = session;
	}

	onSessionEnded = () => {
		this.currentSession.removeEventListener('end', this.onSessionEnded);

		this.renderer.vr.setSession(null);
		this.renderer.vr.enabled = false;
		this.button.textContent = 'ENTER WEBXR';

		this.currentSession = null;
	}

	showEnterXR = device => {
		if (device) this.renderer.vr.setDevice(device);
		this.button.textContent = 'ENTER WEBXR';
		this.button.onclick = () => {
			if (this.currentSession === null) {
				navigator.xr.requestSession({
						mode: 'immersive-ar'
					})
					.then(this.onSessionStarted);
			} else {
				this.currentSession.end();
			}
		};
	}

	showXRNotFound = () => {
		this.button.textContent = 'WEBXR NOT FOUND';
		this.renderer.vr.setDevice(null);
	}

	createButton() {
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

		button.onmouseenter = () => button.style.opacity = '1.0';
		button.onmouseleave = () => button.style.opacity = '0.5';

		return button;
	}

	getButton = () => this.button;
	
}