  getUserOneInfo = function() {
    $.ajax({
      url: 'http://jsonplaceholder.typicode.com/albums',
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

        row = $('<div class="row" id="' + userOne[i].id +  '" draggable="true" ondragstart="drag(event)"></div>');

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
      newDiv = $('<div id="new1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
      $('.containerOne').append(newDiv);
  }

  displayUserTwoInfo = function(userTwo) {
    $('.user2').text('User ID: ' + userTwo[0].userId);
    containerTwo = $('.containerTwo');
    for (i=0;i<userTwo.length;i++){

        row = $('<div class="row" id="' + userTwo[i].id +  '" draggable="true" ondragstart="drag(event)"></div>');

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
        newDiv = $('<div id="new2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
        $('.containerTwo').append(newDiv);
  }

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
   ev.dataTransfer.setData('text', ev.target.id)
   old = ev.target
   next =  $('#' + event.target.id).nextAll('div')
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(next.eq(0))
    if (next.eq(0).hasClass('odd') === true){
      for(i=0;i<next.length-1;i++){
        if (next.eq(i).hasClass('odd') === true){
          next.eq(i).removeClass('odd');
          next.eq(i).addClass('even');
        }
        else{
          next.eq(i).removeClass('even');
          next.eq(i).addClass('odd');
        }
      }

    }

   else {
      for(i=0;i<next.length-1;i++){
        if (next.eq(i).hasClass('odd') === true){
          next.eq(i).removeClass('odd');
          next.eq(i).addClass('even');
        }
        else{
          next.eq(i).removeClass('even');
          next.eq(i).addClass('odd');
        }
      }

   }

    if (ev.target.id==='new1'){
      old.remove()



      $.ajax({
        url: 'http://jsonplaceholder.typicode.com/albums/' + data,
        method:'PATCH',
        dataType: 'jsonp',
        data: {userId: 1}
      })
      .then(function(d){
        appendDragOne(d)
      })
    }
    else {
      old.remove()
      $.ajax({
        url: 'http://jsonplaceholder.typicode.com/albums/' + data,
        method:'PATCH',
        dataType: 'jsonp',
        data: {userId: 2}
      })
      .then(function(d){
        appendDragTwo(d)
      })
    }

}

appendDragOne = function(d) {
        $('#new1').remove();
        row = $('<div class="row" id="' + d.id +  '" draggable="true" ondragstart="drag(event)"></div>');

        userOneAlbumDiv = $('<div class="column"></div>');
        userOneAlbumId=$('<p class="text"></p>');
        userOneAlbumId.text(d.id);
        userOneAlbumDiv.append(userOneAlbumId);
        row.append(userOneAlbumDiv);

        userOneAlbumDiv = $('<div class="column"></div>');
        userOneAlbums=$('<p class="text"></p>');
        userOneAlbums.text(d.title);
        userOneAlbumDiv.append(userOneAlbums);
        row.append(userOneAlbumDiv);

        $('.containerOne').append(row);
        newDiv = $('<div id="new1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
        $('.containerOne').append(newDiv);

        me =  $('#' + d.id)
        above = $('#' + d.id).prev('div');

        if (above.hasClass('even') === true){
          $('#' + d.id).addClass('odd')
        }

        else {
          $('#' + d.id).addClass('even')
        }

}

appendDragTwo = function(d) {
        $('#new2').remove();
        row = $('<div class="row" id="' + d.id +  '" draggable="true" ondragstart="drag(event)"></div>');

        userTwoAlbumDiv = $('<div class="column"></div>');
        userTwoAlbumId=$('<p class="text"></p>');
        userTwoAlbumId.text(d.id);
        userTwoAlbumDiv.append(userTwoAlbumId);
        row.append(userTwoAlbumDiv);

        userTwoAlbumDiv = $('<div class="column"></div>');
        userTwoAlbums=$('<p class="text"></p>');
        userTwoAlbums.text(d.title);
        userTwoAlbumDiv.append(userTwoAlbums);
        row.append(userTwoAlbumDiv);

        $('.containerTwo').append(row);
        newDiv = $('<div id="new2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
        $('.containerTwo').append(newDiv);

        me =  $('#' + d.id)
        above = $('#' + d.id).prev('div');

        if (above.hasClass('even') === true){
          $('#' + d.id).addClass('odd')
        }

        else {
          $('#' + d.id).addClass('even')
        }
}
