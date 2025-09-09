import { createContext, useState } from 'react';

export const VideoContext = createContext();

function VideoProvider({ children }) {
    const [listVideo, setListVideo] = useState([])
    const [showDetailVideo, setShowDetailVideo] = useState(false);
    const [positionVideo, setPositionVideo] = useState(null);
    const [isMenuRightMouse, setIsMenuRightMouse] = useState(0);
    const [rightMouseX, setRightMouseX] = useState(0);
    const [rightMouseY, setRightMouseY] = useState(0);
    const [videoId, setVideoId] = useState(0);
    const [videoUsername, setVideoUsername] = useState('')
    const [valueVolume, setValueVolume] = useState(0);
    const [mutedVideo, setMutedVideo] = useState(true);
    const [recommendVideoPosition, setRecommendVideoPosition] = useState(0);
    const [isChangeState, setIsChangeState] = useState(false);
    const [locationPathname, setLocationPathname] = useState('');

    const handleShowDetailVideo = () => {
        setShowDetailVideo(true);
        document.body.style.overflowY = 'hidden'
    }

    const isInViewVideoList = listVideo.map(() => {
        const newArray = {
            inView: false,
            updateInview: function (stateView) {
                this.inView = stateView;
            },
        }

        return newArray;
    })

    const value = {
        isInViewVideoList,
        listVideo,
        showDetailVideo,
        positionVideo,
        rightMouseX,
        rightMouseY,
        isMenuRightMouse,
        videoId,
        videoUsername,
        valueVolume,
        mutedVideo,
        recommendVideoPosition,
        isChangeState,
        locationPathname,
        setListVideo,
        setPositionVideo,
        setRightMouseX,
        setRightMouseY,
        setIsMenuRightMouse,
        setShowDetailVideo,
        setVideoId,
        setVideoUsername,
        setValueVolume,
        setMutedVideo,
        setRecommendVideoPosition,
        setIsChangeState,
        setLocationPathname,
        handleShowDetailVideo,
    };

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

export default VideoProvider;