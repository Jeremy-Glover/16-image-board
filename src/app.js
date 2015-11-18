export default function() {

  $(`.nav-board`).on(`click`, function() {
    $(`.image-form`).slideToggle();
  });

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

  });
});
}
