const API = "data/api.json",
  subscription = document.querySelector(".subscription"),
  download = document.querySelector(".download");

const sendRequest = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = () => {
      xhr.status >= 400 ? reject(xhr.response) : resolve(xhr.response);
    };
    xhr.send();
  });
};

sendRequest("GET", API).then((data) => {
  data.state === "ok"
    ? createCard(data)
    : (subscription.innerHTML =
        '<h1 style="margin: 0 auto">Subscription loading...</h1>');
});

const createCard = (arg) => {
  let arr = arg.result.elements,
    buttons = document.getElementsByTagName("a");

  arr.map((item) => {
    subscription.innerHTML += `
    <div class="subscription__card ${
      item.is_best ? "subscription__card_best" : ""
    } ${item.price_key === "50%" ? "subscription__card_discount" : ""} ">
      <span class="subscription__card_amount">$${item.amount}</span>
      <span>/PER YEAR</span>
      <p>${item.name_display.slice(0, 24)}</p>
      <p class="subscription__card_description">${item.license_name}</p>
      <a href="${item.link}" >
        <button>DOWNLOAD</button>
      </a>
    </div>
  `;
  });

  Array.from(buttons).forEach((item) =>
    item.addEventListener("click", function () {
      checkBrowser();
    })
  );
};

const checkBrowser = () => {
  const pathFireFox = "img/download-up.png";
  const pathChrome = "img/download-down.png";
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  const firefox = /firefox/.test(userAgent);
  const chrome = /chrome/.test(userAgent);

  if (firefox) {
    download.innerHTML = `<img src="${pathFireFox}" alt="download-up" >`;
    download.style = "display: block; top: 50px; right: 0px";
    download.classList.add("animation_up");
  } else if (chrome) {
    download.innerHTML = `<img src="${pathChrome}" alt="download-down">`;
    download.style = "display: block; bottom: 64px;";
    download.classList.add("animation_down");
  }
};
