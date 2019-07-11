#  Magic Leap Helio - Hello WebXR (three.js)
 
Hello World, made using **three.js r106** together with a ***mandatory*** custom `HelioWebXRPolyfill.js` wrote to add compatibility to three.js to the older version of the WebXR API used by Helio.


## Try "Hello WebXR" on device:

  

To try it out on device open [helio](https://www.magicleap.com/experiences/helio) and go to that link:

https://bit.ly/2W5W1mJ

## Fork (Remix) and live edit this example:

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/magicleap-hello-webxr-threejs)
  
## Local server:

For local testing/serving you'll need to generate a `cert.pem` and `key.pem` and put them at the root of your folder. The npm module `http-server` needs it to be able to serve your files over https (Required by WebXR).

  

```sh
$ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
$ yarn
$ yarn serve
```

Once you see the `Your connection is not private` message please click on `advanced` and `Proceed to 127.0.0.1 (unsafe)` and have fun!
