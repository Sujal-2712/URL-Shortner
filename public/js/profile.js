function toggleVisitHistory(shortId) {
  var historyContainers = document.querySelectorAll(".history-container");
  historyContainers.forEach(function (historyContainer) {
    if (
      historyContainer.id === "visitHistoryDiv_" + shortId ||
      historyContainer.id === "noVisitHistoryDiv_" + shortId
    ) {
      if (historyContainer.style.display === "none") {
        historyContainer.style.display = "block";
      } else {
        historyContainer.style.display = "none";
      }
    } else {
      historyContainer.style.display = "none";
    }
  });
}

function deleteURL(obj, shortId, userObjID) {
  console.log(shortId);
  try {
    let req = new XMLHttpRequest();
    req.open(
      "GET",
      "/user/delete?shortId=" + shortId + "&userid=" + userObjID,
      true
    );
    req.send();

    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        obj.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      }
    };
  } catch (error) {
    console.log(error);
  }
}

function timestampToDateTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDateTime = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return formattedDateTime;
}

document
  .getElementById("myForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    document.getElementById("message").innerText = "";

    try {
      const response = await fetch("/user/url", {
        method: "POST",
        body: new URLSearchParams(formData), // Serialize the form data
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.json();

      if (data.message) {
        document.getElementById("message").innerText = data.message;
        document.getElementById(
          "shortURL"
        ).innerHTML = `<a href="${data.redirect}" class="underline"> ${data.url} </a>`;
      } else {
        document.getElementById("inputURL").value = data.redirect;
        document.getElementById(
          "shortURL"
        ).innerHTML = `<a href="${data.redirect}" class="underline"> ${data.url} </a>`;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
