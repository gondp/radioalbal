import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.radiosol.albal',
  appName: 'Ràdio Sol Albal',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  ios: {
    scheme: 'Ràdio Sol Albal',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      //backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      //androidScaleType: "CENTER_CROP",
      //showSpinner: true,
      //androidSpinnerStyle: "large",
      //iosSpinnerStyle: "small",
      //spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      //layoutName: "launch_screen",
      //useDialog: true,
    },
  },
  android: {
    buildOptions: {
       keystorePath: '/Users/gonzalodiaz/Git/radiosol-albal/Documentos/websystem.keystore',
       keystoreAlias: 'websystem',
    },
  }
};

export default config;
