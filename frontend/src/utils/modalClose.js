const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
}

export default handleModalClose;