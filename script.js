getUserOneInfo = function() {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET'
  })
  .done(function(data) {
    userOne = []
    userTwo = []
    for (i=0;i<data.length;i++){
      if (data[i].userId === 1){
       userOne.push(data[i])
      }
      else if (data[i].userId === 2){
        userTwo.push(data[i])
      }
    }
    displayUserOneInfo(userOne);
    displayUserTwoInfo(userTwo);
  })
}

getUserOneInfo();

displayUserOneInfo = function(userOne) {
  $('.user1').text('User ID: ' + userOne[0].userId);
  containerOne = $('.containerOne');
  for (i=0;i<userOne.length;i++){

      column = $('<div class="column"></div>');

      userOneAlbumId=$('<p class="text"></p>');
      userOneAlbumId.text('Album ID: ' + userOne[i].id);
      column.append(userOneAlbumId);
      $('.containerOne').append(column);

      userOneAlbums=$('<p class="text"></p>');
      userOneAlbums.text(userOne[i].title);
      column.append(userOneAlbums);
  }
}

displayUserTwoInfo = function(userTwo) {
  $('.user2').text('User ID: ' + userTwo[0].userId);
  containerTwo = $('.containerTwo');
  for (i=0;i<userTwo.length;i++){
    userTwoAlbums=$('<p class="text"></p>');
    userTwoAlbums.text(userTwo[i].title);
    containerTwo.append(userTwoAlbums);

    userTwoAlbumId=$('<p class="text"></p>');
    userTwoAlbumId.text('Album ID: ' + userTwo[i].id);
    containerTwo.append(userTwoAlbumId);

  }
}
