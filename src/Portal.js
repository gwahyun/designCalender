import reactDom from "react-dom";

const Portal = ({ children }) => {
    console.log('im portal');
    const el = document.getElementById("portal");
    return reactDom.createPortal(children, el);
};

export default Portal;