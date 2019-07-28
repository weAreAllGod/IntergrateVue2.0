<template>
  <videoPlayer  class="video-player-box vedio" ref="videoPlayer"
                 :options="playerOptions"
 
                 title="you can listen some event if you need"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @statechanged="playerStateChanged($event)"      
                 @ready="playerReadied">
  </videoPlayer>
</template>
 
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
  // :options="playerOptions"
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  //  @loadeddata="onPlayerLoadeddata($event)"
    // @ended="onPlayerEnded($event)"
               
    //              @waiting="onPlayerWaiting($event)"
    //              @playing="onPlayerPlaying($event)"
    //              @timeupdate="onPlayerTimeupdate($event)"
    //              @canplay="onPlayerCanplay($event)"
    //              @canplaythrough="onPlayerCanplaythrough($event)"
 
  // require('some-videojs-plugin')
  export default {
    name:"vedio",
    data() {
      return {
        playerOptions: {
 
          // component options
          start: 0,
          playsinline: false,
 
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "/static/IntakePlantStaticSource/Vedio/test.mp4"
          }],
          poster: "/static/IntakePlantStaticSource/Vedio/coverofvedio.jpg",
          controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,//提示还剩多少
          fullscreenToggle: true  //全屏按钮
        }
        }
      }
    },
    components:{
       videoPlayer
    }
    
    ,
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event
 
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      onPlayerEnded(player){},
      onPlayerLoadeddata(player){},
      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
  }
</script>

<style>
.vedio{
  /* position: fixed; */

  margin-top: 40px;
  width: 309px;
  height: 500px;
}

</style>
