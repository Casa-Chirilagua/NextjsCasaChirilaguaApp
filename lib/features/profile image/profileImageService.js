
const updateProfileImageById = async (formData) => {

  const fd = new FormData();
  fd.append('profile_image', formData.profile_image);
  const res = await patch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/${formData.get('url').toString()}/upload_image/${formData.get('id').toString()}`,
    formData,
  );
  return res.data;
};

const profileImageService = {
  updateProfileImageById,
};

export default profileImageService;
