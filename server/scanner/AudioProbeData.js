const AudioFileMetadata = require('../objects/AudioFileMetadata')

class AudioProbeData {
  constructor() {
    this.embeddedCoverArt = null
    this.format = null
    this.duration = null
    this.size = null
    this.bitRate = null
    this.codec = null
    this.timeBase = null
    this.language = null
    this.channelLayout = null
    this.channels = null
    this.sampleRate = null
    this.chapters = []

    this.audioFileMetadata = null

    this.trackNumber = null
    this.trackTotal = null
  }

  getEmbeddedCoverArt(videoStream) {
    const ImageCodecs = ['mjpeg', 'jpeg', 'png']
    return ImageCodecs.includes(videoStream.codec) ? videoStream.codec : null
  }

  setData(data) {
    var audioStream = data.audio_stream
    this.embeddedCoverArt = data.video_stream ? this.getEmbeddedCoverArt(data.video_stream) : null
    this.format = data.format
    this.duration = data.duration
    this.size = data.size
    this.bitRate = audioStream.bit_rate || data.bit_rate
    this.codec = audioStream.codec
    this.timeBase = audioStream.time_base
    this.language = audioStream.language
    this.channelLayout = audioStream.channel_layout
    this.channels = audioStream.channels
    this.sampleRate = audioStream.sample_rate
    this.chapters = data.chapters || []

    var metatags = {}
    for (const key in data) {
      if (data[key] && key.startsWith('file_tag')) {
        metatags[key] = data[key]
      }
    }

    this.audioFileMetadata = new AudioFileMetadata()
    this.audioFileMetadata.setData(metatags)

    // Track ID3 tag might be "3/10" or just "3"
    if (this.audioFileMetadata.tagTrack) {
      var trackParts = this.audioFileMetadata.tagTrack.split('/').map(part => Number(part))
      if (trackParts.length > 0) {
        this.trackNumber = trackParts[0]
      }
      if (trackParts.length > 1) {
        this.trackTotal = trackParts[1]
      }
    }
  }
}
module.exports = AudioProbeData