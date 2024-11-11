import React, { useEffect, useState } from 'react';
import PasswordResetModal from '../Modals/PasswordResetModal';

function ResetPasswordPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <PasswordResetModal onClose={handleCloseModal} />}
    </>
  );
}

export default ResetPasswordPage;
