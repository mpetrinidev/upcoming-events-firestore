const eventList = document.querySelector(".list-group");
const tableEvents = document.getElementById('eventTable');
const frm = document.querySelector("#frmEvents");

function renderEvent(doc) {
  let tr = document.createElement("tr");
  tr.setAttribute('data-id', doc.id);

  let data = doc.data();
console.log(data);
  Object.keys(data).forEach(key => {
    let td = document.createElement('td');
    console.log(typeof data[key]);
    td.innerText = typeof data[key] === 'number' ? new Date(data[key] * 1000).toUTCString() : data[key];

    tr.appendChild(td);
  });
  
  tableEvents.querySelector('tbody').appendChild(tr);
}

db.collection("events")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderEvent(doc);
    });
  });

frm.addEventListener("submit", function(e) {
  e.preventDefault();
  db.collection('events').add({
    name: frm.name.value,
    description: frm.description.value,
    location: frm.location.value,
    date: Date.now()
  });

  frm.reset();
});
