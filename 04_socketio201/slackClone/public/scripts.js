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
  console.log(nsData);
  nsData.forEach((ns) => {
    // update the HTML with each namespace
    const nameSpacesDiv = document.querySelector(".namespaces");
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}" alt="${ns.name}"></div>`;
  });
});
