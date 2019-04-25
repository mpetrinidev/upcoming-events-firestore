const eventList = document.querySelector(".list-group");
const tableEvents = document.getElementById("eventTable");
const frm = document.querySelector("#frmEvents");

function renderEvent(doc) {
  let tr = document.createElement("tr");
  tr.setAttribute("data-id", doc.id);

  let data = doc.data();

  Object.keys(data).forEach(key => {
    let td = document.createElement("td");
    td.innerText =
      typeof data[key] === "number"
        ? new Date(data[key] * 1000).toUTCString()
        : data[key];

    tr.appendChild(td);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger";
  deleteBtn.innerText = "Eliminar";
  deleteBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    db.collection("events")
      .doc(doc.id)
      .delete();
  });

  tr.appendChild(deleteBtn);

  tableEvents.querySelector("tbody").appendChild(tr);
}

////non real time
// db.collection("events")
//   .get()
//   .then(snapshot => {
//     snapshot.docs.forEach(doc => {
//       renderEvent(doc);
//     });
//   });

////real-time
db.collection('events').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    switch (change.type) {
      case 'added':
        renderEvent(change.doc);
        break;
      case 'removed':
        let tr = tableEvents.querySelector('[data-id=' + change.doc.id + ']');
        tr.remove();
      break;
      default:
        break;
    }
  });
});

frm.addEventListener("submit", function(e) {
  e.preventDefault();
  db.collection("events").add({
    name: frm.name.value,
    description: frm.description.value,
    location: frm.location.value,
    date: Date.now()
  });

  frm.reset();
});
