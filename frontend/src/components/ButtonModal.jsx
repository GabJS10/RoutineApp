function ButtonModal({ children, description, idModal, ...props }) {
  return (
    <>
      <button
        onClick={() => document.getElementById(idModal).showModal()}
        {...props}
      >
        {description}
      </button>

      {children}
    </>
  );
}

export default ButtonModal;
