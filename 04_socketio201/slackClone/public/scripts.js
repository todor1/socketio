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
    // nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}" alt="${ns.name}"></div>`;
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" alt="${ns.name}"></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      console.log(element);
      element.addEventListener("click", (e) => {
        const nsEndpoint = element.getAttribute("ns");
        console.log(nsEndpoint);

        const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
        const rooms = clickedNs.rooms;
        // get the room list div
        let roomList = document.querySelector(".room-list");
        // clear it out
        roomList.innerHTML = "";
        // loop through each room and add it to the DOM
        rooms.forEach((room) => {
          roomList.innerHTML += ` <li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
        });
      });
    }
  );
});
