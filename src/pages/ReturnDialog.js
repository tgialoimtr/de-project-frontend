import React from 'react';
import './ReturnDialog.css';

const ReturnDialog = ({ showDialog, returnDialogMessage, onClose, onNext }) => {
  const closeDialog = () => {
    onClose();
  };

  const nextDialog = () => {
    onNext();
  };

  return (
    showDialog && (
      <div className="return-dialog">
        <div className="return-dialog-content">
          <p>{returnDialogMessage}</p>
          <div className='button-container'>
            <button onClick={closeDialog} className="close-button">
                Close
            </button>
            <button onClick={nextDialog} className="close-button">
                Next
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReturnDialog;