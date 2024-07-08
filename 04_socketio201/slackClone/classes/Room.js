class Room {
  constructor(roomId, roomTitle, namespaceId, privateRoom = false) {
    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.namespaceId = namespaceId;
    this.privateRoom = privateRoom;
    this.history = [];
  }

  addMessage(message) {
    //option to display only limited number of messages in history
    // if (this.history.length === 1000) {
    //   this.history.splice(1);
    // }
    this.history.push(message);
  }

  clearHistoy() {
    this.history = [];
  }
}

module.exports = Room;
