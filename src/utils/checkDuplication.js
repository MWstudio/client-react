import axiosInstance from './axiosInstance';

const checkDuplication = async (type, value) => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/check-exists/${type}/${value}`,
    );
    return !response.data.result;
  } catch (err) {
    console.log(err);
  }
};

export default checkDuplication;
