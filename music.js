const URL_ENDPOINT = "http:localhost:3000/musicLovers";
const e = (musicLovers); 
/**CREATE */

$("#addForm").on("submit", () => {
  $.post(URL_ENDPOINT, {
    musicName: $("#musicInput").val(),
    date: $("#dateInput").val(),
    location: $("#locationInput").val(),
    notes: $("#notesInput").val(),
  });
});
console.log(getData());
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
              <td>${music.date}</td>
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

function updateMusic(e) {
  e.preventDefault();
  let id = $("#updateId").val();
  $.ajax(`${URL_ENDPOINT}/${id}`, {
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

$("#updateForm").on("submit", (e) => {
  updateMusic(e);
  document.getElementById("updateForm").reset();
});
console.log(getData());
/**DELETE */

function deleteMusic(id) {
  $.ajax(`${URL_ENDPOINT}/${id}`, {
    method: "DELETE",
  }).then(getData);
}

console.log(getData());
console.log(); 