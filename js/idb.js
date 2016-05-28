(function () {

  const DB_NAME = 'meetup-indexeddb';
  const DB_VERSION = 1; // Use a long long for this value (don't use a float)
  const DB_STORE_NAME = 'plans';

  var db;

  function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
      // Better use "this" than "req" to get the result to avoid problems with
      // garbage collection.
      // db = req.result;
      db = this.result;
      console.log("openDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
      console.log("openDb.onupgradeneeded");
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };
  }

  /**
   * @param {string} store_name
   * @param {string} mode either "readonly" or "readwrite"
   */
  function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

  function displayPlanList() {
    store = getObjectStore(DB_STORE_NAME, 'readonly');
    console.log('displayPlanList');
    // var pub_msg = $('#pub-msg');
    // pub_msg.empty();
    // var pub_list = $('#pub-list');
    // pub_list.empty();
    // // Resetting the iframe so that it doesn't display previous content
    // newViewerFrame();
    //
    // var req;
    // req = store.count();
    // // Requests are executed in the order in which they were made against the
    // // transaction, and their results are returned in the same order.
    // // Thus the count text below will be displayed before the actual pub list
    // // (not that it is algorithmically important in this case).
    // req.onsuccess = function(evt) {
    //   pub_msg.append('<p>There are <strong>' + evt.target.result +
    //                  '</strong> record(s) in the object store.</p>');
    // };
    // req.onerror = function(evt) {
    //   console.error("add error", this.error);
    //   displayActionFailure(this.error);
    // };
    //
    // var i = 0;
    // req = store.openCursor();
    // req.onsuccess = function(evt) {
    //   var cursor = evt.target.result;
    //
    //   // If the cursor is pointing at something, ask for the data
    //   if (cursor) {
    //     console.log("displayPubList cursor:", cursor);
    //     req = store.get(cursor.key);
    //     req.onsuccess = function (evt) {
    //       var value = evt.target.result;
    //       var list_item = $('<li>' +
    //                         '[' + cursor.key + '] ' +
    //                         '(biblioid: ' + value.biblioid + ') ' +
    //                         value.title +
    //                         '</li>');
    //       if (value.year != null)
    //         list_item.append(' - ' + value.year);
    //
    //       if (value.hasOwnProperty('blob') &&
    //           typeof value.blob != 'undefined') {
    //         var link = $('<a href="' + cursor.key + '">File</a>');
    //         link.on('click', function() { return false; });
    //         link.on('mouseenter', function(evt) {
    //                   setInViewer(evt.target.getAttribute('href')); });
    //         list_item.append(' / ');
    //         list_item.append(link);
    //       } else {
    //         list_item.append(" / No attached file");
    //       }
    //       pub_list.append(list_item);
    //     };
    //
    //     // Move on to the next object in store
    //     cursor.continue();
    //
    //     // This counter serves only to create distinct ids
    //     i++;
    //   } else {
    //     console.log("No more entries");
    //   }
    // };
  }

  // function clearObjectStore(store_name) {
  //   var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  //   var req = store.clear();
  //   req.onsuccess = function(evt) {
  //     displayActionSuccess("Store cleared");
  //     displayPubList(store);
  //   };
  //   req.onerror = function (evt) {
  //     console.error("clearObjectStore:", evt.target.errorCode);
  //     displayActionFailure(this.error);
  //   };
  // }
  //


  // /**
  //  * @param {IDBObjectStore=} store
  //  */
  // function displayPubList(store) {
  //   console.log("displayPubList");
  //
  //   if (typeof store == 'undefined')
  //     store = getObjectStore(DB_STORE_NAME, 'readonly');
  //
  //   var pub_msg = $('#pub-msg');
  //   pub_msg.empty();
  //   var pub_list = $('#pub-list');
  //   pub_list.empty();
  //   // Resetting the iframe so that it doesn't display previous content
  //   newViewerFrame();
  //
  //   var req;
  //   req = store.count();
  //   // Requests are executed in the order in which they were made against the
  //   // transaction, and their results are returned in the same order.
  //   // Thus the count text below will be displayed before the actual pub list
  //   // (not that it is algorithmically important in this case).
  //   req.onsuccess = function(evt) {
  //     pub_msg.append('<p>There are <strong>' + evt.target.result +
  //                    '</strong> record(s) in the object store.</p>');
  //   };
  //   req.onerror = function(evt) {
  //     console.error("add error", this.error);
  //     displayActionFailure(this.error);
  //   };
  //
  //   var i = 0;
  //   req = store.openCursor();
  //   req.onsuccess = function(evt) {
  //     var cursor = evt.target.result;
  //
  //     // If the cursor is pointing at something, ask for the data
  //     if (cursor) {
  //       console.log("displayPubList cursor:", cursor);
  //       req = store.get(cursor.key);
  //       req.onsuccess = function (evt) {
  //         var value = evt.target.result;
  //         var list_item = $('<li>' +
  //                           '[' + cursor.key + '] ' +
  //                           '(biblioid: ' + value.biblioid + ') ' +
  //                           value.title +
  //                           '</li>');
  //         if (value.year != null)
  //           list_item.append(' - ' + value.year);
  //
  //         if (value.hasOwnProperty('blob') &&
  //             typeof value.blob != 'undefined') {
  //           var link = $('<a href="' + cursor.key + '">File</a>');
  //           link.on('click', function() { return false; });
  //           link.on('mouseenter', function(evt) {
  //                     setInViewer(evt.target.getAttribute('href')); });
  //           list_item.append(' / ');
  //           list_item.append(link);
  //         } else {
  //           list_item.append(" / No attached file");
  //         }
  //         pub_list.append(list_item);
  //       };
  //
  //       // Move on to the next object in store
  //       cursor.continue();
  //
  //       // This counter serves only to create distinct ids
  //       i++;
  //     } else {
  //       console.log("No more entries");
  //     }
  //   };
  // }
  //
  // function newViewerFrame() {
  //   var viewer = $('#pub-viewer');
  //   viewer.empty();
  //   var iframe = $('<iframe />');
  //   viewer.append(iframe);
  //   return iframe;
  // }
  //
  // function setInViewer(key) {
  //   console.log("setInViewer:", arguments);
  //   key = Number(key);
  //   if (key == current_view_pub_key)
  //     return;
  //
  //   current_view_pub_key = key;
  //
  //   var store = getObjectStore(DB_STORE_NAME, 'readonly');
  //   getBlob(key, store, function(blob) {
  //     console.log("setInViewer blob:", blob);
  //     var iframe = newViewerFrame();
  //
  //     // It is not possible to set a direct link to the
  //     // blob to provide a mean to directly download it.
  //     if (blob.type == 'text/html') {
  //       var reader = new FileReader();
  //       reader.onload = (function(evt) {
  //         var html = evt.target.result;
  //         iframe.load(function() {
  //           $(this).contents().find('html').html(html);
  //         });
  //       });
  //       reader.readAsText(blob);
  //     } else if (blob.type.indexOf('image/') == 0) {
  //       iframe.load(function() {
  //         var img_id = 'image-' + key;
  //         var img = $('<img id="' + img_id + '"/>');
  //         $(this).contents().find('body').html(img);
  //         var obj_url = window.URL.createObjectURL(blob);
  //         $(this).contents().find('#' + img_id).attr('src', obj_url);
  //         window.URL.revokeObjectURL(obj_url);
  //       });
  //     } else if (blob.type == 'application/pdf') {
  //       $('*').css('cursor', 'wait');
  //       var obj_url = window.URL.createObjectURL(blob);
  //       iframe.load(function() {
  //         $('*').css('cursor', 'auto');
  //       });
  //       iframe.attr('src', obj_url);
  //       window.URL.revokeObjectURL(obj_url);
  //     } else {
  //       iframe.load(function() {
  //         $(this).contents().find('body').html("No view available");
  //       });
  //     }
  //
  //   });
  // }
  //

  /**
   * @param {string} nameEvent
   * @param {string} title
   * @param {number} year
   * @param {Blob=} blob
   */
  function addPlan(nameEvent) {
    console.log("addPlan arguments:", arguments);
    // var obj = { biblioid: biblioid, title: title, year: year };
    var obj = { nameEvent: nameEvent};
    // if (typeof blob != 'undefined')
    //   obj.blob = blob;

    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;
    try {
      req = store.add(obj);
    } catch (e) {
      throw e;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
    };
    req.onerror = function() {
      console.error("addPublication error", this.error);
    };
  }

  // /**
  //  * @param {string} biblioid
  //  */
  // function deletePublicationFromBib(biblioid) {
  //   console.log("deletePublication:", arguments);
  //   var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  //   var req = store.index('biblioid');
  //   req.get(biblioid).onsuccess = function(evt) {
  //     if (typeof evt.target.result == 'undefined') {
  //       displayActionFailure("No matching record found");
  //       return;
  //     }
  //     deletePublication(evt.target.result.id, store);
  //   };
  //   req.onerror = function (evt) {
  //     console.error("deletePublicationFromBib:", evt.target.errorCode);
  //   };
  // }
  //
  // /**
  //  * @param {number} key
  //  * @param {IDBObjectStore=} store
  //  */
  // function deletePublication(key, store) {
  //   console.log("deletePublication:", arguments);
  //
  //   if (typeof store == 'undefined')
  //     store = getObjectStore(DB_STORE_NAME, 'readwrite');
  //
  //   // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
  //   // the result of the Object Store Deletion Operation algorithm is
  //   // undefined, so it's not possible to know if some records were actually
  //   // deleted by looking at the request result.
  //   var req = store.get(key);
  //   req.onsuccess = function(evt) {
  //     var record = evt.target.result;
  //     console.log("record:", record);
  //     if (typeof record == 'undefined') {
  //       displayActionFailure("No matching record found");
  //       return;
  //     }
  //     // Warning: The exact same key used for creation needs to be passed for
  //     // the deletion. If the key was a Number for creation, then it needs to
  //     // be a Number for deletion.
  //     req = store.delete(key);
  //     req.onsuccess = function(evt) {
  //       console.log("evt:", evt);
  //       console.log("evt.target:", evt.target);
  //       console.log("evt.target.result:", evt.target.result);
  //       console.log("delete successful");
  //       displayActionSuccess("Deletion successful");
  //       displayPubList(store);
  //     };
  //     req.onerror = function (evt) {
  //       console.error("deletePublication:", evt.target.errorCode);
  //     };
  //   };
  //   req.onerror = function (evt) {
  //     console.error("deletePublication:", evt.target.errorCode);
  //   };
  // }
  //
  // function displayActionSuccess(msg) {
  //   msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
  //   $('#msg').html('<span class="action-success">' + msg + '</span>');
  // }
  // function displayActionFailure(msg) {
  //   msg = typeof msg != 'undefined' ? "Failure: " + msg : "Failure";
  //   $('#msg').html('<span class="action-failure">' + msg + '</span>');
  // }
  // function resetActionStatus() {
  //   console.log("resetActionStatus ...");
  //   $('#msg').empty();
  //   console.log("resetActionStatus DONE");
  // }
  //
  function addEventListeners() {
    console.log("addEventListeners");

    $('#create-submit').click(function(evt) {
      var nameEvent = $('#nameEvent').val();

      if ( !nameEvent ) {
        $('#errMsg').text('Please Input all required fields !');
        $('#msg').empty();
        return;
      }

      $('#createPlan-form')[0].reset();
      window.scrollTo(0, 0);
      if( $('#msg').text()=='' ) {
          $('#msg').append('<p>Successfully Added !</p>');
          $('#errMsg').empty();
      }

      addPlan(nameEvent);

      // var biblioid = $('#pub-biblioid').val();
      // if (!title || !biblioid) {
      //   displayActionFailure("Required field(s) missing");
      //   return;
      // }
      // var year = $('#pub-year').val();
      // if (year != '') {
      //   // Better use Number.isInteger if the engine has EcmaScript 6
      //   if (isNaN(year))  {
      //     displayActionFailure("Invalid year");
      //     return;
      //   }
      //   year = Number(year);
      // } else {
      //   year = null;
      // }

    });
    $('#navMenu2').click(function(e) {
      displayPlanList();
    });

    // $('#delete-button').click(function(evt) {
    //   console.log("delete ...");
    //   var biblioid = $('#pub-biblioid-to-delete').val();
    //   var key = $('#key-to-delete').val();
    //
    //   if (biblioid != '') {
    //     deletePublicationFromBib(biblioid);
    //   } else if (key != '') {
    //     // Better use Number.isInteger if the engine has EcmaScript 6
    //     if (key == '' || isNaN(key))  {
    //       displayActionFailure("Invalid key");
    //       return;
    //     }
    //     key = Number(key);
    //     deletePublication(key);
    //   }
    // });
    //
    // $('#clear-store-button').click(function(evt) {
    //   clearObjectStore();
    // });
    //
    // var search_button = $('#search-list-button');
    // search_button.click(function(evt) {
    //   displayPubList();
    // });

  }

  openDb();
  addEventListeners();

})(); // Immediately-Invoked Function Expression (IIFE)
