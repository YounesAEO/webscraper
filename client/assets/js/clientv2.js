$(async () => {
  let response = await fetch(`http://localhost:5000/configs/`);
  let data = await response.json();
  for (let element of data) {
    let template = `<div class="row">
    <div class="col-md-12 mb-3">
      <h3 class="website-name">${element.website_name}</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h5 class="website-url">
        ${element.website_url}
      </h5>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 mb-3 mt-3">
      <button class="main-btn-v2" type="submit">Scrape</button>
    </div>
    <div class="col-md-4 mb-3 mt-3">
      <button class="main-btn-v2">History</button>
    </div>
    <div class="col-md-4 mb-3 mt-3">
      <button class="main-btn-v2">
        <a href="./configForm.html">Edit</a>
      </button>
    </div>
  </div>`;
    $(".main-title").after(template);
  }
  $(".loading").css("display", "none");
});
