import { useContext } from "react";

import { VideoContext } from "../Provider";

import Portal from ".";
import EditProfileForm from "../Modal/EditProfileForm";
import LogFormModal from "../Modal/LogForm";
import LogoutModal from "../Modal/LogoutModal";
import Notify from "../Notify";
import MenuRightMouse from "../VideoOverlay/MenuRightMouse";
import VideoDetail from "../VideoDetail";


function PortalElements() {
    const ContextVideo = useContext(VideoContext)

    return (
        <Portal>
            <LogoutModal></LogoutModal>
            <LogFormModal></LogFormModal>
            <EditProfileForm></EditProfileForm>
            <Notify></Notify>
            <MenuRightMouse></MenuRightMouse>
            {ContextVideo.showDetailVideo && <VideoDetail></VideoDetail>}
        </Portal>
    );
}

export default PortalElements;