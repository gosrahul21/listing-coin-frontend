import { MouseEventHandler } from "react";

const Modal = ({ isOpen, onClose, children }: {isOpen: boolean, onClose: MouseEventHandler<HTMLButtonElement>, children: any}) => {
  const handleOutsideClick = (e: any) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose(e);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-20 top-0 left-0 w-full h-full flex bg-pencilGray bg-opacity-50 items-center justify-center modal-overlay" onClick={handleOutsideClick}>
          <div className="rounded shadow-md">
            {/* <button className="absolute top-0 right-0 p-2" onClick={onClose}>
              &times;
            </button> */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};


export default Modal;

