const extract = res => ({
  isSuccess: res && res?.data?.status === "success",
  data: res?.data?.data,
  errorMessage: res?.data?.error?.message
});

const responseExtractor = { extract };

export default responseExtractor;
