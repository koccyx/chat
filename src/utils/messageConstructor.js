export default function createMessage(text, sender, time, id) {
  this.text = text;
  this.time = time;
  this.id = id;
  this.sender = sender;
}