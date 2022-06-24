import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Modal from 'components/Modal';
import ImageCropModalContent from 'components/Modal/ImageCropModal';
import useOpenCloseTrigger from 'hooks/useOpenCloseTrigger';
import { CurrentUserContext } from 'App';
import axiosInstance from 'utils/axiosInstance';
import { TextField, IconButton, Divider } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {
  triggerProfileUpdateModal,
  triggerImageCropModal,
  triggerAccountEnrollmentModal,
} from 'store/modules/modal';
import {
  ProfileUpdateModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  SaveButton,
  ProfileUpdateContainer,
  ProfileImage,
  ProfileDescription,
} from './styles';

/* 현재 currentUser에 따라서 보여주는 것이 다른 부분 존재. 
로그인한 유저라면, 성향 / 게임연동 수정 칸도 같이
currentUser가 없는 신규 유저라면 성향 게임 연동칸은 없음. axios 요청에 auth Header 없음!
*/

const ProfileUpdateModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(triggerProfileUpdateModal());
  };
  const modalState = useSelector(state => state.modal);

  /* react-query로 현재 프로필 가져오기*/
  const currentUser = useContext(CurrentUserContext);
  const userID = currentUser?.user?.unique_id;

  const { data, isFetching, isError } = useQuery(
    ['profile', `${userID}`],
    () => axiosInstance.get(`api/profile/${userID}`),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
      //staleTime: 24 * 60 * 60 * 1000,
    },
  );
  console.log(data);

  /* react-query로 프로필 업데이트*/
  const queryClient = useQueryClient();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const mutation = useMutation(data => {
    return axiosInstance.post('/api/profile/setting', data, config);
  });

  /* 이미지 업로드하면 보여주기*/
  const [loadedProfileImage, setLoadedProfileImage] = useState({
    imagePreviewUrl: '',
    imageBlob: null,
  });

  const handleProfileImageChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      // 이미지 새로 선택안하고 취소하면 undefined로 되어서 에러 뜰거임
      reader.readAsDataURL(file); // 1. reader에게 file을 먼저 읽히고
      reader.onloadend = () => {
        setLoadedProfileImage({ imagePreviewUrl: reader.result });
        dispatch(triggerImageCropModal()); // 사진 업로드 하면 crop창 띄움
      }; // 2. 비동기적으로 load가 끝나면 state에 저장
    }
  };

  /* react-hook-form */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
  });

  const profileUpdateSubmit = async data => {
    console.log(data);
    console.log(loadedProfileImage);

    const formData = new FormData();
    // 바뀌면 바꿈
    if (data.nickname) formData.append('nickname', data.nickname);
    if (data.introduction) formData.append('introduction', data.introduction);
    if (loadedProfileImage.imageBlob) {
      formData.append('file', loadedProfileImage.imageBlob);
    } else {
      formData.append('file', {});
    }

    mutation.mutate(formData, {
      onSuccess: formData => {
        closeModal(); // 해당 mutation이 끝나기 전에 이 컴포넌트 unmount 되면 callback not fire!!!
        // 첫 회원가입이면 작동
        return queryClient.invalidateQueries(['profile', `${userID}`]); // 'return' wait for invalidate
      },
      onError: err => {
        console.log(err);
      },
      //error success 상관 없이
      onSettled: data => {
        // 회원가입이면 프로필 창 다음에 게임 계정 등록으로
        if (window.sessionStorage.getItem('is_first')) {
          dispatch(triggerAccountEnrollmentModal());
          window.sessionStorage.removeItem('is_first');
        }
      },
    });
  };
  /* --------------------------------- */

  if (isFetching) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>404</div>;
  }

  if (data) {
    return (
      <ProfileUpdateModalContainer>
        <MainContainer>
          <ModalButtons>
            <CloseButton onClick={closeModal} />
            <h4 className="title">프로필 업데이터</h4>
            <SaveButton
              color="primary"
              variant="contained"
              onClick={() => {
                handleSubmit(profileUpdateSubmit)();
              }}
            >
              저장
            </SaveButton>
          </ModalButtons>
          <ProfileUpdateContainer>
            <form>
              <h6>프로필 사진</h6>
              <ProfileImage>
                {loadedProfileImage.imagePreviewUrl ? (
                  <img src={loadedProfileImage.imagePreviewUrl} alt="" />
                ) : (
                  <img src={data.data.user.profile_image_url} alt="" />
                )}

                <Controller
                  name="profileImage"
                  control={control}
                  render={({ field }) => {
                    return (
                      <input
                        accept="image/*"
                        id="profile-image-input"
                        type="file"
                        hidden
                        onChange={e => {
                          field.onChange(e.target.files); // input에 upload하는 파일 hook form에 등록
                          handleProfileImageChange(e); // preview를 위한 로직
                        }}
                      />
                    );
                  }}
                />
                <label htmlFor="profile-image-input" className="photo-icon">
                  <IconButton
                    variant="outlined"
                    color="primary"
                    component="span"
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </label>
              </ProfileImage>
              <ProfileDescription>
                <h6>닉네임</h6>
                <Controller
                  name="nickname"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={data.data.user.nickname}
                        value={field.value}
                        variant="outlined"
                        fullWidth
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
                <h6>자기소개</h6>
                <Controller
                  name="introduction"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={data.data.user.introduction}
                        variant="outlined"
                        value={field.value}
                        onChange={field.onChange}
                        fullWidth
                      />
                    );
                  }}
                />
              </ProfileDescription>
            </form>
            <div>게임 리스트 수정 - 요건 설정 탭을 따로 뺄까?</div>
          </ProfileUpdateContainer>
          {modalState.imageCrop && (
            <Modal closeModal={() => dispatch(triggerImageCropModal())}>
              <ImageCropModalContent
                imageURL={loadedProfileImage.imagePreviewUrl}
                setNewProfileImage={setLoadedProfileImage}
              />
            </Modal>
          )}
        </MainContainer>
      </ProfileUpdateModalContainer>
    );
  }
};

export default ProfileUpdateModal;
