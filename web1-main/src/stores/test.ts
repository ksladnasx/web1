import axios from "axios";
async function getWebsite() {
    const res = await axios({
      url: "https://jy8b5cnnmg.hzh.sealos.run/test1",
      method: "get"
    })
    console.log(res.data)
  }

getWebsite();