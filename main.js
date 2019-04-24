const eventList = document.querySelector(".list-group");

function renderEvent(doc) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.setAttribute("data-id", doc.id);

  let data = doc.data();

  li.innerText = data.name + " - " + data.location;
  eventList.appendChild(li);
}

db.collection("events")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderEvent(doc);
    });
  });
