const exportJSON = (obj, title) => {
  try {
    const jsonContent =
      "data:application/json;charset=utf-8," + JSON.stringify(obj);
    const encodedUri = encodeURI(jsonContent);
    const a = document.createElement("a");
    a.href = encodedUri;
    a.target = "_blank";
    a.download = `${title}.json`;
    const clickHandler = () => {
      setTimeout(() => {
        a.removeEventListener("click", clickHandler);
      }, 150);
    };
    a.addEventListener("click", clickHandler, false);
    a.click();
  } catch (err) {
    alert("something went wrong");
  }
};

$(() => {
  $(".loading").css("display", "none");
  //rendering data fields
  let fields = [
    "Name",
    "Logo",
    "ShortDescription",
    "Industries",
    "Founders",
    "City",
    "Country",
    "Main Website",
  ];
  for (let i = 0; i < fields.length; i++) {
    let template = `<div class="form-row">
    <div class="col-md-10 mb-3">
      <label class="data-field" id="${fields[i].toLowerCase()}">
        ${fields[i]}</label
      >
    </div>
    <div class="col-md-2 mt-2">
      <input
        id="switch${i + 1}"
        type="checkbox"
        data-toggle="toggle"
        data-on="Added"
        data-off="Removed"
      />
    </div>
  </div>
  
  <div class="form-row data-form${i + 1}" style="display: none">
    <div class="col-md-6 mb-3">
      <label class="config-label" for="xpath${i + 1}">Path</label>
      <input
        type="text"
        class="form-control"
        name="xpath${i + 1}" 
        id="xpath${i + 1}"
        placeholder="data path..."
        required
      />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class = "col-md-6 mb-3"></div>
  </div>

  <div class="form-row data-form${i + 1}" style="display: none">
  <div class="col-md-4 mb-3">
    <label class="config-label">Data Type</label>
    <div>
      <div
        class="custom-control custom-radio custom-control-inline"
        style="margin-top: 5px"
      >
        <input
          type="radio"
          id="attribute-type${i + 1}"
          value="attribute"
          name="attribute-type${i + 1}"
          class="custom-control-input"
        />
        <label class="custom-control-label" for="attribute-type${i + 1}"
          >Attribute</label
        >
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          value="style"
          id="style-type${i + 1}"
          name="attribute-type${i + 1}"
          class="custom-control-input"
          checked
        />
        <label class="custom-control-label" for="style-type${i + 1}"
          >Style</label
        >
      </div>
    </div>
  </div>
  <div class="col-md-8 mb-3">
    <label class="config-label" for="attvalue${
      i + 1
    }">Attribute/Style Value</label>
    <input
      type="text"
      class="form-control"
      name="attvalue${i + 1}"
      id="attvalue${i + 1}"
      placeholder="which attribute or style"
      required
    />
    <div class="valid-feedback">Looks good!</div>
  </div>
  <div class="col-md-3 mb-3"></div>
</div>
  
  <div class="form-row data-form${i + 1}" style="display: none">
    <div class="col-md-6 mb-3">
      <label
        class="config-label"
        for="default-value${i + 1}"
        >Default Value</label
      >
      <input
        type="text"
        class="form-control"
        value="--"
        name="default-value${i + 1}"
        id="default-value${i + 1}"
        placeholder="value when data not found..."
        required
      />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-3 mb-3">
      <label class="config-label">Multiple Values</label>
      <div>
        <div
          class="custom-control custom-radio custom-control-inline"
          style="margin-top: 5px"
        >
          <input
            type="radio"
            value="true"
            id="multiple-values-radio-true${i + 1}"
            name="multiple-values-radio-true${i + 1}"
            class="custom-control-input"
          />
          <label
            class="custom-control-label"
            for="multiple-values-radio-true${i + 1}"
            >True</label
          >
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            value="false"
            id="multiple-values-radio-false${i + 1}"
            name="multiple-values-radio-true${i + 1}"
            class="custom-control-input"
            checked
          />
          <label
            class="custom-control-label"
            for="multiple-values-radio-false${i + 1}"
            >False</label
          >
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label class="config-label">Splittable</label>
      <div>
        <div
          class="custom-control custom-radio custom-control-inline"
          style="margin-top: 5px"
        >
          <input
            type="radio"
            value="true"
            id="splittable-radio-true${i + 1}"
            name="splittable-radio-true${i + 1}"
            class="custom-control-input"
          />
          <label
            class="custom-control-label"
            for="splittable-radio-true${i + 1}"
            >True</label
          >
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            value="false"
            id="splittable-radio-false${i + 1}"
            name="splittable-radio-true${i + 1}"
            class="custom-control-input"
            checked
          />
          <label
            class="custom-control-label"
            for="splittable-radio-false${i + 1}"
            >False</label
          >
        </div>
      </div>
    </div>
  </div>
  <div class="form-row data-form${i + 1}" style="display: none">
    <div
      class="col-md-5 mb-3"
      id="delimiter-field${i + 1}"
      style="display: none"
    >
      <label class="config-label" for="delimiter${i + 1}">Delimiter</label>
      <input
        type="text"
        class="form-control"
        name="delimiter${i + 1}"
        id="delimiter${i + 1}"
        placeholder="add a delimiter.."
        required
      />
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-7 mb-3">
      <label class="config-label" for="removable${
        i + 1
      }">Removable values</label>
      <input
        type="text"
        class="form-control"
        name="removable${i + 1}"
        id="removable${i + 1}"
        placeholder="Others, default, anything you wanna remove..."
        required
      />
      <div class="valid-feedback">Looks good!</div>
    </div>
  </div>`;
    $("#scrape").before(template);
  }
  // show/hide configuration settings for data fields
  for (let i = 0; i < fields.length; i++) {
    $(`#switch${i + 1}`).on("change", () => {
      $(`.data-form${i + 1}`).toggle(500, () => {
        $(`.data-form${i + 1}:input`).val("");
      });
    });
  }

  // show/hide splittable and removable fields
  for (let i = 0; i < fields.length; i++) {
    $(`#splittable-radio-true${i + 1}`).on("change", () => {
      $(`#delimiter-field${i + 1}`).toggle(1000);
    });
    $(`#splittable-radio-false${i + 1}`).on("change", () => {
      $(`#delimiter-field${i + 1}`).toggle(1000);
    });
  }
  // show/hide input field of next button selector
  $("#pagination-true").on("change", () => {
    $("#next-button").fadeToggle(500);
  });
  $("#pagination-false").on("change", () => {
    $("#next-button").fadeToggle(500);
  });

  // // Fetch all the forms we want to apply custom Bootstrap validation styles to
  // var forms = document.getElementsByClassName("needs-validation");
  // // Loop over them and prevent submission
  // var validation = Array.prototype.filter.call(forms, function (form) {
  //   form.addEventListener(
  //     "submit",
  //     function (event) {
  //       event.preventDefault();
  //       if (form.checkValidity() === false) {
  //         event.stopPropagation();
  //       }
  //       form.classList.add("was-validated");
  //     }
  //   );
  // });
  $("form").on("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData($("form")[0]);
    const website_url = formData.get("website-url");
    const website_name = formData.get("website-name");
    const profileLinksXpath = formData.get("profile-links-path");
    const isPaginated =
      $('input[name="pagination-true"]:checked').val() == "true";
    let slowScraping = parseInt(formData.get("delay"));
    slowScraping = isNaN(slowScraping) ? 0 : slowScraping; //error inductive
    const nextPageSelector = formData.get("next-button-selec");

    let data = [];
    let pagination = { isPaginated, nextPageSelector };
    let params = { profileLinksXpath, slowScraping, pagination };

    //iterate over data settings check whether they're added or not
    //and add their params to the config object
    let addedFormsIndexes = fields.map((element, index) => {
      let state = $(`.data-form${index + 1}`).css("display");
      if (state != "none") {
        return index + 1;
      } else return 0;
    });

    for (let addedFormsIndex of addedFormsIndexes) {
      if (addedFormsIndex != 0) {
        const key = fields[addedFormsIndex - 1];
        const xpath = formData.get(`xpath${addedFormsIndex}`);
        const datafromkey = $(
          `input[name="attribute-type${addedFormsIndex}"]:checked`
        ).val();
        const datafromvalue = formData.get(`attvalue${addedFormsIndex}`);
        const multipleValues =
          $(
            `input[name="multiple-values-radio-true${addedFormsIndex}"]:checked`
          ).val() == "true";
        const defaultValue = formData.get(`default-value${addedFormsIndex}`);
        const splittablepossible =
          $(
            `input[name="splittable-radio-true${addedFormsIndex}"]:checked`
          ).val() == "true";
        const splittabledelimiter = formData.get(`delimiter${addedFormsIndex}`);
        const removablepossible =
          formData.get(`removable${addedFormsIndex}`) != "";
        const removablevalues = formData.get(`removable${addedFormsIndex}`);
        let dataFrom = {};
        dataFrom["key"] = datafromkey;
        dataFrom["value"] = datafromvalue;
        let splittable = {};
        splittable["possible"] = splittablepossible;
        splittable["delimiter"] = splittabledelimiter;
        let removable = {};
        removable["possible"] = removablepossible;
        removable["values"] = removablevalues;
        let params = {
          defaultValue,
          multipleValues,
          dataFrom,
          splittable,
          removable,
        };
        let dataValue = { key, xpath, params };
        data.push(dataValue);
      }
    }

    let config = {
      website_url,
      website_name,
      params,
      data,
    };
    exportJSON(config, `${website_name}-config`);
  });
});
