
const updateProfileImageById = async (formData) => {

  const fd = new FormData();
  fd.append('profile_image', formData.profile_image);
  const res = await patch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/${formData.fetch('url').toString()}/upload_image/${formData.fetch('id').toString()}`,
    formData,
  );
  return res.json();
};

const profileImageService = {
  updateProfileImageById,
};

export default profileImageService;
