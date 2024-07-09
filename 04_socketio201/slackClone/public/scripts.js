// const userName = prompt("What is your username?");
// const password = prompt("What is your password?");
const userName = "Todor";
const password = "abc";

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log("Connected!");
  socket.emit("clientConnect");
});

// listen for nsLIst event from the server which gives us the namespaces
socket.on("nsList", (nsData) => {
  const lastNs = localStorage.getItem("lastNs");
  console.log(nsData);
  const nameSpacesDiv = document.querySelector(".namespaces");
  nameSpacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    // update the HTML with each namespace
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" alt="${ns.name}"></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      console.log(element);
      element.addEventListener("click", (e) => {
        joinNs(element, nsData);
      });
    }
  );
  // if lastNs is set, grab that element instead of 0
  // joinNs(document.getElementsByClassName("namespace")[0], nsData);
  //default: initially try get from localstorage: lastNs
  const getArrayElementIndex = nsData.findIndex((ns, index, array) => {
    return ns.endpoint === lastNs;
  });

  joinNs(
    document.getElementsByClassName("namespace")[
      getArrayElementIndex > -1 ? getArrayElementIndex : 0
    ],
    nsData
  );
});
