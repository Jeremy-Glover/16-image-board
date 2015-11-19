/* globals $ */
export default function() {

  $(`.nav-board`).on(`click`, function() {
    $(`.image-form`).slideToggle();
  });

  var showInfo = function(info) {
    var listItem = $(`<li></li>`).addClass('img-item').appendTo(`.image-list`);

    $(`<img>`).addClass('images')
      .attr('src', info.image)
      .appendTo(listItem);

    $(`<p></p>`).addClass('captions').text(`${info.caption}`).appendTo(listItem);
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
    $(`.image-form`).slideUp();
    $(`#form-url`).val(' ');
    $(`#form-caption`).val(' ');
  });

  $.ajax({
    url: `http://tiny-lr.herokuapp.com/collections/photos-jg`,
    method: `GET`,
    dataType: `json`,
  }).then((response) => {
    response.forEach(showInfo);
  });
}
