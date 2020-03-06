function handleSubmit(e) {
  e.preventDefault();

  const baseURL = "http://localhost:8081/sentiment";
  const url = document.getElementById("url").value;

  if (isURL(url)) {
    fetch(baseURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url })
    })
      .then(res => res.json())
      .then(res => {
        document.getElementById(
          "polarity"
        ).innerHTML = `Polarity: ${res.polarity}<br>`;
        document.getElementById(
          "subjectivity"
        ).innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("texxt").innerHTML = `<p>${res.text}</p>`;
      });
  } else {
    alert("URL is not valid!");
  }

  // Validate the URL
  function isURL(str) {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }
}

export { handleSubmit };
