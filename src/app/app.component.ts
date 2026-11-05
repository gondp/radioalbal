import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { SystemBarType, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private readonly platform: Platform) {}

  async ngOnInit(): Promise<void> {
    await this.platform.ready();
    await this.applyStatusBarStyle();

    // El splash/Android puede restablecer la apariencia al mostrar la primera vista.
    // Reaplicamos el estilo cuando la aplicación ya está activa.
    await App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        void this.applyStatusBarStyle();
      }
    });

    // Cubre el cambio de ventana que ocurre al finalizar el primer arranque.
    window.setTimeout(() => void this.applyStatusBarStyle(), 500);
  }

  private async applyStatusBarStyle(): Promise<void> {
    try {
      await StatusBar.setStyle({ style: Style.Light });
      await SystemBars.setStyle({
        style: SystemBarsStyle.Light,
        bar: SystemBarType.StatusBar,
      });
    } catch (error) {
      console.warn('No se pudo configurar la barra de estado', error);
    }
  }
}
