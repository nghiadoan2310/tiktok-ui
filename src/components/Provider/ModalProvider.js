import { createContext, useState } from 'react';

export const ModalContext = createContext();

function ModalProvider({ children }) {
    const [activeModal, setActiveModal] = useState(false);
    const [activeLogOut, setActiveLogOut] = useState(false);
    const [activeLoginForm, setActiveLoginForm] = useState(false);
    const [isLoginFrom, setIsLoginForm] = useState(true);
    const [isPolicy, setIsPolicy] = useState(false);
    const [convertForm, setConvertForm] = useState(false);
    const [activeEditProfileForm, setActiveEditProfileForm] = useState(false);

    const handleShowModal = () => {
        setActiveModal(true);
        document.body.style.overflowY = 'hidden'
    };

    const handleHideModal = () => {
        setActiveModal(false);
        setIsLoginForm(true);
        document.body.style.overflowY = 'auto'
        setIsPolicy(true);
        setConvertForm(false)
    };

    const handleShowModalLogOut = () => {
        setActiveLogOut(true);
    };

    const handleHideModalLogOut = () => {
        setActiveLogOut(false);
    };

    const handleShowModalLoginForm = () => {
        setActiveLoginForm(true);
        setIsLoginForm(true);
        setIsPolicy(true);
        setConvertForm(false);
    };

    const handleHideModalLoginForm = () => {
        setActiveLoginForm(false);
        document.body.style.overflowY = 'auto'
    };

    const handleShowModalEditForm = () => {
        setActiveEditProfileForm(true);
    };

    const handleHideModalEditForm = () => {
        setActiveEditProfileForm(false);
        document.body.style.overflowY = 'auto'
    };

    
    const value = {
        isLoginFrom,
        activeModal,
        activeLogOut,
        activeLoginForm,
        isPolicy,
        convertForm,
        activeEditProfileForm,
        setIsLoginForm,
        setIsPolicy,
        setConvertForm,
        handleShowModal,
        handleShowModalLogOut,
        handleShowModalLoginForm,
        handleHideModal,
        handleHideModalLogOut,
        handleHideModalLoginForm,
        handleShowModalEditForm,
        handleHideModalEditForm,

    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalProvider;