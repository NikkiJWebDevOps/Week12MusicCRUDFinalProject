const URL_ENDPOINT = "https://645d8efd250a246ae3221d6d.mockapi.io/AreYouReady4Me";

/**CREATE / POST */

$("#addForm").on("submit", (event) => {
  event.preventDefault();
  $.post(URL_ENDPOINT, {
    musicName: $("#musicInput").val(),
    date: $("#dateInput").val(),
    location: $("#locationInput").val(),
    notes: $("#notesInput").val(),
  });
});
console.log();

/**READ */
getData();
function getData() {
  $.get(URL_ENDPOINT).then((data) => {
    $("tbody").empty();
    data.map((music) => {
      $("tbody").append(
        $(`
            <tr id="${music.id}">
              <td>${music.id}</td>
              <td>${music.musicName}</td>
              <td>${new Date(music.date).toDateString()}</td>
              <td>${music.location}</td>
              <td>${music.notes}</td>
              <td> 
              <button class="btn btn-danger btn-sm" id="deleteButton" onclick="deleteMusic(${music.id})">Delete</button> 
              </td>
              <td> 
              <button class="btn btn-info btn-sm" id="modalButton${music.id}" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button> 
              </td>
            </tr>
          `)
      );
    });
  });
}

/**UPDATE */

function updateMusic(event) {
  event.preventDefault();
  let musicLovers = $("#updateId").val();
  $.ajax(`${URL_ENDPOINT}/${musicLovers}`, {
    method: "PUT",
    data: {
      musicName: $("#musicUpdate").val(),
      date: $("#dateUpdate").val(),
      location: $("#locationUpdate").val(),
      notes: $("#notesUpdate").val(),
    },
  })
    .then(getData)
    .then($("#updateModal").modal("hide"));
}

$("#updateForm").on("submit", (musicLovers) => {
  updateMusic(musicLovers);
  document.getElementById("updateForm").reset();
});
console.log();
/**DELETE */

function deleteMusic(id) {
  $.ajax(`${URL_ENDPOINT}/${id}`, {
    method: "DELETE",
  }).then(getData);
}

console.log(); 