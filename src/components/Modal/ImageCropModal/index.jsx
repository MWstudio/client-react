import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Cropper from 'react-easy-crop';
import getCroppedImage from 'utils/cropImage';
import { Divider } from '@material-ui/core';
import { triggerImageCropModal } from 'store/modules/modal';
import {
  ImageCropModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  SaveButton,
  CropperContainer,
  ZoomSlider,
} from './styles';

/*imageUrl={loadedProfileImage.imagePreviewUrl}*/
const ImageCropModal = ({ imageURL, setNewProfileImage }) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerImageCropModal());

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /* crop하는 작업 ex. zoom하고 당기고 하는 것들*/
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  /* crop한 결과 표시, 저장*/
  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImage(
        imageURL,
        croppedAreaPixels,
        rotation,
      );
      console.log('donee', { croppedImage });
      setNewProfileImage({
        imageBlob: croppedImage,
        imagePreviewUrl: URL.createObjectURL(croppedImage),
      }); // ProfileModal에서 온 profileImage setState
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <ImageCropModalContainer tabIndex="-1">
      <MainContainer>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <h4 className="title">프로필 업데이터</h4>
          <SaveButton
            color="primary"
            variant="contained"
            onClick={async () => {
              await saveCroppedImage();
              closeModal();
            }}
          >
            적용
          </SaveButton>
        </ModalButtons>
        <Divider />
        <CropperContainer>
          <Cropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <ZoomSlider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </CropperContainer>
      </MainContainer>
    </ImageCropModalContainer>
  );
};

export default ImageCropModal;
