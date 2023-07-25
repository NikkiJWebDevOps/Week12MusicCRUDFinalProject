const URL_ENDPOINT = "http:localhost:3000";


/**CREATE */

$("#addForm").on("submit", () => {
  $.post(URL_ENDPOINT, {
    birdName: $("#birdInput").val(),
    date: $("#dateInput").val(),
    location: $("#locationInput").val(),
    notes: $("#notesInput").val(),
  });
});

/**READ */
getData();
function getData() {
  $.get(URL_ENDPOINT).then((data) => {
    $("tbody").empty();
    data.map((bird) => {
      $("tbody").append(
        $(`
            <tr id="${bird.id}">
              <td>${bird.id}</td>
              <td>${bird.birdName}</td>
              <td>${bird.date}</td>
              <td>${bird.location}</td>
              <td>${bird.notes}</td>
              <td> 
              <button class="btn btn-danger btn-sm" id="deleteButton" onclick="deleteBird(${bird.id})">Delete</button> 
              </td>
              <td> 
              <button class="btn btn-info btn-sm" id="modalButton${bird.id}" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button> 
              </td>
            </tr>
          `)
      );
    });
  });
}

/**UPDATE */

function updateBird(e) {
  e.preventDefault();
  let id = $("#updateId").val();
  $.ajax(`${URL_ENDPOINT}/${id}`, {
    method: "PUT",
    data: {
      birdName: $("#birdUpdate").val(),
      date: $("#dateUpdate").val(),
      location: $("#locationUpdate").val(),
      notes: $("#notesUpdate").val(),
    },
  })
    .then(getData)
    .then($("#updateModal").modal("hide"));
}

$("#updateForm").on("submit", (e) => {
  updateBird(e);
  document.getElementById("updateForm").reset();
});

/**DELETE */

function deleteBird(id) {
  $.ajax(`${URL_ENDPOINT}/${id}`, {
    method: "DELETE",
  }).then(getData);
}