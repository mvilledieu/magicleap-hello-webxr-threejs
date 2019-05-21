
# WebXR "hello-world" using three.js on Helio.

### /!\ This "hello-world" uses a [custom build](https://github.com/mvilledieu/three.js/tree/dev/build) of [three.js](https://github.com/mrdoob/three.js) and works only with [Lumin 0.96.0](https://creator.magicleap.com/downloads/lumin-os) /!\

- Tested only with on Magic Leap Helio - Lumin OS 0.96.0 (The current WebXR interface in Helio is based on the version in Chrome version 73)
- Make sure to use this [custom build](https://github.com/mvilledieu/three.js/tree/dev/build) in your projects.

To try it out on device open [helio](https://www.magicleap.com/experiences/helio) and go to that link:
[https://mvilledieu.github.io/magicleap-threejs-webxr-hello-world/](https://mvilledieu.github.io/magicleap-threejs-webxr-hello-world/)

## local development

For local testing you'll need to generate a `cert.pem` and `key.pem` and put them at the root of your folder. http-server needs it to serve your files over https (Required by WebXR).

```sh
$ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
$ yarn
$ yarn dev
```
Once you see the `Your connection is not private` message please click on `advanced` and `Proceed to 127.0.0.1 (unsafe)`. 

