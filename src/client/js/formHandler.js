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
      });
  } else {
    alert("URL is not valid!");
  }

  // Validate the URL
  function isURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (pattern.test(str)) {
      return true;
    } else {
      return false;
    }
  }
}

export { handleSubmit };
