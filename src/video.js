import video_1 from './video/video_1.mp4'
import { forwardRef, useImperativeHandle, useRef } from 'react'

function Video(props, ref) {

    const videoRef = useRef();

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play();
        },
        pause() {
            videoRef.current.pause();
        }
    }))

    return(
        <video 
        ref={videoRef}
        src= {video_1} 
        style={{height:'500px', margin:'50px'}}/>
    )
}

export default forwardRef(Video)