getUserOneInfo = function() {
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/albums",
        method: "GET"
    }).done(function(a) {
        userOne = [];
        userTwo = [];
        for (i = 0; i < a.length; i++) if (1 === a[i].userId) userOne.push(a[i]); else if (2 === a[i].userId) userTwo.push(a[i]);
        displayUserOneInfo(userOne);
        displayUserTwoInfo(userTwo);
    });
};

getUserOneInfo();

displayUserOneInfo = function(a) {
    $(".user1").text("User ID: " + a[0].userId);
    containerOne = $(".containerOne");
    for (i = 0; i < a.length; i++) {
        row = $('<div class="row" id="' + a[i].id + '" draggable="true" ondragstart="drag(event)"></div>');
        userOneAlbumDiv = $('<div class="column"></div>').append($('<p>'+a[i].id+'</p>'));
        row.append(userOneAlbumDiv);
        userOneAlbumDiv2 = $('<div class="column"></div>').append($('<p>'+a[i].title+'</p>'))
        row.append(userOneAlbumDiv2);
        $(".containerOne").append(row);
        if (a[i].id % 2 === 0) {
          row.addClass("even");
          }
        else {
          row.addClass("odd");
        }
    }
    newDiv = $('<div id="new1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
    $(".containerOne").append(newDiv);
};

displayUserTwoInfo = function(a) {
    $(".user2").text("User ID: " + a[0].userId);
    containerTwo = $(".containerTwo");
    for (i = 0; i < a.length; i++) {
        row = $('<div class="row" id="' + a[i].id + '" draggable="true" ondragstart="drag(event)"></div>');
        userTwoAlbumDiv = $('<div class="column"></div>').append($('<p>'+a[i].id+'</p>'));
        row.append(userTwoAlbumDiv);
        userTwoAlbumDiv2 = $('<div class="column"></div>').append($('<p>'+a[i].title+'</p>'))
        row.append(userTwoAlbumDiv2);
        $(".containerTwo").append(row);
        if (a[i].id % 2 === 0) {
          row.addClass("even");
        }
        else {
          row.addClass("odd");
        }
    }
    newDiv = $('<div id="new2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
    $(".containerTwo").append(newDiv);
};

function allowDrop(a) {
    a.preventDefault();
}

function drag(a) {
    a.dataTransfer.setData("text", a.target.id);
    old = a.target;
    next = $("#" + event.target.id).nextAll("div");
}

function drop(a) {
    a.preventDefault();
    var b = a.dataTransfer.getData("text");
    for (i = 0; i < next.length - 1; i++) {
      if (true === next.eq(i).hasClass("odd")) {
        next.eq(i).removeClass("odd");
        next.eq(i).addClass("even");
    } else {
        next.eq(i).removeClass("even");
        next.eq(i).addClass("odd");
    }
    }
    if ("new1" === a.target.id) {
        old.remove();
        $.ajax({
            url: "http://jsonplaceholder.typicode.com/albums/" + b,
            method: "PATCH",
            data: {
                userId: 1
            }
        }).then(function(a) {
            appendDragOne(a);
            console.log(a);
        });
    } else {
        old.remove();
        $.ajax({
            url: "http://jsonplaceholder.typicode.com/albums/" + b,
            method: "PATCH",
            data: {
                userId: 2
            }
        }).then(function(a) {
            appendDragTwo(a);
            console.log(a);
        });
    }
}

appendDragOne = function(a) {
    $("#new1").remove();
    row = $('<div class="row" id="' + a.id + '" draggable="true" ondragstart="drag(event)"></div>');
    userOneAlbumDiv = $('<div class="column"></div>').append($('<p>'+a.id+'</p>'));
    row.append(userOneAlbumDiv);
    userOneAlbumDiv2 = $('<div class="column"></div>').append($('<p>'+a.title+'</p>'));
    row.append(userOneAlbumDiv2);
    $(".containerOne").append(row);
    newDiv = $('<div id="new1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
    $(".containerOne").append(newDiv);
    me = $("#" + a.id);
    above = $("#" + a.id).prev("div");
    if (true === above.hasClass("even")) $("#" + a.id).addClass("odd"); else $("#" + a.id).addClass("even");
};

appendDragTwo = function(a) {
    $("#new2").remove();
    row = $('<div class="row" id="' + a.id + '" draggable="true" ondragstart="drag(event)"></div>');
    userTwoAlbumDiv = $('<div class="column"></div>').append($('<p class>'+a.id+'</p>'));
    row.append(userTwoAlbumDiv);
    userTwoAlbumDiv2 = $('<div class="column"></div>').append($('<p>'+a.title+'</p>'));
    row.append(userTwoAlbumDiv2);
    $(".containerTwo").append(row);
    newDiv = $('<div id="new2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
    $(".containerTwo").append(newDiv);
    me = $("#" + a.id);
    above = $("#" + a.id).prev("div");
    if (true === above.hasClass("even")) {
      $("#" + a.id).addClass("odd");
    } else {
      $("#" + a.id).addClass("even");
    }
};
