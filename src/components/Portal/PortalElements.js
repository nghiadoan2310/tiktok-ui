import Portal from ".";
import EditProfileForm from "../Modal/EditProfileForm";
import LogFormModal from "../Modal/LogForm";
import LogoutModal from "../Modal/LogoutModal";
import Notify from "../Notify";

function PortalElements() {
    return (
        <Portal>
            <LogoutModal></LogoutModal>
            <LogFormModal></LogFormModal>
            <EditProfileForm></EditProfileForm>
            <Notify></Notify>
        </Portal>
    );
}

export default PortalElements;