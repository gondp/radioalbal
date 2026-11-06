import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonButton, IonContent, IonHeader, IonIcon, Platform } from '@ionic/angular';
import { MediaSession } from '@capgo/capacitor-media-session';

@Component({
  selector: 'app-directo',
  templateUrl: 'directo.page.html',
  styleUrls: ['directo.page.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonContent, IonHeader, IonIcon],
})
export class DirectoPage implements AfterViewInit {
  @ViewChild('audio', { static: true }) private readonly audioElement!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  private metadataConfigured = false;
  private mediaPlaybackState: 'playing' | 'paused' = 'paused';
  private readonly ngZone = inject(NgZone);
  private readonly changeDetector = inject(ChangeDetectorRef);

  constructor(private readonly platform: Platform) {}

  async ngAfterViewInit(): Promise<void> {
    await this.platform.ready();

    // Registrar los callbacks cuando Capacitor y la vista ya están disponibles.
    void MediaSession.setActionHandler({ action: 'play' }, () => void this.playRadio());
    void MediaSession.setActionHandler({ action: 'pause' }, () => void this.pauseRadio());
    console.log('[📡 CONTROL MEDIA] Handlers de MediaSession registrados');

    const player = this.getPlayer();
    player?.addEventListener('play', () => this.setPlayingState(true));
    player?.addEventListener('pause', () => this.setPlayingState(false));
    player?.addEventListener('error', () => this.setPlayingState(false));

    // Al volver desde la notificación, sincronizar la interfaz con el audio real.
    void App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        this.setUiPlayingState(!player?.paused);
      }
    });
  }

  async radioPlay(): Promise<void> {
    const player = this.getPlayer();
    if (!player) return;

    if (player.paused) {
      await this.playRadio();
    } else {
      await this.pauseRadio();
    }
  }

  private async playRadio(): Promise<void> {
    const player = this.getPlayer();
    if (!player) return;

    try {
      // Configurar los metadatos antes de iniciar el servicio evita una carrera
      // del plugin mientras MediaSessionService todavía está conectándose.
      if (!this.metadataConfigured) {
        await MediaSession.setMetadata({
          title: 'Ràdio Sol Albal 93.7 FM',
          artist: 'Directo',
          album: 'Ràdio Sol Albal',
          artwork: [
            { src: 'assets/img/radiosol_morado_naranja.png', type: 'image/png', sizes: '512x512' },
          ],
        });
        this.metadataConfigured = true;
      }

      // Actualizar el estado después de los metadatos inicia el servicio de forma segura.
      await this.setPlaybackState('playing');
      // No llamar a load() al reanudar: en un stream en directo reinicia la conexión.
      await player.play();
      console.log('[🔊 MEDIA SESION] playbackState a PLAYING');
    } catch (error) {
      this.setPlayingState(false);
      console.error('[🔊 MEDIA SESION] No se pudo reanudar el streaming', error);
    }
  }

  private async pauseRadio(): Promise<void> {
    const player = this.getPlayer();
    if (!player) return;

    player.pause();
    // Reiniciar el elemento al pausar descarta el buffer acumulado.
    // El siguiente play volverá a conectarse al punto actual del directo.
    player.load();
    await this.setPlaybackState('paused');
    console.log('[🔊 MEDIA SESION] playbackState a PAUSED');
  }

  private getPlayer(): HTMLAudioElement | null {
    return this.audioElement?.nativeElement ?? null;
  }

  private setPlayingState(isPlaying: boolean): void {
    void this.setPlaybackState(isPlaying ? 'playing' : 'paused');
  }

  private setUiPlayingState(isPlaying: boolean): void {
    this.ngZone.run(() => {
      this.isPlaying = isPlaying;
      this.changeDetector.detectChanges();
    });
  }

  private async setPlaybackState(state: 'playing' | 'paused'): Promise<void> {
    this.setUiPlayingState(state === 'playing');
    if (this.mediaPlaybackState === state) return;

    this.mediaPlaybackState = state;
    await MediaSession.setPlaybackState({ playbackState: state });
  }
}
