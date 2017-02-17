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

        row = $('<div class="row" id="' + Date.now()+Math.floor(Math.random() * 10000) + '" draggable="true" ondragstart="drag(event)"></div>');

        userOneAlbumDiv = $('<div class="column"></div>');
        userOneAlbumId=$('<p class="text"></p>');
        userOneAlbumId.text(userOne[i].id);
        userOneAlbumDiv.append(userOneAlbumId);
        row.append(userOneAlbumDiv);

        userOneAlbumDiv = $('<div class="column"></div>');
        userOneAlbums=$('<p class="text"></p>');
        userOneAlbums.text(userOne[i].title);
        userOneAlbumDiv.append(userOneAlbums);
        row.append(userOneAlbumDiv);

        $('.containerOne').append(row);

        if (userOne[i].id % 2 === 0){
          row.addClass('even');
        }

        else{
          row.addClass('odd');
        }
    }
      newDiv = $('<div id="new" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
      $('.containerOne').append(newDiv);
  }

  displayUserTwoInfo = function(userTwo) {
    $('.user2').text('User ID: ' + userTwo[0].userId);
    containerTwo = $('.containerTwo');
    for (i=0;i<userTwo.length;i++){

        row = $('<div class="row" id="' + Date.now()+Math.floor(Math.random() * 10000) + '" draggable="true" ondragstart="drag(event)"></div>');

        userTwoAlbumDiv = $('<div class="column"></div>');
        userTwoAlbumId=$('<p class="text"></p>');
        userTwoAlbumId.text(userTwo[i].id);
        userTwoAlbumDiv.append(userTwoAlbumId);
        row.append(userTwoAlbumDiv);

        userTwoAlbumDiv = $('<div class="column"></div>');
        userTwoAlbums=$('<p class="text"></p>');
        userTwoAlbums.text(userTwo[i].title);
        userTwoAlbumDiv.append(userTwoAlbums);
        row.append(userTwoAlbumDiv);

        $('.containerTwo').append(row);



        if (userTwo[i].id % 2 === 0){
          row.addClass('even');
        }

        else{
          row.addClass('odd');
        }

    }
        newDiv = $('<div id="new" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
        $('.containerTwo').append(newDiv);
  }

row = $('.row')

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.append(document.getElementById(data));
}


