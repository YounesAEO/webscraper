console.log("Working...");

const API_URL = "http://localhost:5000/api/scrape";

const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const label = document.getElementById("selector");

$(() => {
  label.classList.remove("active");
  label.innerHTML = "Select Config File";
  loading.style.display = "none";
  form.style.display = "";
});

const loader = (e) => {
  let file = e.target.files;
  let show = "<span> Selected file : </span>" + file[0].name;
  label.innerHTML = show;
  label.classList.add("active");
};

let fileInput = document.getElementById("jsonfile");
fileInput.addEventListener("change", loader);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const config = formData.get("jsonfile");
  if (config.type == "application/json") {
    const content = await config.text();
    loading.style.display = "";
    form.style.display = "none";
    console.log(JSON.parse(content));
    let response = await fetch(API_URL, {
      method: "POST",
      body: content,
      headers: {
        "content-type": "application/json",
      },
    });
    let scrapedData = await response.json();
    console.log(scrapedData);
    sessionStorage.setItem("scrapedData", JSON.stringify(scrapedData));
    sessionStorage.setItem("config", content);
    window.location.href = "./preview.html";
  } else {
    alert("config file is not a json file");
  }
});
