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

    var plan_list = $('#plan-list-ul');
    plan_list.empty();
    var plan_detail= $('#plan-detail-ul');
    plan_detail.empty();

    var i = 0;
    req = store.openCursor();
    req.onsuccess = function(evt) {
      var cursor = evt.target.result;
      var eventInfoArr=['nameEvent', 'typeEvent', 'eventHost', 'eventStart', 'eventEnd', 'guestList', 'locationV', 'optMessage'];
      // If the cursor is pointing at something, ask for the data
      if (cursor) {
        req = store.get(cursor.key);
        req.onsuccess = function (evt) {
          var value = evt.target.result;
          var list_item = $('<li><button class="btn btn-warning">' +
                            value.nameEvent +
                            '</button></li>');
          list_item.on('click', function() {
            var planDetailStr="";
            for(rawI in eventInfoArr) {
              if( value[eventInfoArr[rawI]]==undefined) break;
              planDetailStr+='<li>'+eventInfoArr[rawI]+':  ' +value[eventInfoArr[rawI]] + '<hr>'+'</li>'
            }
            $("#plan-detail-ul").html(planDetailStr);
          });

          plan_list.append(list_item);
        };

        // Move on to the next object in store
        cursor.continue();

        // This counter serves only to create distinct ids
        i++;
      } else {

      }
    };
  }

  function clearObjectStore() {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      displayPlanList();
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
    };
  }

  function addPlan(nameEvent, typeEvent, eventHost, eventStart, eventEnd, guestList, locationV, optMessage) {
    console.log("addPlan arguments:", arguments);

    var obj = { nameEvent: nameEvent, typeEvent: typeEvent, eventHost: eventHost,
      eventStart: eventStart, eventEnd: eventEnd, guestList: guestList,
      locationV: locationV};
    if (optMessage) {
      obj.optMessage = optMessage;
    }

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

  function addEventListeners() {
    console.log("addEventListeners");

    $('#create-submit').click(function(evt) {
      var nameEvent = $('#nameEvent').val();
      var typeEvent = $('#typeEvent').val();
      var eventHost = $('#eventHost').val();
      var eventStart = $('#eventStart').val();
      var eventEnd = $('#eventEnd').val();
      var guestList = $('#guestList').val();
      var locationV = $('#locationV').val();
      var optMessage = $('#optMessage').val();

      if ( !nameEvent || !typeEvent || !eventHost || !eventStart || !eventEnd || !guestList || !locationV) {
        $('#errMsg').text('Please Input all required fields !');
        window.scrollTo(0, 0);
        $('#msg').empty();
        return;
      }

      $('#createPlan-form')[0].reset();
      window.scrollTo(0, 0);
      $("#nameEvent").focus();
      if( $('#msg').text()=='' ) {
          $('#msg').append('<p>Successfully Added !</p>');
          $('#errMsg').empty();
      }

      if (optMessage=="") {
        addPlan(nameEvent, typeEvent, eventHost, eventStart, eventEnd, guestList, locationV);
      } else {
        addPlan(nameEvent, typeEvent, eventHost, eventStart, eventEnd, guestList, locationV, optMessage);
      }


    });
    $('#navMenu2').click(function(e) {
      displayPlanList();
    });

    $('#removeButton').click(function(evt) {
      if( confirm("Are you sure?") ) {
          clearObjectStore();
      }
      return false;
    });

  }

  openDb();
  addEventListeners();

})(); // Immediately-Invoked Function Expression (IIFE)
