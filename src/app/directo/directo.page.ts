import { Component, NgZone } from '@angular/core';
import { MediaSession } from '@jofr/capacitor-media-session';

@Component({
  selector: 'app-directo',
  templateUrl: 'directo.page.html',
  styleUrls: ['directo.page.scss']
})
export class DirectoPage {
  isPlaying = false;
  public playbackStopped: any;

  constructor(private ngZone: NgZone) {
    // Establecemos los manejadores de acción para los eventos 'play' y 'pause' de MediaSession.
    // Ambos eventos llamarán a la función radioPlay.
    MediaSession.setActionHandler({ action: 'play' }, () => this.radioPlay());
    MediaSession.setActionHandler({ action: 'pause' }, () => this.radioPlay());
    console.log('[ 📡 CONTROL MEDIA] Control media click ');
  }

  // Función que se llama cuando se pulsa el botón de play o pause.
  radioPlay() {
    // Obtenemos el elemento de audio.
    const player = document.getElementById('audio') as HTMLAudioElement;
    // Actualizamos el estado de reproducción.
    this.updatePlaybackState();

    // Establecemos los metadatos de la sesión de medios.
    MediaSession.setMetadata({
      title: "Ràdio Sol Albal 93.7 FM",
      artist: "Directo",
      album: '',
      artwork: [
        { src: '../../assets/img/radiosol_morado_naranja.png', type: 'image/png', sizes: '512x512' }
      ]
    });
    // Establecemos el estado de la posición de la sesión de medios.
    MediaSession.setPositionState({
      position: 0,
      duration: 0,
      playbackRate: player.playbackRate
    });
    console.log('[🔊 MEDIA SESION] PlayRadio accion para Radio: - Estado reproducción: ' + this.isPlaying );
  }

  updatePlaybackState = () => {
    const player = document.getElementById('audio') as HTMLAudioElement;
    const playbackState = this.playbackStopped ? 'none' : (player.paused ? 'paused' : 'playing');

    if (playbackState === 'paused') {
      player.load();
      player.play();
      this.ngZone.run(() => this.isPlaying = true);
      MediaSession.setPlaybackState({ playbackState: 'playing' });
      console.log('[🔊 MEDIA SESION] playbackState a PLAYING');
    }

    if (playbackState === 'playing') {
      player.pause();
      MediaSession.setPlaybackState({ playbackState: 'paused' });
      this.ngZone.run(() => this.isPlaying = false);
      console.log('[🔊 MEDIA SESION] playbackState a PAUSED');

    }
  }
}
