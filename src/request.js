const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://49.234.117.123:3000"
    : "http://localhost:3000";
console.log("baseUrl", baseUrl);

const request = ({
  url,
  method = "post",
  data,
  headers = {},
  onProgress = e => e,
  requestList
}) => {
  return new Promise(resolve => {
    const _url = baseUrl + url;
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = onProgress;
    xhr.open(method, _url);
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = e => {
      // 将请求成功的 xhr 从列表中删除
      // remove xhr which status is success
      if (requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr);
        requestList.splice(xhrIndex, 1);
      }
      resolve({
        data: e.target.response
      });
    };
    // 暴露当前 xhr 给外部
    // export xhr
    requestList?.push(xhr);
  });
};

export default request;
