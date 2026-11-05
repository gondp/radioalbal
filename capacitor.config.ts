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
    SystemBars: {
      // La aplicación gestiona su propio layout; evita la inyección de CSS de safe-area.
      insetsHandling: 'disable',
      style: 'LIGHT',
      hidden: false,
      animation: 'NONE',
    },
    StatusBar: {
      // Iconos oscuros desde el primer frame, antes de cargar Angular.
      style: 'LIGHT',
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      launchFadeOutDuration: 0,
      //backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      //androidScaleType: "CENTER_CROP",
      //showSpinner: true,
      //androidSpinnerStyle: "large",
      //iosSpinnerStyle: "small",
      //spinnerColor: "#999999",
      // No modificar la apariencia de la barra de estado durante el arranque.
      splashFullScreen: false,
      splashImmersive: false,
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
