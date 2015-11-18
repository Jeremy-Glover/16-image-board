export default function() {

  $(`.nav-board`).on(`click`, function() {
    $(`.image-form`).slideToggle();
  });

  var showInfo = function(info) {
    $(`<img></img>`).text(`${info.image}`).appendTo(`.image-list`);
    $(`<p></p>`).text(`${info.caption}`).appendTo(`.image-list`);
  };

  $(`.image-form`).on(`submit`, function(ev) {

    ev.preventDefault();

    var image = $(`#form-url`).val();
    var caption = $(`#form-caption`).val();

    $.ajax({
      url: `http://tiny-lr.herokuapp.com/collections/photos-jg`,
      method: `POST`,
      dataType: `json`,
      data: {image, caption},
    }).then((response) => {
      $(`.image-form`).slideUp();
      $(`#form-url`).val(' ');
      $(`#form-caption`).val(' ');

      showInfo(response);
  });
});

  $(`.cancel`).on(`click`, function() {
    $(`.image-form`).slideUp;
    $(`#form-url`).val(' ');
    $(`#form-caption`).val(' ');
  })

  $.ajax({
    url: `http://tiny-lr.herokuapp.com/collections/photos-jg`,
    method: `GET`,
    dataType: `json`,
  }).then((response) => {
    response.forEach(showInfo);
  });
}
