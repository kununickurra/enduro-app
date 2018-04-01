**If you receive the error "cannot read property 'replace' of undefined" when launching the android emulator:**

Open the file /platforms/android/cordova/lib/emulator.js and replace line (214)

From :  
```javascript
var num = target.split('(API level ')[1].replace(')', '');
```
To:  
```javascript
var num = target.match(/\d+/)[0];
```

