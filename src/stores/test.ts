import axiosInstance from "../untils/req";
async function getWebsite() {
    const res = await axiosInstance({
      url: "/test1",
      method: "get"
    })
    console.log(res.data)
  }

getWebsite();