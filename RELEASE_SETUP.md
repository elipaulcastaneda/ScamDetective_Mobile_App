# Release Build Setup for Direct Download Distribution

## Step 1: Generate a Keystore (One-time setup)

Run this command to create your signing keystore:

```powershell
keytool -genkeypair -v -storetype PKCS12 -keystore scamdetective-release.keystore -alias scamdetective -keyalg RSA -keysize 2048 -validity 10000
```

You'll be asked for:
- Keystore password (create a strong password and SAVE IT)
- Key password (can be the same as keystore password)
- Your name/organization details

**IMPORTANT:** Keep `scamdetective-release.keystore` and the passwords SAFE. You need them for every update. If you lose them, users can't upgrade the app without uninstalling first.

## Step 2: Create Keystore Properties File

Create `android/keystore.properties` with your keystore info:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=scamdetective
storeFile=../scamdetective-release.keystore
```

**IMPORTANT:** Add `keystore.properties` to `.gitignore` to keep passwords private!

## Step 3: Build Release APK

```powershell
# From project root
npm run build:mobile

# Build signed release APK
cd android
.\gradlew assembleRelease
```

Output will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Step 4: Distribute on Your Website

1. Upload `app-release.apk` to your website (e.g., `https://yoursite.com/downloads/scamdetective.apk`)
2. Add a download button on your site
3. Include installation instructions

### Sample Download Page HTML:

```html
<div>
  <h2>Download ScamDetective for Android</h2>
  <a href="downloads/scamdetective.apk" download>
    <button>Download APK (v1.0)</button>
  </a>
  
  <h3>Installation Instructions:</h3>
  <ol>
    <li>Download the APK file</li>
    <li>Open the downloaded file</li>
    <li>Tap "Settings" when prompted about unknown sources</li>
    <li>Enable "Allow from this source"</li>
    <li>Go back and tap "Install"</li>
  </ol>
  
  <p><strong>Note:</strong> Android will show a security warning because the app is not from Google Play Store. This is normal for apps distributed directly.</p>
</div>
```

## Step 5: Version Updates

When you release updates:

1. Update `versionCode` and `versionName` in `android/app/build.gradle`
2. Rebuild: `npm run build:mobile && cd android && .\gradlew assembleRelease`
3. Upload new APK to your website
4. Users must manually download and install the new version

## Security Notes

- Users will need to enable "Unknown Sources" or "Install Unknown Apps" permission
- Your app won't be scanned by Google Play Protect
- You're responsible for security updates
- Consider adding auto-update checking in your app

## Testing

Before distributing:
1. Test the release APK on multiple devices
2. Verify all features work (sometimes release builds behave differently than debug)
3. Check that Supabase/API connections work
