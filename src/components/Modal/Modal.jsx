import './modal.scss'
import CloseIcon from '../../assets/images/svg/closeIcon.svg'
import Button from '../Button';
import Typography from '../Typography';

const Modal = ({ id, showModal, setShowModal, modalImage, modalTitle, modalText, btnPrimaryLabel, btnSecondaryLabel, className, onPrimaryClick, onSecondaryClick }) => {
    const closeModal = () => {
      setShowModal(false);
    }

    return (
        <>
            {showModal && (
              <dialog id="my_modal_2" className="modal" open={showModal}>
                  <div className="modal-box rounded-none py-10">

                    {/* close button */}
                    <Button
                        size='btn-sm'
                        variant="btn-ghost"
                        className='hover:bg-base-100 absolute right-2 top-2'
                        iconPosition='left'
                        icon={CloseIcon}
                        onClick={closeModal}
                    >
                    </Button>

                    {
                      modalImage && 
                      <div className='mb-4 flex justify-center'>
                        <img src={modalImage} alt="icon"/>
                      </div>
                    }

                    {
                        modalTitle && 
                        <Typography
                          className="mb-1 w-full text-center"
                          size="text-xl"
                          weight="font-medium"
                          color='text-base-content'
                        >
                          {modalTitle}
                        </Typography>
                    }
                    
                    {
                      modalText && 
                      <Typography
                        className="mb-1 w-full text-center px-8"
                        size="text-base"
                        weight="font-normal"
                        color='text-base-content'
                      >
                        {modalText}
                      </Typography>
                    }

                    { btnPrimaryLabel && (
                    <div className='flex justify-center gap-4 mt-5'>

                      {/* if button secondary available */}
                      {
                            btnSecondaryLabel && (
                              <Button
                                variant="btn-secondary btn-sm"
                                className='min-w-32 px-0'
                                onClick={onSecondaryClick || closeModal}
                              >
                                {btnSecondaryLabel}
                              </Button>
                            )
                      }

                      <Button
                          variant="btn-primary btn-sm"
                          className='min-w-32 px-0'
                          onClick={onPrimaryClick || closeModal}
                      >
                          {btnPrimaryLabel}
                      </Button>
                      
                    </div>
                    )}

                  </div>
              </dialog>
            )}
        </>
    );
};

export default Modal;
